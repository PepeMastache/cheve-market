
# 🍺 Cheve Market – E-commerce con sistema de afiliación

Sitio e-commerce de cervezas con afiliación. Este es un proyecto de e-commerce para venta de cervezas con sistema de afiliación. Incluye backend en Express, base de datos en PostgreSQL y frontend en React (Vite).

## 🔧 Tecnologías

- Backend: Node.js, Express
- Base de datos: PostgreSQL
- ORM/Query: pg
- Frontend: React (con Vite) — próximamente
- Gestión: GitHub + entorno virtual local

---

## 📁 Estructura del proyecto

cheve-market/
├── backend/
│ ├── src/ # Código backend Express
│ ├── db/
│ │ ├── migrations/ # Script SQL para crear tablas
│ │ └── seeds/ # Script SQL con productos de ejemplo
│ ├── .env.example # Variables de entorno
│ └── package.json
├── frontend/ # Aquí irá el frontend con Vite
└── README.md

## ⚙️ Configuración del entorno backend

### 1. Clonar el proyecto

```bash
git clone https://github.com/PepeMastache/cheve-market.git
cd cheve-market/backend
```

2. Instalar dependencias

npm install

3. Crear el archivo .env
Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

Y completa con tu contraseña real de PostgreSQL:

DATABASE_URL=postgres://postgres:tu_contraseña@localhost:5432/cheve

Cambia admin123 por la contraseña real que le diste al usuario postgres en pgAdmin.
No uses comillas, espacios, ni líneas extra.

🗃️ Base de datos
Crear y preparar base de datos (desde terminal ejecuta linea por linea los siguientes comandos)
```bash
psql -U postgres -d postgres
CREATE DATABASE cheve;
\q
psql -U postgres -d cheve -f backend/db/migrations/001_init.sql
psql -U postgres -d cheve -f backend/db/seeds/001_products.sql
```

▶️ Ejecutar el servidor
```bash
cd backend
npm run dev
```

Abre en navegador:

http://localhost:4000/

http://localhost:4000/api/products

📦 API disponible
GET /api/products
Retorna todos los productos con sus imágenes y precios calculados.

```json
[
  {
    "id": 1,
    "slug": "pacifico-clara-355",
    "name": "Cerveza Pacífico Clara 355 ml",
    "brand": "Grupo Modelo",
    ...
    "final_price": 21.6,
    "images": ["/assets/img/pacifico_1.jpg"]
  },
  ...
]
```

👥 Equipo
Pepe Mastache – Backend, estructura de datos
Fer Madariaga

🚧 En desarrollo:

Endpoint /api/products/:slug

Frontend en React con Vite

Sistema de carrito de compras

Lógica de descuentos y comisiones en órdenes
