import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  ocupacion?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USERS_KEY   = 'mentedigital_users';
  private readonly SESSION_KEY = 'mentedigital_user';
  private readonly THEME_KEY   = 'mentedigital_theme';

  constructor(private router: Router) {}

  register(nombre: string, apellido: string, email: string, password: string): string | null {
    const users: User[] = this.getUsers();
    if (users.find(u => u.email === email.toLowerCase())) {
      return 'Ya existe una cuenta con ese correo.';
    }
    const newUser: User = { nombre, apellido, email: email.toLowerCase(), password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    this.saveSession({ nombre, apellido, email: email.toLowerCase() });
    return null;
  }

  login(email: string, password: string): string | null {
    const users: User[] = this.getUsers();
    const user = users.find(u => u.email === email.toLowerCase() && u.password === password);
    if (!user) return 'Correo o contraseña incorrectos.';
    this.saveSession({ nombre: user.nombre, apellido: user.apellido, email: user.email });
    return null;
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

  updateProfile(data: Partial<User>): void {
    const session = this.getSession();
    if (!session) return;
    const updated = { ...session, ...data };
    this.saveSession(updated);
    const users: User[] = this.getUsers();
    const idx = users.findIndex(u => u.email === session.email);
    if (idx > -1) { users[idx] = { ...users[idx], ...data }; localStorage.setItem(this.USERS_KEY, JSON.stringify(users)); }
  }

  getTheme(): string { return localStorage.getItem(this.THEME_KEY) || 'light'; }
  setTheme(t: string): void { localStorage.setItem(this.THEME_KEY, t); }

  private getUsers(): User[] {
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  private saveSession(u: User): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(u));
  }
}
