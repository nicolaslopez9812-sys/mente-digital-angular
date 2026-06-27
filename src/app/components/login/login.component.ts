import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccessibilityBarComponent } from '../accessibility/accessibility-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AccessibilityBarComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email    = '';
  password = '';
  error    = '';
  loading  = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.email || !this.password) { this.error = 'Completa todos los campos.'; return; }
    this.loading = true; this.error = '';
    this.auth.login(this.email, this.password).subscribe((err) => {
      if (err) { this.error = err; this.loading = false; return; }
      setTimeout(() => this.router.navigate(['/dashboard']), 800);
    });
  }
}
