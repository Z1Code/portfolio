# Portafolio Web - Juan Fernandez

Un portafolio web moderno y responsivo construido con Next.js, TypeScript y Tailwind CSS.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones suaves
- **Totalmente Responsivo**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Modo Oscuro**: Soporte automático para tema claro y oscuro
- **Tecnologías Showcased**: Sección dedicada con logos interactivos de tecnologías
- **Secciones Completas**: 
  - Hero/Landing con presentación personal
  - Acerca de mí con estadísticas
  - Tecnologías con iconos animados
  - Proyectos destacados
  - Sección de contacto
- **Optimización SEO**: Preparado para motores de búsqueda
- **Performance**: Optimizado para carga rápida

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Iconos**: React Icons
- **Despliegue**: Vercel (recomendado)

## 🏃‍♂️ Comenzar

### Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd portfolio
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter para revisar el código

## 📝 Personalización

### Información Personal
Edita el archivo `src/app/page.tsx` para actualizar:
- Nombre y título profesional
- Descripción personal
- Enlaces a redes sociales
- Estadísticas (años de experiencia, proyectos, etc.)

### Tecnologías
En `src/app/page.tsx`, modifica el array `technologies` para agregar/quitar tecnologías:

```typescript
const technologies = [
  { name: "React", icon: SiReact, color: "text-blue-500" },
  // Agrega más tecnologías aquí
];
```

### Proyectos
Actualiza la sección de proyectos con tus propios trabajos en el componente de proyectos.

### Estilos
Los estilos están basados en Tailwind CSS. Puedes personalizar colores, espaciados y animaciones directamente en los componentes.

## 🎨 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Página principal del portafolio
│   │   ├── layout.tsx        # Layout base
│   │   └── globals.css       # Estilos globales
├── public/                   # Archivos estáticos
├── tailwind.config.ts        # Configuración de Tailwind
├── next.config.ts           # Configuración de Next.js
└── package.json             # Dependencias del proyecto
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Haz clic en "Deploy"

### Otros Proveedores
- **Netlify**: Compatible con builds de Next.js
- **Railway**: Soporte para aplicaciones Next.js
- **Heroku**: Usando buildpacks de Node.js

## 🔧 Configuración Adicional

### Variables de Entorno
Si necesitas variables de entorno, crea un archivo `.env.local`:

```bash
NEXT_PUBLIC_CONTACT_EMAIL=tu-email@ejemplo.com
```

### Optimizaciones
- Las imágenes se optimizan automáticamente con Next.js Image
- Los componentes usan lazy loading cuando es apropiado
- CSS está optimizado con Tailwind CSS

## 📧 Contacto

Si tienes preguntas sobre la implementación o necesitas ayuda con la personalización:

- **Nombre**: Juan Fernandez
- **Email**: [Tu email aquí]
- **LinkedIn**: [Tu perfil de LinkedIn]
- **GitHub**: [Tu perfil de GitHub]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

---

**¡Gracias por visitar mi portafolio!** 🚀

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
