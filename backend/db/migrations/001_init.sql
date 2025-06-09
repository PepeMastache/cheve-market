-- Activar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 1. Roles de usuario
CREATE TABLE role (
    id   SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL                -- 'admin', 'buyer', 'affiliate'
);

-- 2. Usuarios
CREATE TABLE "user" (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id       INT REFERENCES role(id),
    email         CITEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name     TEXT,
    created_at    TIMESTAMPTZ DEFAULT now()
);

-- 3. Perfil de afiliado (subclase de usuario)
CREATE TABLE affiliate_profile (
    user_id       UUID PRIMARY KEY REFERENCES "user"(id),
    display_name  TEXT,
    tax_id        TEXT,
    paypal_email  TEXT,
    joined_at     TIMESTAMPTZ DEFAULT now()
);

-- 4. Productos
CREATE TABLE product (
    id           SERIAL PRIMARY KEY,
    slug         TEXT UNIQUE NOT NULL,
    name         TEXT NOT NULL,
    brand        TEXT,
    style        TEXT,
    description  TEXT,
    volume_ml    INT,
    abv          NUMERIC(4,2),
    rating_avg   NUMERIC(3,2)
);

-- 5. Imágenes de productos
CREATE TABLE product_image (
    id          SERIAL PRIMARY KEY,
    product_id  INT REFERENCES product(id),
    url         TEXT NOT NULL,
    sort_order  INT DEFAULT 0
);

-- 6. Precios detallados con utilidad fija y variable
CREATE TABLE product_price (
    product_id          INT PRIMARY KEY REFERENCES product(id),
    base_cost           NUMERIC(12,2) NOT NULL,
    operational_cost    NUMERIC(12,2) NOT NULL,
    fixed_profit_margin NUMERIC(5,2)  NOT NULL DEFAULT 20,
    variable_margin     NUMERIC(5,2)  NOT NULL DEFAULT 10
);


-- 7. Enlaces de afiliado
CREATE TABLE affiliate_link (
    id           SERIAL PRIMARY KEY,
    affiliate_id UUID REFERENCES affiliate_profile(user_id),
    product_id   INT REFERENCES product(id),
    slug         TEXT UNIQUE NOT NULL,
    created_at   TIMESTAMPTZ DEFAULT now()
);

-- 8. Sesiones de usuario
CREATE TABLE session (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID REFERENCES "user"(id),
    started_at   TIMESTAMPTZ DEFAULT now(),
    device       TEXT,
    ip_address   INET,
    user_agent   TEXT,
    time_spent_sec INT
);

-- 9. Clics relevantes para comisión (1 por usuario por enlace)
CREATE TABLE qualified_click (
    id         BIGSERIAL PRIMARY KEY,
    link_id    INT REFERENCES affiliate_link(id),
    user_id    UUID REFERENCES "user"(id),
    session_id UUID REFERENCES session(id),
    clicked_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, link_id)
);

-- 10. Códigos de descuento (solo generables por admin en backend)
CREATE TABLE discount_code (
    id             SERIAL PRIMARY KEY,
    affiliate_id   UUID REFERENCES affiliate_profile(user_id),  -- puede ser NULL si es del admin
    code           TEXT UNIQUE NOT NULL,
    pct_discount   NUMERIC(5,2) CHECK (pct_discount BETWEEN 0 AND 100),
    pct_commission NUMERIC(5,2) CHECK (pct_commission BETWEEN 0 AND 100),
    expires_at     TIMESTAMPTZ,
    created_at     TIMESTAMPTZ DEFAULT now()
);

-- 11. Órdenes
CREATE TABLE "order" (
    id             BIGSERIAL PRIMARY KEY,
    user_id        UUID REFERENCES "user"(id),
    session_id     UUID REFERENCES session(id),
    total          NUMERIC(12,2),
    discount_code  INT REFERENCES discount_code(id),
    created_at     TIMESTAMPTZ DEFAULT now()
);

-- 12. Detalle de cada producto en la orden
CREATE TABLE order_item (
    order_id   BIGINT REFERENCES "order"(id),
    product_id INT REFERENCES product(id),
    qty        INT CHECK (qty > 0),
    unit_price NUMERIC(12,2),
    PRIMARY KEY (order_id, product_id)
);

-- 13. Reparto de comisión por orden (uno o varios afiliados)
CREATE TABLE order_affiliate (
    order_id       BIGINT REFERENCES "order"(id),
    affiliate_id   UUID REFERENCES affiliate_profile(user_id),
    commission_amt NUMERIC(12,2),
    PRIMARY KEY (order_id, affiliate_id)
);
