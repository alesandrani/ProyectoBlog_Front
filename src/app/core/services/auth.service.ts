import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'current_user';
  private apiUrl = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setCurrentUser(response.user);
        })
      );
  }

  register(email: string, password: string, name: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, { email, password, name })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setCurrentUser(response.user);
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
    return !!this.getToken();
  }

  getCurrentUser(): { id: string; email: string; name: string } | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  private setCurrentUser(user: { id: string; email: string; name: string }): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
  }
}
