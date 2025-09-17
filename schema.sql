-- Esquema de base de datos para el sistema IRNR Modelo 210
-- Ejecutar este archivo en PostgreSQL para crear las tablas necesarias

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar roles básicos
INSERT INTO roles (nombre) VALUES ('usuario') ON CONFLICT (nombre) DO NOTHING;
INSERT INTO roles (nombre) VALUES ('admin') ON CONFLICT (nombre) DO NOTHING;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    idioma VARCHAR(10) DEFAULT 'ES',
    moneda VARCHAR(10) DEFAULT 'EUR',
    rol_id INTEGER REFERENCES roles(id) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de titulares
CREATE TABLE IF NOT EXISTS titulares (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    pais_residencia VARCHAR(100),
    nif VARCHAR(50),
    porcentaje_participacion DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de inmuebles
CREATE TABLE IF NOT EXISTS inmuebles (
    id SERIAL PRIMARY KEY,
    titular_id INTEGER REFERENCES titulares(id) ON DELETE CASCADE,
    direccion TEXT NOT NULL,
    valor_catastral DECIMAL(15,2),
    uso VARCHAR(100),
    fecha_adquisicion DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de declaraciones 210
CREATE TABLE IF NOT EXISTS declaraciones210 (
    id SERIAL PRIMARY KEY,
    titular_id INTEGER REFERENCES titulares(id) ON DELETE CASCADE,
    inmueble_id INTEGER REFERENCES inmuebles(id) ON DELETE SET NULL,
    estado VARCHAR(50) DEFAULT 'borrador',
    fecha_presentacion DATE,
    tipo_renta VARCHAR(100),
    base_imponible DECIMAL(15,2),
    cuota DECIMAL(15,2),
    moneda VARCHAR(10) DEFAULT 'EUR',
    idioma VARCHAR(10) DEFAULT 'ES',
    pdf_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de transmisiones
CREATE TABLE IF NOT EXISTS transmisiones (
    id SERIAL PRIMARY KEY,
    declaracion_id INTEGER REFERENCES declaraciones210(id) ON DELETE CASCADE,
    inmueble_id INTEGER REFERENCES inmuebles(id) ON DELETE CASCADE,
    titular_id INTEGER REFERENCES titulares(id) ON DELETE CASCADE,
    valor_adquisicion DECIMAL(15,2),
    valor_transmision DECIMAL(15,2),
    gastos DECIMAL(15,2),
    fecha_transmision DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de rentas
CREATE TABLE IF NOT EXISTS rentas (
    id SERIAL PRIMARY KEY,
    declaracion_id INTEGER REFERENCES declaraciones210(id) ON DELETE CASCADE,
    inmueble_id INTEGER REFERENCES inmuebles(id) ON DELETE CASCADE,
    titular_id INTEGER REFERENCES titulares(id) ON DELETE CASCADE,
    tipo_renta VARCHAR(100),
    importe DECIMAL(15,2),
    origen VARCHAR(255),
    periodo VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de deducciones
CREATE TABLE IF NOT EXISTS deducciones (
    id SERIAL PRIMARY KEY,
    declaracion_id INTEGER REFERENCES declaraciones210(id) ON DELETE CASCADE,
    tipo VARCHAR(100),
    importe DECIMAL(15,2),
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_titulares_usuario_id ON titulares(usuario_id);
CREATE INDEX IF NOT EXISTS idx_inmuebles_titular_id ON inmuebles(titular_id);
CREATE INDEX IF NOT EXISTS idx_declaraciones210_titular_id ON declaraciones210(titular_id);
CREATE INDEX IF NOT EXISTS idx_transmisiones_declaracion_id ON transmisiones(declaracion_id);
CREATE INDEX IF NOT EXISTS idx_rentas_declaracion_id ON rentas(declaracion_id);
CREATE INDEX IF NOT EXISTS idx_deducciones_declaracion_id ON deducciones(declaracion_id);