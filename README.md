# 🏥 Insight - Sistema de Gestión de Pacientes

Sistema web moderno para profesionales de la salud mental que permite gestionar información de pacientes, historiales clínicos y seguimiento terapéutico.

## ✨ Características Principales

- 👥 **Gestión de Pacientes**: Crear, editar y archivar perfiles de pacientes
- 📋 **Historiales Clínicos**: Registro detallado de consultas y evolución
- 📝 **Notas de Sesión**: Seguimiento de cada sesión terapéutica
- 📚 **Materiales Terapéuticos**: Gestión de recursos y ejercicios
- 🔐 **Autenticación Segura**: Sistema de login y gestión de usuarios
- 📱 **Responsive**: Interfaz adaptable a dispositivos móviles

## 🛠️ Tecnologías

- **Frontend**: Next.js 15.3.1 con TypeScript
- **Estado**: Redux Toolkit 2.7.0
- **Estilos**: Tailwind CSS 4.1.5
- **Formularios**: Formik 2.4.6 + Yup 1.6.1
- **Iconos**: React Icons 5.5.0

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Configuración

1. Clona el repositorio:

```bash
git clone https://github.com/andymedinadev/Insight.git
cd Insight
```

2. Instala dependencias:

```bash
npm install
```

3. Ejecuta en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
├── app/                 # Páginas y layouts (App Router)
├── components/          # Componentes reutilizables
├── hooks/              # Custom hooks
├── mocks/              # Datos de prueba
├── store/              # Redux store y slices
├── types/              # Definiciones TypeScript
└── public/             # Archivos estáticos
```

## 🔄 Flujo de Trabajo (Desarrollo en Equipo)

### Estructura de Ramas

- `main` → Producción (código estable)
- `develop` → Integración de cambios
- `dev-[nombre]` → Rama personal de cada desarrollador

### Crear tu rama de desarrollo

```bash
git checkout develop
git pull origin develop
git checkout -b dev-tu-nombre
git push origin dev-tu-nombre
```

## 📋 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter ESLint
- `npm run format` - Formatear código con Prettier
