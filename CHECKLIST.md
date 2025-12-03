# 📋 Checklist de Personalización - SWAP MakeUp

Usa esta guía para personalizar tu sitio web paso a paso.

## ✅ Paso 1: Configuración Básica

- [ ] Reemplazar número de WhatsApp en todos los enlaces
  - Buscar: `52XXXXXXXXXX`
  - Reemplazar con tu número (formato: 52 + 10 dígitos)
  - Archivos: `index.html`

- [ ] Actualizar información de contacto
  - [ ] Teléfono (múltiples ubicaciones en footer y contacto)
  - [ ] Email: `contacto@swapmakeup.com`
  - [ ] Ubicación: `Ciudad de México, México`

## ✅ Paso 2: Redes Sociales

- [ ] Instagram: `https://instagram.com/swapmakeup`
- [ ] Facebook: `https://facebook.com/swapmakeup`
- [ ] TikTok: `https://tiktok.com/@swapmakeup`
- [ ] WhatsApp: Ya configurado con número de teléfono

## ✅ Paso 3: Contenido de Texto

- [ ] Sección "Sobre Mí"
  - [ ] Descripción personal (2 párrafos)
  - [ ] Años de experiencia
  - [ ] Número de clientes

- [ ] Servicios y Precios
  - [ ] Precio Maquillaje de Novia (actual: $2,500)
  - [ ] Precio Evento Social (actual: $1,200)
  - [ ] Precio Sesión Fotográfica (actual: $1,500)

## ✅ Paso 4: Imágenes (IMPORTANTE)

### Carpeta `img/`:
- [ ] `hero-bg.jpg` - Fondo del hero (1920x1080px)
- [ ] `about-photo.jpg` - Tu foto (800x1000px)
- [ ] `og-image.jpg` - Para redes sociales (1200x630px)
- [ ] `favicon.png` - Icono del sitio (32x32px)
- [ ] `product-1.jpg` - Base de maquillaje (500x500px)
- [ ] `product-2.jpg` - Paleta de sombras (500x500px)
- [ ] `product-3.jpg` - Labiales (500x500px)
- [ ] `product-4.jpg` - Brochas (500x500px)

### Carpeta `gallery/`:
- [ ] `work-1.jpg` a `work-6.jpg` - Tus trabajos (800x800px)
- [ ] Agregar más trabajos si deseas

## ✅ Paso 5: SEO y Meta Tags

En `index.html`, actualizar:
- [ ] `<title>` - Título del sitio
- [ ] Meta description
- [ ] Meta keywords
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags

## ✅ Paso 6: Colores (Opcional)

Si quieres cambiar la paleta de colores, edita `css/styles.css`:

```css
:root {
    --color-primary: #1a1a1a;      /* Negro principal */
    --color-gold: #b8935a;         /* Dorado/Acento */
    --color-beige: #f5f0e8;        /* Beige suave */
}
```

## ✅ Paso 7: Pruebas

- [ ] Probar en Chrome
- [ ] Probar en Safari
- [ ] Probar en Firefox
- [ ] Probar en móvil (iOS)
- [ ] Probar en móvil (Android)
- [ ] Verificar que todos los enlaces funcionen
- [ ] Probar formulario de contacto
- [ ] Probar galería y modal
- [ ] Verificar botón de WhatsApp

## ✅ Paso 8: Optimización

- [ ] Comprimir todas las imágenes (usa TinyPNG o similar)
- [ ] Verificar que todas las imágenes carguen
- [ ] Probar velocidad de carga
- [ ] Verificar responsive en diferentes tamaños

## ✅ Paso 9: Despliegue

- [ ] Crear cuenta en Netlify/Vercel/GitHub Pages
- [ ] Subir todos los archivos
- [ ] Configurar dominio personalizado (opcional)
- [ ] Verificar sitio en línea
- [ ] Probar sitio en vivo

## ✅ Paso 10: Post-Lanzamiento

- [ ] Compartir en redes sociales
- [ ] Agregar link en bio de Instagram
- [ ] Configurar Google Analytics (opcional)
- [ ] Agregar Google My Business (opcional)
- [ ] Solicitar reseñas de clientes

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa el README.md principal
2. Verifica que todas las imágenes estén en las carpetas correctas
3. Asegúrate de que los nombres de archivo coincidan exactamente
4. Abre la consola del navegador (F12) para ver errores

---

**¡Éxito con tu sitio web! 💄✨**
