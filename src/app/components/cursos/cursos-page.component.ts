import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Curso, CursoService } from '../../services/curso.service';
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
  todosCursos: Curso[]    = [];
  cursosFiltrados: Curso[] = [];
  cursoSeleccionado: Curso | null = null;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
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
}
