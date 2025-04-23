import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from '@app/core/interfaces/blog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: 'blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'] 
})
export class BlogCardComponent {
  @Input() blog!: Blog;
  @Input() isAuthor = false;
  @Input() loading = false;
  @Output() delete = new EventEmitter<number>();
  
  // Make Array available in the template
  protected readonly Array = Array;

  onDelete() {
    this.delete.emit(this.blog.id);
  }
}
