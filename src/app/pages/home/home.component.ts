import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service'; 
import { Blog } from '../../core/interfaces/blog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { BlogCardComponent } from '../../features/blog/components/blog-card/blog-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    RouterModule,
    BlogCardComponent
  ],
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.loadPublicBlogs();
  }

  navigateToBlog(id: number): void {
    this.router.navigate(['/blogs', id]);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/blogs', id, 'edit']).then(() => {
      this.loadPublicBlogs();
    });
  }

  private loadPublicBlogs(): void {
    this.homeService.getPublicBlogs().subscribe({
      next: (blogs: Blog[]) => {
        this.blogs = blogs;
      },
      error: (error: any) => {
        console.error('Error loading blogs:', error);
      }
    });
  }
}


