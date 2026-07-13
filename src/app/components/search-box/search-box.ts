import { afterNextRender, Component, ElementRef, signal, viewChild } from '@angular/core';
import { SearchFilters } from '../search-filters/search-filters';

@Component({
  selector: 'app-search-box',
  imports: [SearchFilters],
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class SearchBox {
  private readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly query = signal('');
  protected readonly panelOpen = signal(false);
  protected readonly history = [
    'закрепить теги',
    'кнопка',
    'приложение',
    'форма',
    'текстовое поле',
    'выпадающий список',
  ];

  constructor() {
    afterNextRender(() => this.searchInput().nativeElement.focus());
  }

  protected pick(item: string): void {
    this.query.set(item);
    this.searchInput().nativeElement.focus();
  }
}
