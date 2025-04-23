import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from '@app/core/interfaces/blog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule, A11yModule],
  templateUrl: 'blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent {
  @Input() blog!: Blog;
  @Input() isAuthor = false;
  @Input() loading = false;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.blog.id);
  }
  onEdit() {
    this.edit.emit(this.blog.id);  // Emitimos el evento para editar
  }
}
