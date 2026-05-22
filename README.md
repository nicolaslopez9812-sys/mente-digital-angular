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

### Build para producción

```bash
ng build
# Los archivos quedan en /dist/mente-digital-aaa/
```

---

## 🗺️ Rutas de la aplicación

| Ruta          | Componente           | Acceso       |
|---------------|----------------------|--------------|
| `/`           | HomeComponent        | Público      |
| `/login`      | LoginComponent       | Público      |
| `/register`   | RegisterComponent    | Público      |
| `/cursos`     | CursosPageComponent  | Público      |
| `/dashboard`  | DashboardComponent   | 🔒 Auth Guard |

---

## ✨ Funcionalidades Angular implementadas

| Concepto Angular          | Dónde se usa |
|---------------------------|--------------|
| `@Component` standalone   | Todos los componentes |
| `RouterLink`, `RouterOutlet` | Navegación entre páginas |
| `*ngFor`, `*ngIf`         | Listas de cursos, FAQ, secciones |
| `[(ngModel)]`             | Formularios de login, registro, perfil |
| `[class.active]`, `[style]` | Filtros, barras de progreso |
| `(click)`, `(input)`, `(submit)` | Eventos de usuario |
| `@Injectable` Services    | AuthService, CursosService, ThemeService |
| `BehaviorSubject`         | Estado del tema oscuro/claro |
| `CanActivate` Guard       | Protección de ruta /dashboard |
| `AfterViewInit`           | Contadores animados, back-to-top |
| `provideRouter`           | Configuración de rutas |

---

## 🌙 Modo Oscuro / Claro

- El `ThemeService` usa un `BehaviorSubject<boolean>` para comunicar el estado del tema a todos los componentes
- El toggle aplica/remueve la clase `.dark` en `document.body`
- La preferencia se guarda en `localStorage` y se restaura al recargar
- Disponible tanto en la landing page (navbar) como en el dashboard (topbar y configuración)

---

## 🔐 Autenticación (simulada con localStorage)

- **Registro**: guarda usuarios en `mentedigital_users` (array JSON)
- **Login**: valida email + password contra el array guardado
- **Sesión**: almacenada en `mentedigital_user`
- **Guard**: `AuthGuard` redirige a `/login` si no hay sesión activa
- **Logout**: elimina la sesión y redirige a `/login`

---

## 📝 Notas para el docente

Este proyecto cumple los requisitos de la actividad **UN_01_EN**:
- ✅ Interfaz para startup de educación digital
- ✅ Framework: **Angular 17**
- ✅ Arquitectura de componentes reutilizables
- ✅ Navegación con Router y Guards
- ✅ Servicios inyectables
- ✅ Data binding bidireccional
- ✅ Directivas estructurales (*ngFor, *ngIf)
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Modo oscuro/claro
- ✅ Autenticación simulada

---

© 2025 Mente Digital AAA S.A.S. – Bogotá, Colombia

---

## 🔒 Sobre las vulnerabilidades npm

Al ejecutar `npm install` verás un aviso de vulnerabilidades. Esto es **normal** en proyectos Angular 17 y se debe a dependencias transitivas internas del tooling de Angular (no afectan la app en producción).

**Para reducirlas:**
```bash
npm audit fix
```

**Para ver el detalle:**
```bash
npm audit
```

Las vulnerabilidades de tipo `high` reportadas son en herramientas de desarrollo (`webpack`, `esbuild`, etc.) y **no exponen la aplicación** al usuario final. El `package.json` ya incluye `overrides` para mitigar las más críticas.
