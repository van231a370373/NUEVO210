-- Datos de ejemplo para desarrollo local
-- Ejecutar después de schema.sql para poblar la base de datos con datos de prueba

-- Insertar usuario de prueba
INSERT INTO usuarios (email, password_hash, nombre, idioma, moneda, rol_id) VALUES
('test@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'ES', 'EUR', 1)
ON CONFLICT (email) DO NOTHING;

-- Insertar titular de ejemplo
INSERT INTO titulares (usuario_id, tipo, nombre, pais_residencia, nif, porcentaje_participacion) VALUES
(1, 'persona_fisica', 'Juan Pérez', 'Polonia', 'PL1234567890', 100.00)
ON CONFLICT DO NOTHING;

-- Insertar inmueble de ejemplo
INSERT INTO inmuebles (titular_id, direccion, valor_catastral, uso, fecha_adquisicion) VALUES
(1, 'Calle Gran Vía 123, Madrid, España', 150000.00, 'vivienda', '2020-01-15')
ON CONFLICT DO NOTHING;

-- Insertar declaración de ejemplo
INSERT INTO declaraciones210 (titular_id, inmueble_id, estado, fecha_presentacion, tipo_renta, base_imponible, cuota, moneda, idioma) VALUES
(1, 1, 'borrador', NULL, 'alquiler', 12000.00, 2400.00, 'EUR', 'ES')
ON CONFLICT DO NOTHING;