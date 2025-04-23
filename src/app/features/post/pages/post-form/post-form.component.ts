import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/core/services/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBlogDto, UpdateBlogDto } from '@app/core/interfaces/blog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PostFormComponent implements OnInit {
  blogForm!: FormGroup;
  blogId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('id');
      this.isEditMode = !!this.blogId;

      if (this.isEditMode) {
        this.loadBlogData(this.blogId!);
      }
    });
  }

  loadBlogData(id: string) {
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content,
          tags: blog.tags.join(', ')
        });
      },
      error: (err) => {
        console.error('Error cargando blog:', err);
      }
    });
  }

  onSubmit() {
    if (this.blogForm.invalid) return;

    const tagsArray = this.blogForm.value.tags
      .split(',')
      .map((tag: string) => tag.trim())
      .filter(Boolean);

    if (this.isEditMode) {
      const updatedBlog: UpdateBlogDto = {
        ...this.blogForm.value,
        tags: tagsArray
      };
      this.blogService.updateBlog(this.blogId!, updatedBlog).subscribe({
        next: () => this.router.navigate(['/blogs']),
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      const newBlog: CreateBlogDto = {
        ...this.blogForm.value,
        tags: tagsArray
      };
      this.blogService.createBlog(newBlog).subscribe({
        next: () => this.router.navigate(['/blogs']),
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }
}
