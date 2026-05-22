import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn  = false;
  isScrolled  = false;
  private subs: Subscription[] = [];

  constructor(
    private auth:  AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.subs.push(
      this.router.events.pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          this.isLoggedIn = this.auth.isLoggedIn();
          this.isMenuOpen = false;
        })
    );
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled = window.scrollY > 20; }

  toggleMenu():  void { this.isMenuOpen = !this.isMenuOpen; }
  logout():      void { this.auth.logout(); }

  scrollTo(sectionId: string): void {
    this.isMenuOpen = false;
    // If not on home page, navigate first then scroll
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.doScroll(sectionId), 200);
      });
    } else {
      this.doScroll(sectionId);
    }
  }

  private doScroll(id: string): void {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
