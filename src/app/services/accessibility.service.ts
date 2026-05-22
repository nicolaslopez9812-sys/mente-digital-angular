import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ContrastMode = 'normal' | 'high' | 'inverted';

@Injectable({ providedIn: 'root' })
export class AccessibilityService {
  private readonly LS_FONT    = 'mda_font_size';
  private readonly LS_CONTRAST = 'mda_contrast';

  private _fontSize$ = new BehaviorSubject<number>(100);
  private _contrast$ = new BehaviorSubject<ContrastMode>('normal');

  fontSize$ = this._fontSize$.asObservable();
  contrast$ = this._contrast$.asObservable();

  readonly MIN_SIZE = 80;
  readonly MAX_SIZE = 150;
  readonly STEP     = 10;

  constructor() { this.load(); }

  get fontSize(): number { return this._fontSize$.value; }
  get contrast(): ContrastMode { return this._contrast$.value; }

  increaseFont(): void { this.setFont(Math.min(this.fontSize + this.STEP, this.MAX_SIZE)); }
  decreaseFont(): void { this.setFont(Math.max(this.fontSize - this.STEP, this.MIN_SIZE)); }
  resetFont():    void { this.setFont(100); }

  setFont(size: number): void {
    this._fontSize$.next(size);
    document.documentElement.style.fontSize = size + '%';
    localStorage.setItem(this.LS_FONT, String(size));
  }

  setContrast(mode: ContrastMode): void {
    const prev = this._contrast$.value;
    // Remove old class
    document.body.classList.remove('contrast-high', 'contrast-inverted');
    this._contrast$.next(mode);
    if (mode === 'high')     document.body.classList.add('contrast-high');
    if (mode === 'inverted') document.body.classList.add('contrast-inverted');
    localStorage.setItem(this.LS_CONTRAST, mode);
  }

  private load(): void {
    const size     = Number(localStorage.getItem(this.LS_FONT)) || 100;
    const contrast = (localStorage.getItem(this.LS_CONTRAST) as ContrastMode) || 'normal';
    this.setFont(size);
    this.setContrast(contrast);
  }
}
