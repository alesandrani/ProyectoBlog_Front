import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog, UpdateBlogDto } from '@app/core/interfaces/blog';

@Component({
  selector: 'app-blog-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'blog-edit.component.html',   
  styleUrls: ['blog-edit.component.scss']    // Aquí conectas tu archivo SCSS
})
export class BlogEditComponent implements OnInit {
  blogForm: FormGroup;
  blogId: number = 0;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [''],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.blogId = idParam ? parseInt(idParam, 10) : 0;
    
    if (isNaN(this.blogId) || this.blogId <= 0) {
      console.error('Invalid blog ID');
      this.router.navigate(['/blog']);
      return;
    }
    
    this.loadBlog();
  }

  loadBlog() {
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (blog) => {
        this.blogForm.patchValue({
          title: blog.title,
          content: blog.content,
          tags: blog.tags.join(', '),
          imageUrl: blog.imageUrl || ''
        });
      },
      error: (error) => {
        console.error('Error al cargar el blog:', error);
        this.router.navigate(['/blog']);
      }
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blogData: UpdateBlogDto = {
        ...this.blogForm.value,
        tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      };

      this.blogService.updateBlog(this.blogId, blogData).subscribe({
        next: () => {
          this.router.navigate(['/blog']);
        },
        error: (error) => {
          console.error('Error al actualizar el blog:', error);
        }
      });
    }
  }
}
