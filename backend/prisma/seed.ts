import 'dotenv/config';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const dbJsonPath = path.resolve(__dirname, '../../db.json');

async function main() {
  const data = JSON.parse(readFileSync(dbJsonPath, 'utf8')) as {
    cursos: Array<Record<string, unknown> & { temas: string[] }>;
  };

  await prisma.curso.deleteMany();
  await prisma.user.deleteMany();

  for (const curso of data.cursos) {
    await prisma.curso.create({
      data: {
        categoria: String(curso.categoria),
        emoji: String(curso.emoji),
        bg: String(curso.bg),
        tag: String(curso.tag),
        tagClass: String(curso.tagClass),
        nombre: String(curso.nombre),
        instructor: String(curso.instructor),
        rating: String(curso.rating),
        reviews: String(curso.reviews),
        horas: String(curso.horas),
        precio: String(curso.precio),
        objetivo: String(curso.objetivo),
        temas: JSON.stringify(curso.temas)
      }
    });
  }

  await prisma.user.create({
    data: {
      nombre: 'Estudiante',
      apellido: 'Demo',
      email: 'demo@mentedigital.com',
      passwordHash: await bcrypt.hash('Demo12345', 10),
      ocupacion: 'Estudiante'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Base de datos inicializada con cursos y usuario demo.');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
