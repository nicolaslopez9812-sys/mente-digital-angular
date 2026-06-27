import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccessibilityBarComponent } from '../accessibility/accessibility-bar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AccessibilityBarComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  nombre   = '';
  apellido = '';
  email    = '';
  password = '';
  confirm  = '';
  error    = '';
  loading  = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.nombre || !this.email || !this.password) { this.error = 'Completa todos los campos.'; return; }
    if (this.password.length < 8) { this.error = 'La contraseña debe tener al menos 8 caracteres.'; return; }
    if (this.password !== this.confirm) { this.error = 'Las contraseñas no coinciden.'; return; }
    this.loading = true; this.error = '';
    this.auth.register(this.nombre, this.apellido, this.email, this.password).subscribe((err) => {
      if (err) { this.error = err; this.loading = false; return; }
      setTimeout(() => this.router.navigate(['/dashboard']), 1000);
    });
  }
}
