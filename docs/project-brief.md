# Project Brief — Adaptación Gentelella

Completa este documento con el mayor detalle posible. Marca con [x] lo que aplique y elimina lo que no corresponda.

## 1) Identidad y Branding
- Nombre del proyecto:
- Eslogan (opcional):
- Dominio/base URL (prod y staging):
- Paleta de colores (HEX, primario/secundario/acento):
- Tipografía (Google Fonts u otra) y pesos:
- Logo (ruta/adjunto) y variantes (oscuro/claro):
- Favicon/manifest: colores de `theme_color` y `background_color`:

## 2) Público, Roles y Navegación
- Roles de usuario (p. ej., Admin, Editor, Viewer):
- Mapa de navegación (menú lateral y superior):
- Redirecciones por rol (landing por rol):
- Reglas de permisos (CRUD por módulo):

## 3) Páginas Objetivo (selecciona desde `production/` o nuevas)
- Dashboard principal: [ ] Sí / [ ] No
- Tablas (DataTables): [ ] Sí / [ ] No — Columnas y acciones:
- Formularios avanzados: [ ] Sí / [ ] No — Validaciones y dependencias:
- Calendario (FullCalendar): [ ] Sí / [ ] No — Eventos y permisos:
- Gráficos (Chart.js / ECharts): [ ] Sí / [ ] No — KPIs y datasets:
- Autenticación (login/registro/recuperación): [ ] Sí / [ ] No
- Perfil de usuario / Configuración: [ ] Sí / [ ] No
- E-commerce (si aplica): [ ] Sí / [ ] No
- Otras páginas necesarias (listar):

## 4) Integraciones y Datos
- API base URL(s):
- Autenticación: [ ] JWT  [ ] Cookies/sesión  [ ] OAuth2  [ ] SSO  [ ] Otro
- Esquemas de datos clave (JSON de ejemplo por módulo):
- Endpoints por módulo (listar rutas y métodos):
- Webhooks/Realtime (p. ej., WebSocket, SSE):
- Terceros: analítica, mapas (Leaflet), pagos, storage, email, etc.:

## 5) Módulos Específicos
- Tablas: columnas, filtros, ordenación, exportar (CSV/Excel/PDF), acciones por fila:
- Formularios: máscaras, subida de archivos (tamaños/mime), WYSIWYG, dependencias de campos:
- Calendario: tipos de eventos, colores, drag&drop, repetición, zonas horarias:
- Gráficos: tipos (línea, barras, dona, heatmap), tamaños, sensibilidad móvil:
- Mapas: tiles, marcadores, clúster, capas, geocoding:

## 6) UX/UI y Accesibilidad
- Comportamiento responsive objetivo (móviles/tablets/escritorio):
- Componentes críticos (modales, toasts, breadcrumbs, tabs, steps):
- Accesibilidad: contraste, labels, atajos, soporte lector pantalla:
- Idiomas: [ ] ES  [ ] EN  [ ] Otros — Estrategia i18n:

## 7) No Funcional y Seguridad
- Rendimiento (LCP/INP objetivos, tamaño bundle inicial):
- Seguridad: CSP, sanitización (DOMPurify), roles en frontend, rate limits (si aplica):
- Registro de errores (Sentry, consola limpia prod):
- Privacidad y cumplimiento (GDPR/LGPD/CCPA):

## 8) Build, Deploy y Entornos
- Entornos: [ ] Local  [ ] Staging  [ ] Producción
- Base path Vite (`vite.config.js`):
- CI/CD (GitHub Actions, otra):
- Hosting/CDN (Vercel/Netlify/Nginx/S3/otro):
- Variables de entorno necesarias:

## 9) SEO, PWA y Metadatos
- Metatags por defecto: título, descripción, OG/Twitter:
- Sitemap/robots: [ ] Sí / [ ] No
- PWA (offline, caching): [ ] Sí / [ ] No — Alcance:

## 10) Contenido y Assets
- Textos y copys (fuente y responsable):
- Imágenes/íconos (rutas, licencias, tamaños):
- Tablas de ejemplo (CSV/JSON para desarrollo):

## 11) Referencias
- Benchmarks o sitios de referencia:
- Wireframes/mockups (enlaces/archivos):

## 12) Plan y Prioridades
- Hitos por fases (MVP → Beta → GA):
- Prioridad de módulos (Alta/Media/Baja):
- Fecha objetivo MVP:

## 13) Riesgos y Restricciones
- Compatibilidad navegador mínima (Chrome/Edge/Firefox/Safari versiones):
- Dispositivos críticos (p. ej., tablet de campo):
- Dependencias legadas o API inmutable:

## 14) Contacto y Flujo de Aprobación
- Stakeholders y responsables:
- Ritmo de demos (semanal/quincenal) y canal:

---

### Adjunta/Incluye
- Logo en SVG y PNG 512x512
- Paleta en JSON/SCSS si la tienes
- Ejemplos JSON de endpoints por módulo
- CSV/JSON de datos de pruebas para tablas y gráficos
- Enlaces de staging/API si existen
