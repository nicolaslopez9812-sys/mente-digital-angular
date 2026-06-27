const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const dbPath = path.resolve(__dirname, '../prisma/dev.db');
const db = new DatabaseSync(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS Curso (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  categoria TEXT NOT NULL,
  emoji TEXT NOT NULL,
  bg TEXT NOT NULL,
  tag TEXT NOT NULL,
  tagClass TEXT NOT NULL,
  nombre TEXT NOT NULL,
  instructor TEXT NOT NULL,
  rating TEXT NOT NULL,
  reviews TEXT NOT NULL,
  horas TEXT NOT NULL,
  precio TEXT NOT NULL,
  objetivo TEXT NOT NULL,
  temas TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS User (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  apellido TEXT,
  email TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  ocupacion TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL
);
`);

db.close();
console.log(`Base SQLite lista en ${dbPath}`);
