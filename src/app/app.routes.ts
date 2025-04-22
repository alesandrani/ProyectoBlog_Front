import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogListComponent } from './features/blog/pages/blog-list/blog-list.component';
import { BlogCreateComponent } from './features/blog/pages/blog-create/blog-create.component';
import { BlogDetailComponent } from './features/blog/pages/blog-detail/blog-detail.component';
import { BlogEditComponent } from './features/blog/pages/blog-edit/blog-edit.component';
import { PublicBlogsComponent } from './features/blog/pages/public-blogs/public-blogs.component';
import { PostListComponent } from './features/post/pages/post-list/post-list.component';
import { PostDetailComponent } from './features/post/pages/post-detail/post-detail.component';
import { PostFormComponent } from './features/post/pages/post-form/post-form.component';
import { ProfileComponent } from './features/user/pages/profile/profile.component';
import { EditProfileComponent } from './features/user/pages/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'blogs',
    children: [
      { path: '', component: BlogListComponent },
      { path: 'create', component: BlogCreateComponent },
      { path: 'public', component: PublicBlogsComponent },
      { path: ':id', component: BlogDetailComponent },
      { path: ':id/edit', component: BlogEditComponent }
    ]
  },
  {
    path: 'posts',
    children: [
      { path: '', component: PostListComponent },
      { path: 'create', component: PostFormComponent },
      { path: ':id', component: PostDetailComponent },
      { path: ':id/edit', component: PostFormComponent }
    ]
  },
  {
    path: 'user',
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: EditProfileComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
