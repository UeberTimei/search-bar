import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.html',
  styleUrl: './search-filters.css',
})
export class SearchFilters {
  protected readonly author = signal('');
  protected readonly onlyMe = signal(false);
  protected readonly flags = [
    { label: 'Я участник', value: signal(false) },
    { label: 'Строгий поиск', value: signal(false) },
    { label: 'В заголовках', value: signal(false) },
  ];
  protected readonly onlyFlags = [
    { label: 'Теги', value: signal(false) },
    { label: 'Просьбы', value: signal(false) },
    { label: 'Контакты', value: signal(false) },
  ];
}
