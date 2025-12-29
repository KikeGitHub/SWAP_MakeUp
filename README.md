# 💄 Marian Angeles - Sitio Web Profesional

Sitio web estático profesional para artista de maquillaje (Makeup Artist) con diseño moderno, minimalista y elegante.

## 🌟 Características Principales

- ✅ **100% Estático** - HTML, CSS y JavaScript vanilla (sin frameworks pesados)
- ✅ **Diseño Responsivo** - Optimizado para todos los dispositivos
- ✅ **Paleta Elegante** - Colores sofisticados: negro, beige, nude y dorado
- ✅ **Animaciones Suaves** - Transiciones y efectos visuales profesionales
- ✅ **SEO Optimizado** - Meta tags para motores de búsqueda y redes sociales
- ✅ **Carga Rápida** - Lazy loading de imágenes
- ✅ **Accesible** - Código semántico y navegación por teclado

## 📁 Estructura del Proyecto

```
SWAP_MakeUp/
│
├── index.html              # Página principal
│
├── css/
│   └── styles.css         # Estilos principales
│
├── js/
│   └── script.js          # JavaScript funcional
│
├── img/                   # Imágenes del sitio
│   ├── hero-bg.jpg        # Imagen de fondo del hero
│   ├── about-photo.jpg    # Foto de la sección "Sobre Mí"
│   ├── og-image.jpg       # Imagen para redes sociales
│   ├── favicon.png        # Favicon del sitio
│   ├── product-1.jpg      # Productos recomendados
│   ├── product-2.jpg
│   ├── product-3.jpg
│   └── product-4.jpg
│
└── gallery/               # Galería de trabajos
    ├── work-1.jpg
    ├── work-2.jpg
    ├── work-3.jpg
    ├── work-4.jpg
    ├── work-5.jpg
    └── work-6.jpg
```

## 🎨 Secciones del Sitio

### 1. **Hero Section**
- Imagen de fondo impactante
- Nombre y título del artista
- Botones de llamado a la acción (CTA)
- Indicador de scroll animado

### 2. **Sobre Mí**
- Foto profesional del artista
- Descripción y experiencia
- Estadísticas (clientes, años, satisfacción)

### 3. **Galería Artística**
- Grid de imágenes con efecto hover
- Modal para visualizar imágenes en grande
- Navegación con teclado (flechas y ESC)
- Lazy loading para optimización

### 4. **Servicios & Precios**
- Cards modernas con iconos
- 3 paquetes principales:
  - Maquillaje de Novia ($2,500 MXN)
  - Evento Social ($1,200 MXN) - **Destacado**
  - Sesión Fotográfica ($1,500 MXN)
- Lista de características incluidas
- Botones de reserva directos a WhatsApp

### 5. **Productos Recomendados**
- Kit profesional
- 4 productos destacados con imágenes
- Marcas profesionales

### 6. **Contacto**
- Información de contacto
- Formulario funcional con validación
- Enlaces a redes sociales
- Iconos elegantes

### 7. **Footer**
- Enlaces rápidos
- Información de contacto
- Redes sociales
- Copyright

### 8. **Extras**
- Botón flotante de WhatsApp
- Botón scroll to top
- Navegación fija con efecto scroll

## 🚀 Instalación y Uso

### 1. Clonar o Descargar el Proyecto

```bash
# Si usas Git
git clone [URL-del-repositorio]

# O simplemente descarga el ZIP y descomprímelo
```

### 2. Agregar Imágenes

Coloca tus imágenes en las carpetas correspondientes:

**Carpeta `img/`:**
- `hero-bg.jpg` - Imagen de fondo del hero (1920x1080px recomendado)
- `about-photo.jpg` - Foto del artista (800x1000px recomendado)
- `og-image.jpg` - Imagen para compartir en redes (1200x630px)
- `favicon.png` - Favicon del sitio (32x32px o 64x64px)
- `product-1.jpg` a `product-4.jpg` - Productos (500x500px recomendado)

**Carpeta `gallery/`:**
- `work-1.jpg` a `work-6.jpg` - Trabajos de maquillaje (800x800px recomendado)
- Puedes agregar más imágenes siguiendo la numeración

### 3. Personalizar Información

Edita el archivo `index.html` y reemplaza:

#### Número de WhatsApp
Busca todas las ocurrencias de `52 56 6143 0855` y reemplázalas con tu número:

```html
<!-- Ejemplo: -->
https://wa.me/525512345678?text=Hola%20quiero%20una%20cita
```

#### Información de Contacto
En la sección de contacto y footer, actualiza:
- Teléfono
- Email
- Ubicación
- Redes sociales (Instagram, Facebook, TikTok)

#### Textos y Descripciones
Personaliza:
- Descripción "Sobre Mí"
- Estadísticas (clientes, años de experiencia)
- Precios de servicios
- Nombres de productos

### 4. Abrir el Sitio

Simplemente abre el archivo `index.html` en tu navegador:

- Doble clic en `index.html`
- O arrastra el archivo a tu navegador
- O usa Live Server en VS Code para desarrollo

## 🎨 Personalización de Colores

Los colores están definidos como variables CSS en `css/styles.css`:

```css
:root {
    --color-primary: #1a1a1a;      /* Negro principal */
    --color-secondary: #d4af85;    /* Beige/Dorado claro */
    --color-accent: #c9a66b;       /* Acento dorado */
    --color-beige: #f5f0e8;        /* Beige suave */
    --color-nude: #e8dccf;         /* Nude */
    --color-gold: #b8935a;         /* Dorado */
}
```

Puedes cambiar estos valores para ajustar la paleta de colores.

## 📱 Responsive Design

El sitio está optimizado para:
- ✅ Escritorio (1200px+)
- ✅ Tablets (768px - 992px)
- ✅ Móviles (320px - 767px)

## ⚡ Funcionalidades JavaScript

### Navegación
- Menu hamburguesa en móviles
- Smooth scroll al hacer clic en enlaces
- Navbar con efecto al hacer scroll

### Galería
- Modal con navegación (flechas, teclado)
- Lazy loading de imágenes
- Animaciones de hover

### Formulario
- Validación de campos
- Validación de email y teléfono
- Notificaciones de éxito/error
- Opción para redirigir a WhatsApp

### Optimizaciones
- Intersection Observer para animaciones
- Lazy loading de imágenes
- Botón scroll to top

## 🌐 SEO y Redes Sociales

El sitio incluye meta tags para:
- Google y otros motores de búsqueda
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Descripción, keywords y autor

Actualiza estos meta tags en `index.html` con tu información:

```html
<meta name="description" content="Tu descripción aquí">
<meta property="og:title" content="Tu título">
<meta property="og:image" content="img/og-image.jpg">
```

## 📦 Dependencias Externas

El sitio usa CDNs para:
- **Google Fonts**: Poppins y Playfair Display
- **Font Awesome 6.4.0**: Iconos

Estas dependencias se cargan automáticamente desde CDN. Para un sitio 100% offline, descarga las fuentes e iconos localmente.

## 🚀 Despliegue

### Hosting Gratuito
Puedes hospedar este sitio en:
- **Netlify** (recomendado)
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**

### Pasos para Netlify:
1. Crea una cuenta en [netlify.com](https://netlify.com)
2. Arrastra la carpeta completa a Netlify
3. ¡Listo! Tu sitio estará en línea

## 📞 Soporte y Personalización

Para soporte o personalizaciones adicionales:
- Email: marian.angelesmua@gmail.com
- WhatsApp: +52 XXX XXX XXXX

## 📄 Licencia

Este proyecto está diseñado para uso personal y comercial de Marian Angeles.

## 🎯 Próximas Mejoras (Opcional)

- [ ] Blog de consejos de maquillaje
- [ ] Sistema de reservas integrado
- [ ] Testimonios de clientes
- [ ] Video promocional en hero
- [ ] Tienda online integrada
- [ ] Modo oscuro/claro

---

**Desarrollado con 💄 para Marian Angeles**

*Versión 1.0 - Diciembre 2025*
