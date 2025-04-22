import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-empty-state',
  standalone: true,
  imports: [RouterModule],
  templateUrl: 'blog-empty-state.component.html',
  styleUrls: ['./blog-empty-state.component.scss']
})
export class BlogEmptyStateComponent {}
