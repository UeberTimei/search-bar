import { TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  function setup() {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('открывает поиск по кнопке', () => {
    const { fixture, el } = setup();

    el.querySelector<HTMLButtonElement>('button[data-search-toggle]')!.click();
    fixture.detectChanges();

    expect(el.querySelector('app-search-box')).toBeTruthy();
  });

  it('закрывает поиск по Escape', () => {
    const { fixture, el } = setup();
    el.querySelector<HTMLButtonElement>('button[data-search-toggle]')!.click();
    fixture.detectChanges();

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(el.querySelector('app-search-box')).toBeNull();
  });

  it('закрывает поиск по клику вне шапки', () => {
    const { fixture, el } = setup();
    el.querySelector<HTMLButtonElement>('button[data-search-toggle]')!.click();
    fixture.detectChanges();

    document.body.click();
    fixture.detectChanges();

    expect(el.querySelector('app-search-box')).toBeNull();
  });
});
