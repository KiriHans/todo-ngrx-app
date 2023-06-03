import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageComponent } from './todo-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from '../app.reducer';
import { TodoItem } from './models/todo-item.model';
import { provideMockStore } from '@ngrx/store/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  const initialState: AppState = {
    todos: [new TodoItem('Test todo'), new TodoItem('Test todo 2')],
    filter: 'all',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoPageComponent, NoopAnimationsModule, RouterTestingModule],
      providers: [provideMockStore<AppState>({ initialState })],
    });
    fixture = TestBed.createComponent(TodoPageComponent);
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

  it('should render todo add, list and footer', () => {
    const todoAdd = el.query(By.css('app-todo-add'));
    const todoList = el.query(By.css('app-todo-list'));
    const todoItems = el.queryAll(By.css('app-todo-item'));
    const todoFooter = el.query(By.css('app-todo-footer'));
    const footer = el.query(By.css('app-footer'));

    expect(todoAdd).toBeTruthy();
    expect(todoList).toBeTruthy();
    expect(todoItems).toBeTruthy();
    expect(todoItems).toHaveLength(initialState.todos.length);
    expect(todoFooter).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  it('should have an h2 Element', () => {
    const title = el.query(By.css('h2'));

    expect(title).toBeTruthy();
  });
});
