import { Curso } from '@prisma/client';
import { CursoDto, NuevoCursoDto } from '../types/curso';

export function toCursoDto(curso: Curso): CursoDto {
  return {
    id: curso.id,
    categoria: curso.categoria,
    emoji: curso.emoji,
    bg: curso.bg,
    tag: curso.tag,
    tagClass: curso.tagClass,
    nombre: curso.nombre,
    instructor: curso.instructor,
    rating: curso.rating,
    reviews: curso.reviews,
    horas: curso.horas,
    precio: curso.precio,
    objetivo: curso.objetivo,
    temas: JSON.parse(curso.temas) as string[]
  };
}

export function toCursoPersistence(curso: NuevoCursoDto) {
  return {
    ...curso,
    temas: JSON.stringify(curso.temas)
  };
}
