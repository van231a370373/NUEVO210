# Guía Completa de Despliegue Local: PodatkiwHiszpanii

Esta guía te permite ejecutar el proyecto **PodatkiwHiszpanii** (SaaS para declaraciones Modelo 210 IRNR) completamente en tu ordenador local. Incluye backend con API REST, frontend con interfaz multiidioma, y base de datos PostgreSQL.

## 📋 Requisitos del Sistema

### Software Necesario
- **Node.js** versión 18 o superior (https://nodejs.org/)
- **PostgreSQL** versión 12 o superior (https://www.postgresql.org/download/)
- **Git** para clonar el repositorio (https://git-scm.com/)
- **Navegador web** moderno (Chrome, Firefox, Edge, Safari)

### Verificación de Instalación
```bash
# Verificar Node.js
node --version  # Debe ser >= 18.0.0
npm --version   # Debe ser >= 8.0.0

# Verificar Git
git --version

# Verificar PostgreSQL (depende del sistema)
psql --version  # O verifica que el servicio esté ejecutándose
```

## 🚀 Paso 1: Clonar y Preparar el Proyecto

### 1.1 Clonar el Repositorio
```bash
# Clona el repositorio
git clone https://github.com/van231a370373/NUEVO210.git
cd NUEVO210

# Verifica que estés en la rama correcta
git branch  # Debe mostrar 'master' o 'main'
```

### 1.2 Estructura del Proyecto
Después de clonar, tendrás esta estructura:
```
NUEVO210/
├── backend/           # API REST con Node.js/Express
├── src/              # Código fuente del frontend
├── production/       # Archivos HTML estáticos
├── docs/             # Documentación
├── package.json      # Dependencias del frontend
├── vite.config.js    # Configuración de Vite
└── README.md
```

## 🗄️ Paso 2: Configurar PostgreSQL

### 2.1 Instalar y Iniciar PostgreSQL
**Windows:**
- Ejecuta el instalador de PostgreSQL
- Durante la instalación, establece una contraseña para el usuario `postgres`
- El servicio se inicia automáticamente

**macOS (con Homebrew):**
```bash
brew install postgresql
brew services start postgresql
createdb
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2.2 Crear Base de Datos y Usuario
Si ya has creado la base de datos y usuario como se muestra arriba, puedes saltar este paso. De lo contrario:

```bash
# Conectar como superusuario (cambia 'tu_password' por la contraseña que elegiste)
psql -U postgres

# Dentro de PostgreSQL, ejecuta:
CREATE DATABASE nuevo210;
CREATE USER Admin WITH PASSWORD 'Kocham647';
GRANT ALL PRIVILEGES ON DATABASE nuevo210 TO Admin;
\q
```

### 2.3 Verificar Conexión
```bash
# Probar conexión
psql -h localhost -U podatk_user -d podatkwhiszpanii
# Si pide contraseña, ingresa 'tu_password_segura_aqui'
# Dentro de psql, ejecuta: \q para salir
```

## ⚙️ Paso 3: Configurar el Backend

### 3.1 Instalar Dependencias
```bash
cd backend
npm install
```

### 3.2 Configurar Variables de Entorno
Crea el archivo `.env` en la carpeta `backend/`:
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus datos
nano backend/.env  # O usa tu editor preferido
```

Contenido del archivo `backend/.env`:
```env
PORT=4000
DATABASE_URL=postgres://Admin:Kocham647@localhost:5432/nuevo210
PGSSLMODE=disable
JWT_SECRET=tu_clave_jwt_muy_segura_de_al_menos_32_caracteres
```

**Importante:** 
- Usa la URL de conexión de PostgreSQL: `postgres://usuario:password@host:puerto/base_datos`
- El `JWT_SECRET` debe ser una cadena aleatoria segura (genera una con `openssl rand -base64 32`)

### 3.3 Crear las Tablas de la Base de Datos
```bash
# Opción 1: Ejecutar directamente con psql
psql -U Admin -d nuevo210 -f schema.sql

# Opción 2: Usar el script npm (desde backend/)
cd backend
npm run migrate
```

Este archivo crea todas las tablas necesarias:
- `usuarios` - Usuarios del sistema
- `roles` - Roles de usuario (usuario, admin)
- `titulares` - Titulares de las declaraciones
- `inmuebles` - Propiedades inmobiliarias
- `declaraciones210` - Declaraciones Modelo 210
- `transmisiones` - Transmisiones de inmuebles
- `rentas` - Rentas obtenidas
- `deducciones` - Deducciones aplicables

**Nota:** Si encuentras errores de permisos, asegúrate de que el usuario `Admin` tenga permisos suficientes.

### 3.4 (Opcional) Poblar con Datos de Ejemplo
Para desarrollo local, puedes poblar la base de datos con datos de ejemplo:
```bash
# Opción 1: Ejecutar directamente con psql
psql -U Admin -d nuevo210 -f seed.sql

# Opción 2: Usar el script npm (desde backend/)
cd backend
npm run seed
```

Esto crea:
- Un usuario de prueba: `test@example.com` / `password` (nombre: Admin)
- Un titular de ejemplo
- Un inmueble y declaración de muestra

### 3.5 Verificar Configuración
```bash
# Probar conexión a la base de datos
cd backend
node -e "const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); pool.query('SELECT NOW()', (err, res) => { if(err) console.error(err); else console.log('✅ Conexión a BD exitosa:', res.rows[0]); pool.end(); });"
```

## 🎨 Paso 4: Configurar el Frontend

### 4.1 Instalar Dependencias
```bash
# Vuelve a la raíz del proyecto
cd ..

# Instalar dependencias del frontend
npm install
```

### 4.2 Verificar Configuración
```bash
# Verificar que Vite esté configurado correctamente
cat vite.config.js | grep -A 10 "server:"
```

Deberías ver:
```javascript
server: {
  open: '/index.html',
  port: 8080,
  host: '0.0.0.0',
  // ...
}
```

## ▶️ Paso 5: Ejecutar la Aplicación

### 5.1 Opción A: Ejecutar en Terminales Separadas

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Deberías ver: `PodatkiwHiszpanii backend escuchando en puerto 4000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Deberías ver: `Local: http://localhost:8080/`

### 5.2 Opción B: Usar Scripts de Desarrollo
```bash
# Ejecutar ambos con el script de desarrollo
npm run dev:watch
```

### 5.3 Verificar que Todo Funciona
```bash
# Probar backend
curl http://localhost:4000/api/health

# Probar frontend
curl -I http://localhost:8080/
```

## 🌐 Paso 6: Acceder a la Aplicación

### 6.1 URLs de Acceso
- **Aplicación principal:** http://localhost:8080/
- **API Backend:** http://localhost:4000/
- **Documentación API:** http://localhost:4000/api-docs (si está habilitada)

### 6.2 Funcionalidades Disponibles
- ✅ **Autenticación:** Login/registro de usuarios
- ✅ **Gestión de Holders:** Crear y gestionar contribuyentes
- ✅ **Propiedades:** Administrar propiedades inmobiliarias
- ✅ **Declaraciones:** Crear declaraciones Modelo 210
- ✅ **Cálculos fiscales:** Cálculos automáticos de IRNR
- ✅ **Multiidioma:** Soporte para PL (polaco), ES (español), EN (inglés)
- ✅ **Dashboard:** Panel de control con estadísticas

### 6.3 Navegación
- Página principal: `http://localhost:8080/`
- Login: `http://localhost:8080/login.html`
- Dashboard: `http://localhost:8080/index.html`
- Formularios: `http://localhost:8080/form.html`

## 🔧 Paso 7: Solución de Problemas

### Error: "FATAL: password authentication failed"
```bash
# Verificar credenciales en .env
cat backend/.env

# Probar conexión manual
psql -h localhost -U podatk_user -d podatkwhiszpanii
```

### Error: "Port 8080 already in use"
```bash
# Cambiar puerto en vite.config.js
# O matar proceso
lsof -ti:8080 | xargs kill -9
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
cd backend && rm -rf node_modules && npm install
cd .. && rm -rf node_modules && npm install
```

### Error: "Connection refused" en API calls
- Verifica que el backend esté ejecutándose en puerto 4000
- Revisa la configuración de CORS en `backend/src/server.js`

### Base de datos no se conecta
```bash
# Verificar que PostgreSQL esté ejecutándose
sudo systemctl status postgresql

# Probar conexión
psql -U podatk_user -d podatkwhiszpanii -c "SELECT version();"
```

### Error: "Parece que el script migrate no está definido"
Ahora el proyecto incluye scripts npm para facilitar las migraciones. Desde el directorio `backend/`:

```bash
cd backend
npm run migrate  # Crea las tablas
npm run seed     # Pobla con datos de ejemplo (opcional)
```

Si prefieres ejecutar manualmente:
```bash
psql -U Admin -d nuevo210 -f ../schema.sql
psql -U Admin -d nuevo210 -f ../seed.sql  # opcional
```

## 📚 Paso 8: Desarrollo y Personalización

### 8.1 Ejecutar Tests
```bash
# Tests del backend
cd backend
npm test

# Tests del frontend (si existen)
npm test
```

### 8.2 Modos de Desarrollo
```bash
# Desarrollo con watch
npm run dev:watch

# Desarrollo con debug
npm run dev:debug

# Build de producción
npm run build
```

### 8.3 Archivos Importantes
- `backend/src/server.js`: Punto de entrada del backend
- `src/main.js`: Punto de entrada del frontend
- `src/utils/i18n/`: Archivos de traducción
- `docs/`: Documentación completa
- `backend/migrations/`: Scripts de base de datos

## 🚀 Paso 9: Despliegue en Producción (Opcional)

Para producción, necesitarás:
1. **Servidor web** (Nginx/Apache)
2. **PM2** para gestión de procesos Node.js
3. **SSL certificate** para HTTPS
4. **Backup** automático de la base de datos

Ejemplo básico con PM2:
```bash
npm install -g pm2
cd backend
pm2 start src/server.js --name podatk-backend
cd ..
pm2 start "npm run build && npm run preview" --name podatk-frontend
```

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs en la terminal
2. Verifica la configuración en archivos `.env`
3. Consulta la documentación en `docs/`
4. Revisa issues en el repositorio GitHub

¡La aplicación debería estar funcionando completamente en tu entorno local! 🎉

**Nota:** Esta configuración es para desarrollo. Para producción, implementa medidas de seguridad adicionales como firewall, backups, y monitoreo.