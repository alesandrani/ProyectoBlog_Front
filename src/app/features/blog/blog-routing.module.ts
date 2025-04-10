import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogCreateComponent } from './pages/blog-create/blog-create.component';
import { BlogEditComponent } from './pages/blog-edit/blog-edit.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: 'create',
    component: BlogCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: ':id/edit',
    component: BlogEditComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }