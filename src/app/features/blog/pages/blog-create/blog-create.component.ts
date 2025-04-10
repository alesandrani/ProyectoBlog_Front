import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CreateBlogDto } from '@app/core/interfaces/blog';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="blog-form-container">
      <h1>Crear Nuevo Blog</h1>
      <form [formGroup]="blogForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Título</label>
          <input type="text" id="title" formControlName="title" class="form-control">
          <div *ngIf="blogForm.get('title')?.invalid && blogForm.get('title')?.touched" class="error-message">
            El título es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="content">Contenido</label>
          <textarea id="content" formControlName="content" class="form-control" rows="10"></textarea>
          <div *ngIf="blogForm.get('content')?.invalid && blogForm.get('content')?.touched" class="error-message">
            El contenido es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="tags">Etiquetas (separadas por comas)</label>
          <input type="text" id="tags" formControlName="tags" class="form-control">
          <div class="help-text">Ejemplo: tecnología, programación, angular</div>
        </div>

        <div class="form-group">
          <label for="imageUrl">URL de la imagen (opcional)</label>
          <input type="url" id="imageUrl" formControlName="imageUrl" class="form-control">
        </div>

        <div class="form-actions">
          <button type="button" routerLink="/blog" class="btn btn-secondary">Cancelar</button>
          <button type="submit" [disabled]="blogForm.invalid" class="btn btn-primary">
            Crear Blog
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .blog-form-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea.form-control {
      resize: vertical;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .help-text {
      color: #666;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class BlogCreateComponent {
  blogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [''],
      imageUrl: ['']
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blogData: CreateBlogDto = {
        ...this.blogForm.value,
        tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      };

      this.blogService.createBlog(blogData).subscribe({
        next: () => {
          this.router.navigate(['/blog']);
        },
        error: (error) => {
          console.error('Error al crear el blog:', error);
        }
      });
    }
  }
} 