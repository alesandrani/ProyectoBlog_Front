import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CreateBlogDto } from '@app/core/interfaces/blog';
import { CommonModule } from '@angular/common';  // Agregado
import { ReactiveFormsModule } from '@angular/forms';  // Agregado

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]  // Importación de módulos
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
        tags: this.blogForm.value.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter(Boolean)
      };

      this.blogService.createBlog(blogData).subscribe({
        next: () => this.router.navigate(['/blog']),
        error: (err) => console.error('Error al crear el blog:', err)
      });
    }
  }
}
