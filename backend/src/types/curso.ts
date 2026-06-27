export interface CursoDto {
  id: number;
  categoria: string;
  emoji: string;
  bg: string;
  tag: string;
  tagClass: string;
  nombre: string;
  instructor: string;
  rating: string;
  reviews: string;
  horas: string;
  precio: string;
  objetivo: string;
  temas: string[];
}

export type NuevoCursoDto = Omit<CursoDto, 'id'>;
