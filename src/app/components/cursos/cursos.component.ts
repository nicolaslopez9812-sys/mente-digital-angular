import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursosService, Curso } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cursos.component.html'
})
export class CursosComponent implements OnInit {
  filtros = ['all', 'tecnologia', 'diseno', 'negocios', 'datos'];
  filtroLabels: Record<string, string> = {
    all: 'Todos', tecnologia: 'Tecnología',
    diseno: 'Diseño', negocios: 'Negocios', datos: 'Datos'
  };
  filtroActivo = 'all';
  cursosFiltrados: Curso[] = [];
  cursoSeleccionado: Curso | null = null;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void { this.filtrar('all'); }

  filtrar(cat: string): void {
    this.filtroActivo = cat;
    this.cursosFiltrados = this.cursosService.getByCategoria(cat);
  }

  abrirModal(curso: Curso): void { this.cursoSeleccionado = curso; document.body.style.overflow = 'hidden'; }
  cerrarModal(): void { this.cursoSeleccionado = null; document.body.style.overflow = ''; }
}
