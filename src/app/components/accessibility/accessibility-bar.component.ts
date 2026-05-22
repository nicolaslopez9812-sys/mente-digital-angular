import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityService, ContrastMode } from '../../services/accessibility.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessibility-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessibility-bar.component.html',
  styleUrls:  ['./accessibility-bar.component.css']
})
export class AccessibilityBarComponent implements OnInit, OnDestroy {
  fontSize  = 100;
  isDark    = false;
  contrast: ContrastMode = 'normal';
  private subs: Subscription[] = [];

  constructor(
    public a11y: AccessibilityService,
    private theme: ThemeService
  ) {}

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (!e.altKey) return;
    if (e.key === '+' || e.key === '=') { e.preventDefault(); this.a11y.increaseFont(); }
    if (e.key === '-' || e.key === '_') { e.preventDefault(); this.a11y.decreaseFont(); }
    if (e.key === '0')                  { e.preventDefault(); this.a11y.resetFont(); }
  }

  ngOnInit(): void {
    this.subs.push(
      this.a11y.fontSize$.subscribe(s => this.fontSize = s),
      this.a11y.contrast$.subscribe(c => this.contrast = c),
      this.theme.isDark.subscribe(d => this.isDark = d)
    );
  }

  ngOnDestroy(): void { this.subs.forEach(s => s.unsubscribe()); }

  get fontPercent(): number { return Math.round((this.fontSize - this.a11y.MIN_SIZE) / (this.a11y.MAX_SIZE - this.a11y.MIN_SIZE) * 100); }

  toggleTheme(): void { this.theme.toggle(); }

  setContrast(mode: ContrastMode): void { this.a11y.setContrast(mode); }
}
