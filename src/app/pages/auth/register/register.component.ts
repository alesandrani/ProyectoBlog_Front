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
  selector: 'app-register',
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
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Registrarse</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="name">
              <mat-error *ngIf="registerForm.get('name')?.hasError('required')">
                Nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email es requerido
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" type="password">
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Contraseña es requerida
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                La contraseña debe tener al menos 6 caracteres
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirmar Contraseña</mat-label>
              <input matInput formControlName="confirmPassword" type="password">
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                Confirmar contraseña es requerida
              </mat-error>
              <mat-error *ngIf="registerForm.hasError('passwordMismatch')">
                Las contraseñas no coinciden
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
              Registrarse
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p>¿Ya tienes una cuenta? <a routerLink="/auth/login">Inicia Sesión</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
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
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register(email, password, name).subscribe({
        next: (response) => {
          // Redirigir al dashboard o página principal
          console.log('Registration successful', response);
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
} 