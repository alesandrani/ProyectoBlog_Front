import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() blogUpdated = new EventEmitter<void>();
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
      summary: [''],
      isPublic: [true],
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
        if (blog) {
          this.blogForm.patchValue({
            title: blog.title,
            content: blog.content,
            summary: blog.summary || '',
            isPublic: blog.isPublic === undefined ? true : blog.isPublic,
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
            imageUrl: blog.imageUrl || ''
          });
        } else {
          console.error(`Blog with ID ${this.blogId} not found.`);
          this.router.navigate(['/blogs']);
        }
      },
      error: (error) => {
        console.error('Error al cargar el blog:', error);
        this.router.navigate(['/blogs']);
      }
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blogData: UpdateBlogDto = {
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        summary: this.blogForm.value.summary || '',
        isPublic: this.blogForm.value.isPublic || true,
        tags: this.blogForm.value.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        imageUrl: this.blogForm.value.imageUrl || ''
      };

      this.blogService.updateBlog(this.blogId, blogData).subscribe({
        next: () => {
          this.blogUpdated.emit();
          this.router.navigate(['/blogs', this.blogId]); 
        },
        error: (error) => {
          console.error('Error al actualizar el blog:', error);
        }
      });
    }
  }
}
