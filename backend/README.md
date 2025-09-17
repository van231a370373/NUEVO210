# PodatkiwHiszpanii Backend

Backend IRNR Modelo 210 — Node.js + Express + PostgreSQL

## Estructura
- `src/` — servidor Express
- `routes/` — rutas API REST
- `models/` — modelos de datos
- `controllers/` — lógica de negocio
- `services/` — servicios auxiliares
- `middlewares/` — middlewares de seguridad, validación
- `config/` — configuración y conexión DB
- `migrations/` — migraciones SQL
- `tests/` — tests unitarios/integración

## Instalación

```bash
cd backend
npm install
cp .env.example .env # Edita credenciales
```

## Migraciones SQL

Para inicializar la base de datos:
```bash
psql -U usuario -d podatkiwhiszpanii -f migrations/001_init.sql
```

## Ejecución

```bash
npm run dev
```

## Tests automáticos

```bash
npm run test
```

## Despliegue y operación
- Requiere PostgreSQL y Node.js 18+
- Variables de entorno en `.env`
- Recomendado usar PM2, Docker o similar para producción
- Logs y errores en consola y DB
- Actualiza migraciones antes de cada despliegue
- Ejecuta tests antes de publicar cambios

## Endpoints básicos
- `GET /api/health` — estado del backend
- `POST /api/auth/register` — alta de usuario
- `POST /api/auth/login` — login y obtención de JWT
- `POST /api/titulares` — alta de titular
- `POST /api/inmuebles` — alta de inmueble
- `POST /api/declaraciones210` — alta de declaración
- `POST /api/transmisiones` — alta de transmisión
- `POST /api/rentas` — alta de renta
- `POST /api/deducciones` — alta de deducción
- `GET /api/report/declaraciones` — resumen de declaraciones
- `GET /api/report/kpi` — KPIs fiscales
- `POST /api/calculo/gravamen` — cálculo de cuota IRNR

## Próximos pasos
- Añadir más tests y migraciones según evolucione el modelo
- Integrar con frontend y sistemas externos
