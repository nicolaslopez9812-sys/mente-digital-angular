import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Curso, CursoService, NuevoCurso } from '../../services/curso.service';
import { AccessibilityBarComponent } from '../accessibility/accessibility-bar.component';

@Component({
  selector: 'app-cursos-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent, AccessibilityBarComponent],
  templateUrl: './cursos-page.component.html'
})
export class CursosPageComponent implements OnInit, OnDestroy {
  filtros = ['all', 'tecnologia', 'diseno', 'negocios', 'datos'];
  filtroLabels: Record<string, string> = {
    all: 'Todos', tecnologia: 'Tecnología',
    diseno: 'Diseño', negocios: 'Negocios', datos: 'Datos'
  };
  filtroActivo   = 'all';
  searchQuery    = '';
  categoriaDefaults: Record<string, Pick<NuevoCurso, 'tag' | 'tagClass' | 'bg' | 'emoji'>> = {
    tecnologia: { tag: 'Tecnología', tagClass: 'tag-tech', bg: '#E6F1FB', emoji: '💻' },
    diseno: { tag: 'Diseño', tagClass: 'tag-design', bg: '#FAECE7', emoji: '🎨' },
    negocios: { tag: 'Negocios', tagClass: 'tag-biz', bg: '#EEEDFE', emoji: '📊' },
    datos: { tag: 'Datos', tagClass: 'tag-data', bg: '#E1F5EE', emoji: '🤖' }
  };
  todosCursos: Curso[]    = [];
  cursosFiltrados: Curso[] = [];
  cursoSeleccionado: Curso | null = null;
  cursoEditando: Curso | null = null;
  guardando = false;
  mensajeCrud = '';
  errorCrud = '';
  temasInput = 'Tema principal';
  formCurso: NuevoCurso = this.crearFormularioVacio();

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.listarCursos().subscribe((cursos) => {
      this.todosCursos = cursos;
      this.aplicarFiltro();
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  filtrar(cat: string): void { this.filtroActivo = cat; this.aplicarFiltro(); }

  aplicarFiltro(): void {
    let base = this.filtroActivo === 'all'
      ? this.todosCursos
      : this.todosCursos.filter(c => c.categoria === this.filtroActivo);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      base = base.filter(c => c.nombre.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q));
    }
    this.cursosFiltrados = base;
  }

  abrirModal(curso: Curso): void { this.cursoSeleccionado = curso; document.body.style.overflow = 'hidden'; }
  cerrarModal(): void            { this.cursoSeleccionado = null; document.body.style.overflow = ''; }

  guardarCurso(): void {
    this.errorCrud = '';
    this.mensajeCrud = '';

    const curso = this.normalizarFormulario();
    if (!curso.nombre || !curso.instructor || !curso.categoria || !curso.precio || !curso.objetivo || curso.temas.length === 0) {
      this.errorCrud = 'Completa nombre, instructor, categoria, precio, objetivo y al menos un tema.';
      return;
    }

    this.guardando = true;
    const request = this.cursoEditando
      ? this.cursoService.actualizarCurso(this.cursoEditando.id, curso)
      : this.cursoService.crearCurso(curso);

    request.subscribe({
      next: () => {
        this.guardando = false;
        this.mensajeCrud = this.cursoEditando ? 'Curso actualizado correctamente.' : 'Curso creado correctamente.';
        this.cancelarEdicion();
        this.cargarCursos();
      },
      error: (error: HttpErrorResponse) => {
        this.guardando = false;
        this.errorCrud = error.error?.message || 'No fue posible guardar el curso. Revisa que la API este activa.';
      }
    });
  }

  editarCurso(curso: Curso, event: Event): void {
    event.stopPropagation();
    this.cursoEditando = curso;
    this.formCurso = {
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
      temas: [...curso.temas]
    };
    this.temasInput = curso.temas.join(', ');
    this.mensajeCrud = '';
    this.errorCrud = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarCurso(curso: Curso, event: Event): void {
    event.stopPropagation();
    const confirmar = confirm(`¿Eliminar el curso "${curso.nombre}"?`);
    if (!confirmar) return;

    this.cursoService.eliminarCurso(curso.id).subscribe({
      next: () => {
        this.mensajeCrud = 'Curso eliminado correctamente.';
        this.errorCrud = '';
        if (this.cursoEditando?.id === curso.id) this.cancelarEdicion();
        this.cargarCursos();
      },
      error: () => {
        this.errorCrud = 'No fue posible eliminar el curso. Revisa que la API este activa.';
        this.mensajeCrud = '';
      }
    });
  }

  cancelarEdicion(): void {
    this.cursoEditando = null;
    this.formCurso = this.crearFormularioVacio();
    this.temasInput = this.formCurso.temas.join(', ');
  }

  actualizarCategoria(): void {
    const defaults = this.categoriaDefaults[this.formCurso.categoria];
    if (!defaults) return;
    this.formCurso = { ...this.formCurso, ...defaults };
  }

  private normalizarFormulario(): NuevoCurso {
    return {
      ...this.formCurso,
      instructor: this.formCurso.instructor.startsWith('por ')
        ? this.formCurso.instructor
        : `por ${this.formCurso.instructor}`,
      temas: this.temasInput.split(',').map(t => t.trim()).filter(Boolean)
    };
  }

  private crearFormularioVacio(): NuevoCurso {
    return {
      categoria: 'tecnologia',
      ...this.categoriaDefaults['tecnologia'],
      nombre: '',
      instructor: '',
      rating: '4.8',
      reviews: '0',
      horas: '10 horas',
      precio: '$0',
      objetivo: '',
      temas: ['Tema principal']
    };
  }
}
