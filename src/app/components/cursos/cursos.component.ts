import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Curso, CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cursos.component.html'
})
export class CursosComponent implements OnInit, OnDestroy {
  filtros = ['all', 'tecnologia', 'diseno', 'negocios', 'datos'];
  filtroLabels: Record<string, string> = {
    all: 'Todos', tecnologia: 'Tecnología',
    diseno: 'Diseño', negocios: 'Negocios', datos: 'Datos'
  };
  filtroActivo = 'all';
  todosCursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  cursoSeleccionado: Curso | null = null;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursoService.listarCursos().subscribe((cursos) => {
      this.todosCursos = cursos;
      this.filtrar(this.filtroActivo);
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  filtrar(cat: string): void {
    this.filtroActivo = cat;
    this.cursosFiltrados = cat === 'all'
      ? this.todosCursos
      : this.todosCursos.filter(c => c.categoria === cat);
  }

  abrirModal(curso: Curso): void { this.cursoSeleccionado = curso; document.body.style.overflow = 'hidden'; }
  cerrarModal(): void { this.cursoSeleccionado = null; document.body.style.overflow = ''; }
}
