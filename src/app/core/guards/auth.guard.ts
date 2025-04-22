import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard - Verificando autenticación para ruta:', state.url);
    
    // Verificar el token y el usuario
    const token = this.authService.getToken();
    const user = this.authService.getCurrentUser();
    
    console.log('AuthGuard - Token presente:', !!token);
    console.log('AuthGuard - Usuario presente:', !!user);
    
    if (token && user) {
      console.log('AuthGuard - Usuario autenticado, permitiendo acceso a:', state.url);
      return true;
    }

    console.log('AuthGuard - Usuario no autenticado, redirigiendo a login');
    this.router.navigate(['/login']);
    return false;
  }
}
