import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';
import { AccessibilityBarComponent } from '../accessibility/accessibility-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AccessibilityBarComponent],
  templateUrl: './dashboard.component.html',
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      overflow: hidden;
    }
    .db-root {
      display: flex;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    .db-sidebar {
      width: 220px;
      min-width: 220px;
      height: 100vh;
      overflow-y: auto;
      background: var(--white);
      border-right: 1px solid var(--gray-200);
      display: flex;
      flex-direction: column;
      transition: transform 0.25s ease, width 0.25s ease;
      flex-shrink: 0;
      z-index: 50;
    }
    .db-sidebar.collapsed {
      transform: translateX(-220px);
      width: 0;
      min-width: 0;
    }
    .db-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      min-width: 0;
    }
    .db-topbar {
      height: 60px;
      min-height: 60px;
      background: var(--white);
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0 1.25rem;
      flex-shrink: 0;
    }
    .db-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 1.5rem;
      background: var(--gray-50);
    }
    /* dark mode */
    :host-context(body.dark) .db-sidebar { background:#0F1117; border-color:rgba(255,255,255,0.07); }
    :host-context(body.dark) .db-topbar  { background:#0F1117; border-color:rgba(255,255,255,0.07); }
    :host-context(body.dark) .db-content { background:#080b10; }
    :host-context(body.dark) .db-root    { background:#080b10; }
    /* mobile overlay sidebar */
    @media (max-width: 768px) {
      .db-sidebar {
        position: absolute;
        left: 0; top: 0; bottom: 0;
        z-index: 200;
        box-shadow: 4px 0 20px rgba(0,0,0,0.15);
      }
      .db-sidebar.collapsed { transform: translateX(-220px); width: 220px; min-width: 220px; }
      .db-overlay {
        position: absolute; inset: 0; background: rgba(0,0,0,0.4); z-index: 199;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User | null = null;
  activeSection = 'inicio';
  sidebarCollapsed = false;
  isDark = false;
  streakCount = 0;
  tabActivo = 'activos';
  isMobile = false;
  perfil = { nombre: '', apellido: '', ocupacion: '' };
  perfilSaved = false;
  greeting = '';
  private sub!: Subscription;

  constructor(private auth: AuthService, private theme: ThemeService) {}

  ngOnInit(): void {
    this.user = this.auth.getSession();
    this.perfil.nombre    = this.user?.nombre || '';
    this.perfil.apellido  = this.user?.apellido || '';
    this.perfil.ocupacion = this.user?.ocupacion || '';
    this.greeting = this.getGreeting();
    this.sub = this.theme.isDark.subscribe(d => this.isDark = d);
    this.checkMobile();
    this.animateStreak(5);
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  @HostListener('window:resize')
  checkMobile(): void {
    this.isMobile = window.innerWidth < 769;
    if (this.isMobile) this.sidebarCollapsed = true;
    else this.sidebarCollapsed = false;
  }

  showSection(s: string): void {
    this.activeSection = s;
    if (this.isMobile) this.sidebarCollapsed = true;
  }

  toggleSidebar(): void { this.sidebarCollapsed = !this.sidebarCollapsed; }
  toggleTheme(): void   { this.theme.toggle(); }
  logout(): void        { this.auth.logout(); }

  savePerfil(): void {
    this.auth.updateProfile(this.perfil).subscribe((user) => {
      this.user = user || this.auth.getSession();
      this.perfilSaved = true;
      setTimeout(() => this.perfilSaved = false, 2500);
    });
  }

  get firstName(): string    { return this.user?.nombre || this.user?.email?.split('@')[0] || 'Estudiante'; }
  get avatarLetter(): string { return (this.user?.nombre || 'E')[0].toUpperCase(); }

  private getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return '¡Buenos días,';
    if (h < 18) return '¡Buenas tardes,';
    return '¡Buenas noches,';
  }

  private animateStreak(t: number): void {
    let n = 0;
    const tick = () => { n = Math.min(n+1,t); this.streakCount = n; if(n<t) setTimeout(tick,60); };
    setTimeout(tick, 600);
  }
}
