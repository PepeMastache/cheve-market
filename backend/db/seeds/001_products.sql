-- Insertar productos
INSERT INTO product (slug, name, brand, style, description, volume_ml, abv, rating_avg)
VALUES 
  ('pacifico-clara-355', 'Cerveza Pacífico Clara 355 ml', 'Grupo Modelo', 'Lager',
   'Cerveza clara tipo lager, refrescante y suave.', 355, 4.5, 4.3),

  ('modelo-negra-355', 'Negra Modelo 355 ml', 'Grupo Modelo', 'Munich Dunkel',
   'Color oscuro, sabor a malta tostada, estilo Munich.', 355, 5.4, 4.6),

  ('lagunitas-ipa-355', 'Lagunitas IPA 355 ml', 'Lagunitas Brewing', 'IPA',
   'India Pale Ale con aromas cítricos y final amargo.', 355, 6.2, 4.1);

-- Insertar imágenes (una por producto de momento)
INSERT INTO product_image (product_id, url, sort_order)
SELECT id, '/assets/img/pacifico_1.jpg', 0 FROM product WHERE slug = 'pacifico-clara-355';

INSERT INTO product_image (product_id, url, sort_order)
SELECT id, '/assets/img/modelo_negra_1.jpg', 0 FROM product WHERE slug = 'modelo-negra-355';

INSERT INTO product_image (product_id, url, sort_order)
SELECT id, '/assets/img/lagunitas_1.jpg', 0 FROM product WHERE slug = 'lagunitas-ipa-355';

-- Insertar precios
INSERT INTO product_price (product_id, base_cost, operational_cost, fixed_profit_margin, variable_margin)
SELECT id, 12.00, 4.00, 20, 10 FROM product WHERE slug = 'pacifico-clara-355';

INSERT INTO product_price (product_id, base_cost, operational_cost, fixed_profit_margin, variable_margin)
SELECT id, 13.00, 4.50, 20, 10 FROM product WHERE slug = 'modelo-negra-355';

INSERT INTO product_price (product_id, base_cost, operational_cost, fixed_profit_margin, variable_margin)
SELECT id, 16.00, 5.00, 20, 10 FROM product WHERE slug = 'lagunitas-ipa-355';
