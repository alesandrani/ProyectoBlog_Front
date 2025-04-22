import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

interface LoginResponse {
  data: {
    access_token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
  status: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'current_user';
  private apiUrl = environment.apiUrl;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: LoginResponse) => {
          console.log('AuthService - Login response:', response);
          
          if (response.data.access_token && response.data.user) {
            console.log('AuthService - Guardando token y usuario');
            
            // Guardar el token
            localStorage.setItem(this.tokenKey, response.data.access_token);
            console.log('AuthService - Token guardado:', localStorage.getItem(this.tokenKey));
            
            // Guardar el usuario
            localStorage.setItem(this.userKey, JSON.stringify(response.data.user));
            console.log('AuthService - Usuario guardado:', localStorage.getItem(this.userKey));
            
            // Verificar que los datos se guardaron correctamente
            const savedToken = this.getToken();
            const savedUser = this.getCurrentUser();
            console.log('AuthService - Token guardado:', !!savedToken);
            console.log('AuthService - Usuario guardado:', !!savedUser);
            
            if (savedToken && savedUser) {
              console.log('AuthService - Redirigiendo a /blogs');
              this.router.navigate(['/blogs'])
                .then(success => {
                  console.log('AuthService - Redirección exitosa:', success);
                  if (!success) {
                    console.error('AuthService - Error en la redirección');
                  }
                })
                .catch(error => {
                  console.error('AuthService - Error en redirección:', error);
                });
            } else {
              console.error('AuthService - Error: Token o usuario no se guardaron correctamente');
            }
          } else {
            console.error('AuthService - Error: No se recibió token o usuario en la respuesta');
          }
        })
      );
  }

  register(email: string, password: string, name: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, { email, password, name })
      .pipe(
        tap(response => {
          this.setToken(response.data.access_token);
          this.setCurrentUser(response.data.user);
        })
      );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    const isAuth = !!(token && user);
    console.log('AuthService - Verificación de autenticación:', isAuth);
    console.log('AuthService - Token presente:', !!token);
    console.log('AuthService - Usuario presente:', !!user);
    return isAuth;
  }

  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private setCurrentUser(user: { id: string; email: string; name: string }): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('current_user', JSON.stringify(user));
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      console.log('AuthService - Sesión cerrada correctamente');
    }
  }
}
