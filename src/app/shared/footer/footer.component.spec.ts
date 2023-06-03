import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    compiled = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should contain a footer with class "information"', () => {
    const footer = el.query(By.css('.information'));

    expect(footer).toBeTruthy();
  });

  it('should contain basic information on how to add and edit todo elements', () => {
    const paragraphs = el.queryAll(By.css('p'));

    expect(paragraphs.length).toBe(3);

    const paragraphTextList: string[] = paragraphs.map((p) => {
      return p.nativeElement.innerHTML;
    });
    const editTodoParagraph = paragraphTextList.find((p) => p.includes('edit a todo'));
    const addTodoParagraph = paragraphTextList.find((p) => p.includes('add a new todo'));

    expect(editTodoParagraph).toBeTruthy();
    expect(editTodoParagraph).toContain('Double-click');

    expect(addTodoParagraph).toBeTruthy();
    expect(addTodoParagraph).toContain('Enter');
  });
});
