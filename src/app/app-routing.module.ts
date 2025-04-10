import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog-routing.module').then(m => m.BlogRoutingModule),
    canActivate: [authGuard]
  },
  {
    path: 'post',
    loadChildren: () => import('./features/post/post-routing.module').then(m => m.PostRoutingModule),
    canActivate: [authGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user-routing.module').then(m => m.UserRoutingModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/blog'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }