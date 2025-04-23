import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostFormComponent } from './pages/post-form/post-form.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'detail/:id', component: PostDetailComponent },
  { path: 'create', component: PostFormComponent },
  { path: 'blogs', component: PostListComponent },
  { path: 'edit/:id', component: PostFormComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PostListComponent,
    PostDetailComponent,
    PostFormComponent
  ],
  exports: [RouterModule]
})
export class PostRoutingModule {}