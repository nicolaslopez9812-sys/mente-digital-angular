# Mente Digital AAA - Proyecto Angular

Proyecto evolutivo de Ingenieria Web II:

- UN_01_AA: frontend web en Angular.
- UN_02_AA: frontend integrado a API REST falsa con JSON Server.
- UN_03_AA: frontend conectado a backend propio con Node.js, Express, TypeScript, Prisma y SQLite.

## Auditoria de fases

La aplicacion Angular ya tenia una separacion adecuada para escalar:

- `CursoService` consumia `/cursos` con `HttpClient`, por lo que podia migrarse desde JSON Server a una API real sin cambiar los componentes.
- Las interfaces `Curso` y `NuevoCurso` ya eran contratos claros entre frontend y API.
- El principal acoplamiento detectado estaba en `AuthService`, porque usuarios y sesiones vivian solo en `localStorage`. En UN_03_AA se migro registro, login y perfil a endpoints reales, dejando `localStorage` solo para conservar la sesion activa del navegador.

## Backend UN_03_AA

La API real esta en `backend/` y replica la funcionalidad de la fase 2 con persistencia real.

```txt
backend/
  prisma/
    schema.prisma
    seed.ts
  scripts/
    init-db.cjs
  src/
    controllers/
    lib/
    mappers/
    middleware/
    routes/
    scripts/
    services/
    types/
    app.ts
    server.ts
```

### Endpoints principales

```txt
GET    /health
GET    /cursos
GET    /cursos/:id
POST   /cursos
PUT    /cursos/:id
PATCH  /cursos/:id
DELETE /cursos/:id

POST   /auth/register
POST   /auth/login
PATCH  /auth/profile/:email
```

Usuario demo:

```txt
Correo: demo@mentedigital.com
Clave:  Demo12345
```

## Como ejecutar

### Requisitos previos

- Node.js 24 recomendado para usar el script local de inicializacion SQLite
- Angular CLI 17 o superior

### Instalacion

```bash
# 1. Instalar Angular CLI globalmente (solo una vez)
npm install -g @angular/cli

# 2. Entrar a la carpeta del proyecto
cd mente-digital-angular

# 3. Instalar dependencias
npm install

# 4. Preparar backend real
npm run api:setup
```

### Ejecucion del proyecto

El proyecto usa dos servidores durante el desarrollo de la fase UN_03_AA:

- Backend real: entrega cursos, usuarios y perfil con persistencia SQLite.
- Angular: muestra la aplicacion en el navegador.

Abre dos terminales en la carpeta del proyecto.

Terminal 1:

```bash
npm run api:real
```

Terminal 2:

```bash
npm start
```

### URLs de trabajo

```txt
API real:            http://localhost:3000
Cursos:              http://localhost:3000/cursos
Aplicacion Angular:  http://localhost:4200
```

Si `http://localhost:3000/cursos` muestra `ERR_CONNECTION_REFUSED`, significa que el backend real no esta encendido. Ejecuta `npm run api:real` y deja esa terminal abierta.

JSON Server queda disponible como referencia historica de UN_02_AA:

```bash
npm run api
```

## Verificacion rapida

```bash
npm run build
npm run api:test
npm --prefix backend run build
```

## Migracion Angular a API real

La URL base ahora esta centralizada en:

```txt
src/environments/environment.ts
src/environments/environment.prod.ts
```

Los servicios usan `environment.apiUrl`, por lo que el cambio de entorno se hace en un solo lugar:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

## Plan de pruebas recomendado

1. Ejecutar `npm run api:setup` para generar Prisma Client, crear SQLite y cargar datos iniciales.
2. Ejecutar `npm run api:real` y validar `http://localhost:3000/health`.
3. Ejecutar `npm run api:test` para comprobar health, cursos y login demo.
4. Ejecutar `npm start`, abrir `http://localhost:4200/cursos` y verificar que aparecen los cursos de `db.json` migrados.
5. Iniciar sesion con `demo@mentedigital.com` / `Demo12345`.
6. Editar el perfil en dashboard y confirmar que el cambio persiste desde el backend.
