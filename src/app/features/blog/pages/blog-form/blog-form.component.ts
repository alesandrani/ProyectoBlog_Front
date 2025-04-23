import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '@app/core/services/blog.service';
import { CreateBlogDto } from '@app/core/interfaces/blog';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  blogForm!: FormGroup;
  isEditMode = false;
  blogId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.blogId;
    this.initForm();

    if (this.isEditMode && this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe((blog) => {
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content,
          summary: blog.summary,
          isPublic: blog.isPublic,
          tags: blog.tags?.join(', ') || '',
          imageUrl: blog.imageUrl
        });
      });
    }
  }

  initForm(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      summary: ['', Validators.required],
      isPublic: [false, Validators.required],
      tags: [''],
      imageUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.blogForm.invalid) return;

    const blogData: CreateBlogDto = {
      ...this.blogForm.value,
      tags: this.blogForm.value.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter(Boolean)
    };

    if (this.isEditMode && this.blogId) {
      this.blogService.updateBlog(this.blogId, blogData).subscribe({
        next: () => this.router.navigate(['/blogs']),
        error: (err) => console.error('Error al actualizar el blog:', err)
      });
    } else {
      this.blogService.createBlog(blogData).subscribe({
        next: () => this.router.navigate(['/blogs']),
        error: (err) => console.error('Error al crear el blog:', err)
      });
    }
  }
}
