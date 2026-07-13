import { afterNextRender, Component, ElementRef, inject, Injector, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SearchBox } from '../search-box/search-box';

@Component({
  selector: 'app-header',
  imports: [SearchBox, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'closeSearch()',
  },
})
export class Header {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected readonly searchOpen = signal(false);
  protected readonly navItems = ['Ссылки', 'Контакты', 'Теги', 'Избранное', 'Посещения'];

  protected openSearch(): void {
    this.searchOpen.set(true);
  }

  protected closeSearch(): void {
    if (!this.searchOpen()) {
      return;
    }

    this.searchOpen.set(false);

    afterNextRender(() => this.focusSearchToggle(), { injector: this.injector });
  }

  private focusSearchToggle(): void {
    const toggleButtons = this.elementRef.nativeElement.querySelectorAll<HTMLButtonElement>(
      'button[data-search-toggle]',
    );

    const visibleToggleButton = Array.from(toggleButtons).find(
      (button) => button.offsetParent !== null,
    );

    visibleToggleButton?.focus();
  }

  protected onDocumentClick(event: Event): void {
    const shouldClose =
      this.searchOpen() && !this.elementRef.nativeElement.contains(event.target as Node);

    if (shouldClose) {
      this.closeSearch();
    }
  }
}
