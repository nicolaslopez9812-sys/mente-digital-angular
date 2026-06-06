import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CursosComponent } from '../cursos/cursos.component';
import { FaqComponent } from '../faq/faq.component';
import { AccessibilityBarComponent } from '../accessibility/accessibility-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, CursosComponent, FaqComponent, AccessibilityBarComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  contactSending = false;
  contactSubmitted = false;
  private countersObserver?: IntersectionObserver;
  private contactTimer?: number;

  ngAfterViewInit(): void {
    this.initCounters();
    this.syncScrollState();
  }

  ngOnDestroy(): void {
    this.countersObserver?.disconnect();
    if (this.contactTimer) window.clearTimeout(this.contactTimer);
  }

  @HostListener('window:scroll')
  syncScrollState(): void {
    const backToTop = document.getElementById('backToTop');
    backToTop?.classList.toggle('visible', window.scrollY > 400);

    const navbar = document.getElementById('navbar');
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  }

  private initCounters(): void {
    const counters = document.querySelectorAll<HTMLElement>('.stat-number[data-target]');
    this.countersObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        const target = +(el.dataset['target'] || 0);
        let current = 0;
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
        this.countersObserver?.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => this.countersObserver?.observe(counter));
  }

  submitContactForm(event: Event): void {
    event.preventDefault();
    if (this.contactSending) return;

    const form = event.target as HTMLFormElement;
    this.contactSending = true;
    this.contactSubmitted = false;

    window.setTimeout(() => {
      form.reset();
      this.contactSending = false;
      this.contactSubmitted = true;

      if (this.contactTimer) window.clearTimeout(this.contactTimer);
      this.contactTimer = window.setTimeout(() => this.contactSubmitted = false, 4000);
    }, 1200);
  }

  scrollToSection(id: string): void {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
