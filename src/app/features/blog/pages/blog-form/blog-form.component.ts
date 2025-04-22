import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '@app/core/services/blog.service';
import { CreateBlogDto } from '@app/core/interfaces/blog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  blogForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
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
