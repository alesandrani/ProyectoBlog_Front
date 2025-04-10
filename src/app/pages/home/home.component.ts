import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlogService } from '../../core/services/blog.service';
import { Blog } from '../../core/interfaces/blog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Blogs Públicos</h1>
        <div class="auth-buttons">
          <a mat-raised-button color="primary" routerLink="/auth/login">Iniciar Sesión</a>
          <a mat-raised-button color="accent" routerLink="/auth/register">Registrarse</a>
        </div>
      </div>

      <div class="blog-grid">
        <mat-card *ngFor="let blog of blogs" class="blog-card">
          <mat-card-header>
            <mat-card-title>{{ blog.title }}</mat-card-title>
            <mat-card-subtitle>Por {{ blog.author }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ blog.summary }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/blog', blog.id]">
              Leer más
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .auth-buttons {
      display: flex;
      gap: 1rem;
    }

    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .blog-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
    }
  `]
})
export class HomeComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPublicBlogs();
  }

  private loadPublicBlogs(): void {
    this.blogService.getPublicBlogs().subscribe({
      next: (blogs: Blog[]) => {
        this.blogs = blogs;
      },
      error: (error: any) => {
        console.error('Error loading blogs:', error);
      }
    });
  }
} 