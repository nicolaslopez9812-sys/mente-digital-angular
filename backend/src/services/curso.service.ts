import { prisma } from '../lib/prisma';
import { toCursoDto, toCursoPersistence } from '../mappers/curso.mapper';
import { NuevoCursoDto } from '../types/curso';
import { HttpError } from '../lib/http-error';

const requiredFields: Array<keyof NuevoCursoDto> = [
  'categoria',
  'emoji',
  'bg',
  'tag',
  'tagClass',
  'nombre',
  'instructor',
  'rating',
  'reviews',
  'horas',
  'precio',
  'objetivo',
  'temas'
];

export async function listCursos() {
  const cursos = await prisma.curso.findMany({ orderBy: { id: 'asc' } });
  return cursos.map(toCursoDto);
}

export async function getCurso(id: number) {
  const curso = await prisma.curso.findUnique({ where: { id } });
  if (!curso) throw new HttpError(404, 'Curso no encontrado.');
  return toCursoDto(curso);
}

export async function createCurso(payload: NuevoCursoDto) {
  validateCurso(payload);
  const curso = await prisma.curso.create({ data: toCursoPersistence(payload) });
  return toCursoDto(curso);
}

export async function updateCurso(id: number, payload: Partial<NuevoCursoDto>) {
  const existing = await prisma.curso.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, 'Curso no encontrado.');

  const { temas, ...rest } = payload;
  const data = {
    ...rest,
    ...(temas ? { temas: JSON.stringify(temas) } : {})
  };

  const curso = await prisma.curso.update({ where: { id }, data });
  return toCursoDto(curso);
}

export async function deleteCurso(id: number) {
  const existing = await prisma.curso.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, 'Curso no encontrado.');
  await prisma.curso.delete({ where: { id } });
}

function validateCurso(payload: NuevoCursoDto) {
  for (const field of requiredFields) {
    if (!payload[field]) throw new HttpError(400, `El campo ${field} es obligatorio.`);
  }

  if (!Array.isArray(payload.temas) || payload.temas.length === 0) {
    throw new HttpError(400, 'El curso debe incluir al menos un tema.');
  }
}
