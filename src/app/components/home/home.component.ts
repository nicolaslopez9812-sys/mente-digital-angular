import { Component, AfterViewInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterLink }          from '@angular/router';
import { NavbarComponent }     from '../navbar/navbar.component';
import { CursosComponent }     from '../cursos/cursos.component';
import { FaqComponent }        from '../faq/faq.component';
import { AccessibilityBarComponent } from '../accessibility/accessibility-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, CursosComponent, FaqComponent, AccessibilityBarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initBackToTop();
    this.initCounters();
    this.initContactForm();
    this.initNavbarScroll();
  }

  private initBackToTop(): void {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () =>
      btn.classList.toggle('visible', window.scrollY > 400));
    btn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  private initCounters(): void {
    const counters = document.querySelectorAll<HTMLElement>('.stat-number[data-target]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target as HTMLElement;
        const target = +(el.dataset['target'] || 0);
        let current  = 0;
        const step = target / (1800 / 16);
        const update = () => {
          current = Math.min(current + step, target);
          const isPercent = target === 98 || target === 85;
          el.textContent = target >= 1000
            ? Math.floor(current).toLocaleString('es-CO') + '+'
            : Math.floor(current) + (isPercent ? '%' : '+');
          if (current < target) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  private initContactForm(): void {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (!btn) return;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        (form as HTMLFormElement).reset();
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
        btn.insertAdjacentHTML('afterend',
          '<div style="margin-top:.75rem;background:var(--green-50);color:var(--green-700);padding:10px 14px;border-radius:8px;font-size:14px;border:1px solid var(--green-100)">✅ ¡Mensaje enviado! Te responderemos pronto.</div>');
        setTimeout(() => form.querySelector('div[style]')?.remove(), 4000);
      }, 1200);
    });
  }

  scrollToSection(id: string): void {
    if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private initNavbarScroll(): void {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () =>
      navbar.classList.toggle('scrolled', window.scrollY > 20));
  }
}
