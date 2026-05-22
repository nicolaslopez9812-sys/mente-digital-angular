import { Routes } from '@angular/router';
import { HomeComponent }          from './components/home/home.component';
import { LoginComponent }         from './components/login/login.component';
import { RegisterComponent }      from './components/register/register.component';
import { DashboardComponent }     from './components/dashboard/dashboard.component';
import { CursosPageComponent }    from './components/cursos/cursos-page.component';
import { AuthGuard }              from './guards/auth.guard';

export const routes: Routes = [
  { path: '',          component: HomeComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'cursos',    component: CursosPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**',        redirectTo: '' }
];
