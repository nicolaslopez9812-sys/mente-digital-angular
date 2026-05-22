# Mente Digital AAA – Proyecto Angular
### Proyecto UN_01_EN | Ingeniería Web I

---

## 🅰️ Tecnología: Angular 17 (Standalone Components)

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
