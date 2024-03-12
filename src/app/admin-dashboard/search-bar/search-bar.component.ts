import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter();

  onSearch() {
    this.search.emit(this.searchTerm);
  }
}
