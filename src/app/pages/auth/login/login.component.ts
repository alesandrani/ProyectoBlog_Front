import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Iniciar Sesión</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email es requerido
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" type="password">
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Contraseña es requerida
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
              Iniciar Sesión
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p>¿No tienes una cuenta? <a routerLink="/auth/register">Regístrate</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
    }

    mat-card {
      width: 100%;
      max-width: 400px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }

    mat-card-actions {
      display: flex;
      justify-content: center;
      padding: 1rem;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          // Redirigir al dashboard o página principal
          console.log('Login successful', response);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }
} 