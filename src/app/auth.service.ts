import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from './core/interfaces/auth';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    console.log('Iniciando login con credenciales:', { email: credentials.email });
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Respuesta completa del login:', response);
          if (isPlatformBrowser(this.platformId)) {
            // Verificar la estructura de la respuesta
            const token = response.access_token;
            const user = response.user;
            
            if (!token) {
              console.error('No se encontró el token en la respuesta');
              console.log('Estructura de la respuesta:', JSON.stringify(response, null, 2));
              throw new Error('Token no encontrado en la respuesta');
            }

            console.log('Guardando token en localStorage');
            localStorage.setItem('token', token);
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              console.log('Usuario guardado:', user);
            }
            console.log('Token guardado:', token.substring(0, 20) + '...');
          }
        }),
        catchError(this.handleError)
      );
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials)
      .pipe(
        tap(response => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.access_token);
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return token !== null && token !== undefined && token !== '';
    }
    return false;
  }

  getCurrentUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del backend
      errorMessage = error.error?.message || `Código de error: ${error.status}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
