-- Migración inicial: estructura base
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(100),
  idioma VARCHAR(5) DEFAULT 'ES',
  moneda VARCHAR(3) DEFAULT 'EUR',
  rol_id INT REFERENCES roles(id),
  activo BOOLEAN DEFAULT TRUE,
  fecha_alta TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS titulares (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  tipo VARCHAR(20),
  nombre VARCHAR(100),
  pais_residencia VARCHAR(2),
  nif VARCHAR(15),
  porcentaje_participacion NUMERIC(5,2),
  fecha_alta TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inmuebles (
  id SERIAL PRIMARY KEY,
  titular_id INT REFERENCES titulares(id),
  direccion VARCHAR(255),
  valor_catastral NUMERIC(12,2),
  uso VARCHAR(50),
  fecha_adquisicion DATE,
  activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS declaraciones210 (
  id SERIAL PRIMARY KEY,
  titular_id INT REFERENCES titulares(id),
  inmueble_id INT REFERENCES inmuebles(id),
  estado VARCHAR(20),
  fecha_presentacion DATE,
  tipo_renta INT,
  base_imponible NUMERIC(12,2),
  cuota NUMERIC(12,2),
  moneda VARCHAR(3) DEFAULT 'EUR',
  idioma VARCHAR(5) DEFAULT 'ES',
  pdf_path VARCHAR(255),
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transmisiones (
  id SERIAL PRIMARY KEY,
  declaracion_id INT REFERENCES declaraciones210(id),
  inmueble_id INT REFERENCES inmuebles(id),
  titular_id INT REFERENCES titulares(id),
  valor_adquisicion NUMERIC(12,2),
  valor_transmision NUMERIC(12,2),
  gastos NUMERIC(12,2),
  fecha_transmision DATE
);

CREATE TABLE IF NOT EXISTS rentas (
  id SERIAL PRIMARY KEY,
  declaracion_id INT REFERENCES declaraciones210(id),
  inmueble_id INT REFERENCES inmuebles(id),
  titular_id INT REFERENCES titulares(id),
  tipo_renta INT,
  importe NUMERIC(12,2),
  origen VARCHAR(100),
  periodo VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS deducciones (
  id SERIAL PRIMARY KEY,
  declaracion_id INT REFERENCES declaraciones210(id),
  tipo VARCHAR(50),
  importe NUMERIC(12,2),
  descripcion TEXT
);
