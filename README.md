# Mente Digital AAA – Proyecto Angular
### Proyecto UN_01_EN | Ingeniería Web I

---

## 🅰️ Tecnología: Angular 17 (Standalone Components)

Este proyecto está construido con **Angular 17** usando la arquitectura moderna de **Standalone Components** (sin NgModules), que es el estándar actual recomendado por el equipo de Angular.

---

## 📁 Estructura del proyecto

```
mente-digital-angular/
├── src/
│   ├── index.html                    ← Entrada HTML
│   ├── main.ts                       ← Bootstrap Angular
│   ├── styles.css                    ← Estilos globales
│   └── app/
│       ├── app.component.ts          ← Root component (router-outlet)
│       ├── app.config.ts             ← Configuración (router, animations)
│       ├── app.routes.ts             ← Rutas de la app
│       ├── guards/
│       │   └── auth.guard.ts         ← Protege ruta /dashboard
│       ├── services/
│       │   ├── auth.service.ts       ← Login, registro, sesión (localStorage)
│       │   ├── cursos.service.ts     ← Datos de cursos
│       │   └── theme.service.ts      ← Modo oscuro/claro (BehaviorSubject)
│       └── components/
│           ├── navbar/               ← Navbar con dark mode toggle
│           ├── home/                 ← Landing page completa
│           ├── cursos/               ← Grid con filtros + modal
│           ├── faq/                  ← Acordeón de preguntas frecuentes
│           ├── dashboard/            ← Dashboard con 6 secciones
│           ├── login/                ← Formulario de login
│           └── register/             ← Formulario de registro
├── angular.json                      ← Configuración CLI
├── package.json                      ← Dependencias
└── tsconfig.json                     ← Configuración TypeScript
```

---

## 🚀 Cómo ejecutar

### Requisitos previos
- **Node.js** 18+ ([descargar](https://nodejs.org))
- **Angular CLI** 17+

### Instalación

```bash
# 1. Instalar Angular CLI globalmente (solo una vez)
npm install -g @angular/cli

# 2. Entrar a la carpeta del proyecto
cd mente-digital-angular

# 3. Instalar dependencias
npm install

# 4. Ejecutar servidor de desarrollo
ng serve

# 5. Abrir en el navegador
# http://localhost:4200
```


npm audit
```

Las vulnerabilidades de tipo `high` reportadas son en herramientas de desarrollo (`webpack`, `esbuild`, etc.) y **no exponen la aplicación** al usuario final. El `package.json` ya incluye `overrides` para mitigar las más críticas.
