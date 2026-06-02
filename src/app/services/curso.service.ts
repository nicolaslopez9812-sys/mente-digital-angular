import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, of } from 'rxjs';

export interface Curso {
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

export type NuevoCurso = Omit<Curso, 'id'>;

const CURSOS_DEMO: Curso[] = [
  {
    id: 1,
    categoria: 'tecnologia',
    emoji: '💻',
    bg: '#E6F1FB',
    tag: 'Tecnología',
    tagClass: 'tag-tech',
    nombre: 'React & Node.js desde cero',
    instructor: 'por Ana Torres',
    rating: '4.9',
    reviews: '2.1k',
    horas: '32 horas',
    precio: '$129.000',
    objetivo: 'Dominar el desarrollo web fullstack moderno con React en el frontend y Node.js + Express en el backend.',
    temas: ['Fundamentos de React y JSX', 'Estado y props, Hooks', 'API REST con Node.js', 'Base de datos con MongoDB', 'Despliegue en Vercel']
  },
  {
    id: 2,
    categoria: 'diseno',
    emoji: '🎨',
    bg: '#FAECE7',
    tag: 'Diseño',
    tagClass: 'tag-design',
    nombre: 'Figma para UX Designers',
    instructor: 'por Marcos Ríos',
    rating: '4.8',
    reviews: '1.7k',
    horas: '24 horas',
    precio: '$99.000',
    objetivo: 'Diseñar interfaces digitales profesionales, crear prototipos y manejar sistemas de diseño en Figma.',
    temas: ['Herramientas y navegación', 'Componentes y variantes', 'Auto Layout y grids', 'Prototipado interactivo', 'Handoff a desarrollo']
  },
  {
    id: 3,
    categoria: 'negocios',
    emoji: '📊',
    bg: '#EEEDFE',
    tag: 'Negocios',
    tagClass: 'tag-biz',
    nombre: 'Marketing Digital con IA',
    instructor: 'por Lucía Vargas',
    rating: '4.7',
    reviews: '980',
    horas: '18 horas',
    precio: '$89.000',
    objetivo: 'Crear estrategias de marketing digital efectivas usando herramientas de inteligencia artificial.',
    temas: ['Estrategia de contenido con IA', 'SEO y posicionamiento', 'Publicidad en Meta y Google', 'Email marketing automatizado', 'Métricas y analítica']
  },
  {
    id: 4,
    categoria: 'datos',
    emoji: '🤖',
    bg: '#E1F5EE',
    tag: 'Datos',
    tagClass: 'tag-data',
    nombre: 'Python & Machine Learning',
    instructor: 'por David Mora',
    rating: '4.9',
    reviews: '3.2k',
    horas: '40 horas',
    precio: '$149.000',
    objetivo: 'Construir modelos de machine learning y aplicarlos para resolver problemas reales con Python.',
    temas: ['Python para datos (NumPy, Pandas)', 'Visualización con Matplotlib', 'Scikit-learn y modelos ML', 'Redes neuronales básicas', 'Proyectos reales de predicción']
  },
  {
    id: 5,
    categoria: 'tecnologia',
    emoji: '📱',
    bg: '#E6F1FB',
    tag: 'Tecnología',
    tagClass: 'tag-tech',
    nombre: 'Desarrollo de Apps con Flutter',
    instructor: 'por Sara Jiménez',
    rating: '4.6',
    reviews: '750',
    horas: '28 horas',
    precio: '$119.000',
    objetivo: 'Desarrollar aplicaciones móviles multiplataforma (Android e iOS) con Flutter y Dart.',
    temas: ['Fundamentos de Dart', 'Widgets y layouts en Flutter', 'Navegación y rutas', 'Consumo de APIs REST', 'Publicación en Play Store / App Store']
  },
  {
    id: 6,
    categoria: 'diseno',
    emoji: '✏️',
    bg: '#FAECE7',
    tag: 'Diseño',
    tagClass: 'tag-design',
    nombre: 'Diseño Gráfico con Adobe Suite',
    instructor: 'por Felipe Castro',
    rating: '4.7',
    reviews: '1.1k',
    horas: '22 horas',
    precio: '$109.000',
    objetivo: 'Manejar las herramientas de Adobe (Illustrator, Photoshop, InDesign) para crear piezas gráficas profesionales.',
    temas: ['Illustrator: vectores y logos', 'Photoshop: retoque y composición', 'Tipografía y color', 'InDesign: diagramación editorial', 'Portafolio profesional']
  }
];

@Injectable({ providedIn: 'root' })
export class CursoService {
  private readonly apiUrl = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  listarCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl).pipe(
      map((cursos) => cursos.length > 0 ? cursos : CURSOS_DEMO),
      catchError(() => of(CURSOS_DEMO))
    );
  }

  crearCurso(curso: NuevoCurso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }
}
