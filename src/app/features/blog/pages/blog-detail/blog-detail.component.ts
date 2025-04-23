import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '@app/core/interfaces/blog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBlog(+id);
    } else {
      this.router.navigate(['/blogs']);
    }
  }

  private loadBlog(id: number): void {
    this.loading = true;
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        console.log('Blog object received in component:', JSON.stringify(blog, null, 2));
        if (blog) {
          this.blog = blog;
          this.error = null;
        } else {
          this.error = 'No se pudo cargar el blog. Puede que no exista.';
          this.blog = null;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error in subscription to getBlogById:', error);
        this.error = 'Ocurrió un error inesperado al cargar el blog.';
        this.blog = null;
        this.loading = false;
      }
    });
  }

  navigateToEdit(): void {
    if (this.blog) {
      this.router.navigate(['/blogs', this.blog.id, 'edit']);
    }
  }
}
