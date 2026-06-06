# Mente Digital AAA - Proyecto Angular

Proyecto UN_01_EN | Ingenieria Web II

## Como ejecutar

### Requisitos previos

- Node.js 18 o superior
- Angular CLI 17 o superior

### Instalacion

```bash
# 1. Instalar Angular CLI globalmente (solo una vez)
npm install -g @angular/cli

# 2. Entrar a la carpeta del proyecto
cd mente-digital-angular

# 3. Instalar dependencias
npm install
```

### Ejecucion del proyecto

El proyecto usa dos servidores durante el desarrollo:

- JSON Server: entrega la API falsa de cursos.
- Angular: muestra la aplicacion en el navegador.

Abre dos terminales en la carpeta del proyecto.

Terminal 1:

```bash
npm run api
```

Terminal 2:

```bash
npm start
```

### URLs de trabajo

```txt
API falsa de cursos: http://localhost:3000/cursos
Aplicacion Angular:  http://localhost:4200
```

Si `http://localhost:3000/cursos` muestra `ERR_CONNECTION_REFUSED`, significa que JSON Server no esta encendido. Ejecuta `npm run api` y deja esa terminal abierta.

## Verificacion rapida

```bash
npm run build
```
