import { TestBed } from '@angular/core/testing';
import { SearchBox } from './search-box';

describe('SearchBox', () => {
  function setup() {
    const fixture = TestBed.createComponent(SearchBox);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('показывает панель истории при фокусе на поле', () => {
    const { fixture, el } = setup();
    const input = el.querySelector('input')!;

    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(el.querySelector('.panel')).toBeTruthy();
    expect(el.querySelectorAll('.history-item').length).toBeGreaterThan(0);
  });

  it('подставляет запрос из истории в поле', () => {
    const { fixture, el } = setup();
    const input = el.querySelector('input')!;
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const item = el.querySelector<HTMLButtonElement>('.history-item')!;
    item.click();
    fixture.detectChanges();

    expect(input.value).toBe(item.textContent!.trim());
  });
});
