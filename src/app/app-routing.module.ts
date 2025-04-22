import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { BlogListComponent } from './features/blog/pages/blog-list/blog-list.component';

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
    path: 'blogs',
    component: BlogListComponent

  },
  {
    path: 'post',
    loadChildren: () => import('./features/post/post-routing.module').then(m => m.PostRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user-routing.module').then(m => m.UserRoutingModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: '/blogs',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: '/blogs'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }