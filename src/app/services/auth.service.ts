import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  ocupacion?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly SESSION_KEY = 'mentedigital_user';
  private readonly THEME_KEY   = 'mentedigital_theme';
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  register(nombre: string, apellido: string, email: string, password: string): Observable<string | null> {
    return this.http.post<User>(`${this.apiUrl}/register`, { nombre, apellido, email, password }).pipe(
      tap((user) => this.saveSession(user)),
      map(() => null),
      catchError((error: HttpErrorResponse) => of(error.error?.message || 'No fue posible crear la cuenta.'))
    );
  }

  login(email: string, password: string): Observable<string | null> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => this.saveSession(user)),
      map(() => null),
      catchError((error: HttpErrorResponse) => of(error.error?.message || 'Correo o contraseña incorrectos.'))
    );
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/login']);
  }

  getSession(): User | null {
    const raw = localStorage.getItem(this.SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean { return !!this.getSession(); }

  updateProfile(data: Partial<User>): Observable<User | null> {
    const session = this.getSession();
    if (!session) return of(null);

    return this.http.patch<User>(`${this.apiUrl}/profile/${encodeURIComponent(session.email)}`, data).pipe(
      tap((user) => this.saveSession(user)),
      catchError(() => of(null))
    );
  }

  getTheme(): string { return localStorage.getItem(this.THEME_KEY) || 'light'; }
  setTheme(t: string): void { localStorage.setItem(this.THEME_KEY, t); }

  private saveSession(u: User): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(u));
  }
}
