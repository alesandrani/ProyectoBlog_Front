import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '@app/core/interfaces/blog';
import { AuthService } from '@app/core/services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { BlogHeroComponent } from '../../components/hero/hero.component';
import { BlogSearchFilterComponent } from '../../components/search-filter/blog-search-filter.component';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogEmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BlogHeroComponent,
    BlogSearchFilterComponent,
    BlogCardComponent,
    BlogEmptyStateComponent
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  currentUserId = 0;
  loading = false;
  error: string | null = null;
  searchQuery = '';
  selectedFilter: 'all' | 'public' | 'private' = 'all';

  constructor(
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBlogs();
    const user = this.authService.getCurrentUser();
    this.currentUserId = user?.id ?? 0;
  }

  loadBlogs() {
    this.loading = true;
    this.error = null;

    this.blogService.getBlogs().pipe(
      catchError(() => {
        this.error = 'Error al cargar los blogs. Por favor, intenta de nuevo.';
        return of([]);
      }),
      finalize(() => this.loading = false)
    ).subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
      this.filteredBlogs = blogs;
    });
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.filterBlogs();
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter as 'all' | 'public' | 'private';
    this.filterBlogs();
  }

  filterBlogs() {
    this.filteredBlogs = this.blogs.filter(blog => {
      const matchesSearch =
        !this.searchQuery ||
        blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesFilter =
        this.selectedFilter === 'all' ||
        (this.selectedFilter === 'public' && blog.isPublic) ||
        (this.selectedFilter === 'private' && !blog.isPublic);

      return matchesSearch && matchesFilter;
    });
  }

  deleteBlog(id: number) {
    if (confirm('¿Estás segura de que quieres eliminar este blog?')) {
      this.loading = true;
      this.error = null;

      this.blogService.deleteBlog(id).pipe(
        catchError(() => {
          this.error = 'Error al eliminar el blog.';
          return of(null);
        }),
        finalize(() => this.loading = false)
      ).subscribe(result => {
        if (result !== null) {
          this.blogs = this.blogs.filter(blog => blog.id !== id);
          this.filteredBlogs = this.filteredBlogs.filter(blog => blog.id !== id);
        }
      });
    }
  }

  isAuthor(blog: Blog): boolean {
    return blog.userId === this.currentUserId;
  }
}
