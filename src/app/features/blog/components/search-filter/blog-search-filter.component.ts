import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-search-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: 'blog-search-filter.component.html',
  styleUrls: ['blog-search-filter.component.scss']
})
export class BlogSearchFilterComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();

  searchQuery = '';
  selectedFilter = 'all';

  filters = [
    { label: 'Todos', value: 'all' },
    { label: 'Públicos', value: 'public' },
    { label: 'Privados', value: 'private' }
  ];

  onSearchChange() {
    this.searchChange.emit(this.searchQuery);
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.filterChange.emit(filter);
  }
}
