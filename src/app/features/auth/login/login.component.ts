import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { LoginCredentials } from '../../../core/interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Iniciar Sesión</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" formControlName="email" class="form-control">
            <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error-message">
              Email inválido
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" formControlName="password" class="form-control">
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error-message">
              La contraseña es requerida
            </div>
          </div>

          <button type="submit" [disabled]="loginForm.invalid" class="btn btn-primary">
            Iniciar Sesión
          </button>
        </form>
        
        <div class="auth-links">
          <p>¿No tienes una cuenta? <a routerLink="/register">Regístrate</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .auth-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-primary:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .auth-links {
      margin-top: 1rem;
      text-align: center;
    }

    .auth-links a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      });
    }
  }
} 