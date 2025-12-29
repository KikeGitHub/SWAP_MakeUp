# 🚧 Página Coming Soon - Guía de Uso

## ¿Qué es este archivo?

`coming-soon.html` es una página de "Próximamente" que puedes usar para pausar temporalmente tu sitio web sin modificar el `index.html` principal.

## ¿Cuándo usarla?

- Durante mantenimiento del sitio
- Mientras terminas de personalizar contenido
- Cuando necesites pausar el sitio sin perder el trabajo actual
- Para pruebas antes del lanzamiento oficial

## 📋 Cómo activar la página Coming Soon

### Opción 1: Renombrar archivos (Recomendada)

```powershell
# 1. Renombrar el index.html actual a index-backup.html
Rename-Item index.html index-backup.html

# 2. Renombrar coming-soon.html a index.html
Rename-Item coming-soon.html index.html
```

**Para volver a activar tu sitio:**
```powershell
# 1. Renombrar el index.html (coming soon) a coming-soon.html
Rename-Item index.html coming-soon.html

# 2. Restaurar el index-backup.html a index.html
Rename-Item index-backup.html index.html
```

### Opción 2: Configuración en servidor (Netlify/Vercel)

Si usas Netlify o servicios similares, puedes usar redirects:

**Crear archivo `_redirects` en la raíz:**
```
/*  /coming-soon.html  200
```

**Para desactivar:** Simplemente elimina el archivo `_redirects`

### Opción 3: .htaccess (Apache)

**Crear/editar archivo `.htaccess`:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/coming-soon\.html$
RewriteRule ^(.*)$ /coming-soon.html [L]
```

**Para desactivar:** Comenta o elimina las líneas agregadas

## ✨ Características incluidas

- ✅ Diseño responsive (móvil y escritorio)
- ✅ Colores y branding de tu sitio principal
- ✅ Enlaces a redes sociales activos
- ✅ Botón de WhatsApp funcional
- ✅ Animaciones sutiles
- ✅ Meta tag `noindex, nofollow` (no se indexa en Google)
- ✅ Sin dependencias externas (CSS incluido)

## 🎨 Personalización

Puedes editar el archivo `coming-soon.html` directamente para:

- Cambiar el mensaje principal (línea 177)
- Modificar el texto descriptivo (línea 183-186)
- Actualizar información de contacto
- Cambiar colores en la sección `<style>`

## ⚠️ Importante

- El archivo incluye `<meta name="robots" content="noindex, nofollow">` para evitar indexación
- Todos los enlaces de WhatsApp y redes sociales están actualizados
- La página es completamente independiente del `index.html`

## 🔄 Proceso recomendado para lanzamiento

1. **Desarrollo:** Trabaja en `index.html` normalmente
2. **Pre-lanzamiento:** Activa `coming-soon.html` 
3. **Lanzamiento:** Restaura `index.html` cuando esté listo
4. **Mantener:** Guarda `coming-soon.html` para futuros mantenimientos

---

**Nota:** Este archivo no afecta ni modifica tu `index.html` original. Puedes tener ambos archivos en el proyecto sin problemas.
