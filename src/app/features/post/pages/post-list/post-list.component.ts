import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '@app/core/interfaces/post';
import { AuthService } from '@app/core/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="post-container">
      <div class="post-header">
        <h1>Posts</h1>
        <button *ngIf="isAuthenticated" [routerLink]="['/post/create', blogId]" class="btn btn-primary">
          Crear Nuevo Post
        </button>
      </div>

      <div class="post-grid">
        <div *ngFor="let post of posts" class="post-card">
          <div class="post-image" *ngIf="post.imageUrl">
            <img [src]="post.imageUrl" [alt]="post.title">
          </div>
          <div class="post-content">
            <h2>{{ post.title }}</h2>
            <p class="post-meta">
              Por {{ post.author.name }} • {{ post.createdAt | date:'mediumDate' }}
            </p>
            <div class="post-tags">
              <span *ngFor="let tag of post.tags" class="tag">{{ tag }}</span>
            </div>
            <div class="post-actions">
              <a [routerLink]="['/post', post.id]" class="btn btn-secondary">Leer más</a>
              <button *ngIf="isMyPost(post)" 
                      (click)="deletePost(post.id)" 
                      class="btn btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .post-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .post-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .post-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s;
    }

    .post-card:hover {
      transform: translateY(-5px);
    }

    .post-image {
      height: 200px;
      overflow: hidden;
    }

    .post-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .post-content {
      padding: 1.5rem;
    }

    .post-content h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }

    .post-meta {
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .post-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      background: #f0f0f0;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .post-actions {
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
  `]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isAuthenticated = false;
  blogId: string = '';
  private authService = inject(AuthService);

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.blogId = this.route.snapshot.paramMap.get('blogId') || '';
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPostsByBlog(this.blogId).subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error al cargar los posts:', error);
      }
    });
  }

  isMyPost(post: Post): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser !== null && currentUser.id === post.author.id;
  }

  deletePost(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar el post:', error);
        }
      });
    }
  }
}
