import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark$ = new BehaviorSubject<boolean>(false);
  isDark = this.isDark$.asObservable();

  constructor() {
    const saved = localStorage.getItem('mentedigital_theme');
    if (saved === 'dark') this.enable();
  }

  toggle(): void {
    this.isDark$.value ? this.disable() : this.enable();
  }

  private enable(): void {
    document.body.classList.add('dark');
    localStorage.setItem('mentedigital_theme', 'dark');
    this.isDark$.next(true);
  }

  private disable(): void {
    document.body.classList.remove('dark');
    localStorage.setItem('mentedigital_theme', 'light');
    this.isDark$.next(false);
  }
}
