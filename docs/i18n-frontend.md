# Guía rápida: internacionalización frontend (Gentelella)

## ¿Cómo traducir textos?

1. Usa el atributo `data-i18n="key"` en cualquier elemento HTML que quieras traducir.
   - Ejemplo: `<span data-i18n="welcome"></span>`
   - Ejemplo: `<a data-i18n="dashboard"></a>`
2. Para inputs y textareas, el placeholder se traduce automáticamente.
   - Ejemplo: `<input data-i18n="help" />`

## ¿Dónde están los textos?

- Los textos y traducciones están en:
  - `src/utils/i18n/pl.json` (polaco)
  - `src/utils/i18n/es.json` (español)
  - `src/utils/i18n/en.json` (inglés)

## ¿Cómo añadir una nueva clave?

1. Añade la clave y traducción en los tres archivos JSON.
   - Ejemplo: en `pl.json`: `"logout": "Wyloguj się"`
   - Ejemplo: en `es.json`: `"logout": "Cerrar sesión"`
   - Ejemplo: en `en.json`: `"logout": "Logout"`
2. Usa esa clave en el HTML: `<button data-i18n="logout"></button>`

## ¿Cómo funciona el selector de idioma?

- El selector aparece en la cabecera.
- Al cambiar el idioma, todos los textos con `data-i18n` se actualizan automáticamente.
- La preferencia se guarda en `localStorage` y se recuerda en futuras visitas.

## Ejemplos de uso

### Menú lateral
```html
<h3 data-i18n="general">General</h3>
<ul class="nav side-menu">
  <li><a><i class="fas fa-home"></i> <span data-i18n="home">Home</span></a></li>
  <li><a><i class="fas fa-edit"></i> <span data-i18n="forms">Forms</span></a></li>
</ul>
```

### Botones y enlaces
```html
<button data-i18n="edit_profile">Edit Profile</button>
<a href="#" data-i18n="logout">Logout</a>
```

### Títulos y placeholders
```html
<h3 data-i18n="user_profile">User Profile</h3>
<input type="text" data-i18n="search_profile" placeholder="Search profile...">
```

### Textos legales
```html
<p data-i18n="modelo_210">Declaración Modelo 210</p>
<span data-i18n="irnr_tax">Impuesto IRNR</span>
```

## Recomendaciones

- Mantén las claves cortas y descriptivas.
- Si un texto no se traduce, revisa que la clave exista en los tres archivos.
- Para textos largos (ayuda, legal), usa `<div data-i18n="legal_help"></div>` y pon el texto completo en el JSON.

---

¿Dudas? Añade tu pregunta aquí o contacta al equipo técnico.
