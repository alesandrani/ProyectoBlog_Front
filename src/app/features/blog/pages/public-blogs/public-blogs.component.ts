import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '@app/core/interfaces/blog';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-public-blogs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  template: `
    <!-- Hero Section -->
    <div class="hero-section bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Descubre Historias Inspiradoras</h1>
          <p class="text-xl mb-8 opacity-90">Explora una colección de blogs escritos por apasionados creadores de contenido</p>
          <div class="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              [(ngModel)]="searchQuery"
              (ngModelChange)="filterBlogs()"
              placeholder="Buscar blogs..." 
              class="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <button class="absolute right-2 top-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <!-- Categories -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Categorías</h2>
        <div class="flex flex-wrap gap-2">
          <button 
            *ngFor="let category of categories" 
            (click)="filterByCategory(category)"
            [class.bg-blue-500]="selectedCategory === category"
            [class.text-white]="selectedCategory === category"
            class="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
        <span>{{ error }}</span>
        <button class="text-red-700 hover:text-red-900" (click)="loadPublicBlogs()">
          <span class="text-xl">&times;</span>
        </button>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && filteredBlogs.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <h3 class="mt-2 text-lg font-medium text-gray-900">No se encontraron blogs</h3>
          <p class="mt-1 text-gray-500">Intenta con otros términos de búsqueda o categorías.</p>
        </div>
      </div>

      <!-- Blog Grid -->
      <div *ngIf="!loading && !error && filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div *ngFor="let blog of filteredBlogs" 
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="relative">
            <img *ngIf="blog.imageUrl" [src]="blog.imageUrl" [alt]="blog.title" class="w-full h-56 object-cover">
            <div class="absolute top-4 right-4">
              <span class="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ blog.category || 'General' }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center mb-4">
              <img *ngIf="blog.author && blog.author.avatar" [src]="blog.author.avatar" [alt]="blog.author.name" class="w-10 h-10 rounded-full mr-3">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ blog.author ? blog.author.name : 'Anónimo' }}</p>
                <p class="text-xs text-gray-500">{{ blog.createdAt | date:'mediumDate' }}</p>
              </div>
            </div>
            <h2 class="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
              {{ blog.title }}
            </h2>
            <p class="text-gray-600 mb-4 line-clamp-3">{{ blog.summary }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{{ blog.views || 0 }} vistas</span>
              </div>
              <a [routerLink]="['/blogs', blog.id]" 
                class="text-blue-500 hover:text-blue-700 font-medium transition-colors flex items-center">
                Leer más
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/blog-hero.jpg');
      background-size: cover;
      background-position: center;
    }
  `]
})
export class PublicBlogsComponent implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';
  selectedCategory: string | null = null;

  categories = ['Tecnología', 'Desarrollo', 'Diseño', 'Marketing', 'Negocios', 'Educación'];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadPublicBlogs();
  }

  loadPublicBlogs() {
    this.loading = true;
    this.error = null;
    this.blogService.getPublicBlogs().pipe(
      catchError(err => {
        this.error = 'Error al cargar los blogs públicos. Por favor, intenta de nuevo.';
        return of([]);
      }),
      finalize(() => this.loading = false)
    ).subscribe(blogs => {
      this.blogs = blogs;
      this.filteredBlogs = blogs;
    });
  }

  filterBlogs() {
    if (!this.searchQuery && !this.selectedCategory) {
      this.filteredBlogs = this.blogs;
      return;
    }

    this.filteredBlogs = this.blogs.filter(blog => {
      const matchesSearch =
        !this.searchQuery ||
        blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCategory = !this.selectedCategory || blog.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.filterBlogs();
  }
}
