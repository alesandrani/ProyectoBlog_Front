import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogCreateComponent } from './pages/blog-create/blog-create.component';
import { BlogEditComponent } from './pages/blog-edit/blog-edit.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { PublicBlogsComponent } from './pages/public-blogs/public-blogs.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'public',
    component: PublicBlogsComponent
  },
  {
    path: 'create',
    component: BlogCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: BlogEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: BlogDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }