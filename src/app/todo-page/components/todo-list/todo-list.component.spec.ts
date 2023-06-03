import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { TodoItem } from '../../models/todo-item.model';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let el: DebugElement;
  let store: MockStore<AppState>;

  const initialState: AppState = {
    todos: [new TodoItem('test todo 1'), new TodoItem('test todo 2'), new TodoItem('test todo 2')],
    filter: 'all',
  };

  let compiled: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoListComponent, NoopAnimationsModule],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    compiled = fixture.nativeElement;
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should render the ul element with the "list" class', () => {
    const ul = el.query(By.css('ul.list'));

    expect(ul).toBeTruthy();
  });

  it("should contain 3 app-todo-item elements with it's corresponding", () => {
    const todoItemArray = el
      .queryAll(By.css('app-todo-item'))
      .map((todoItem): HTMLElement => todoItem.nativeElement);

    expect(todoItemArray).toHaveLength(initialState.todos.length);
    todoItemArray.forEach((todoItem, index) => {
      expect(todoItem.textContent?.trim()).toContain(initialState.todos[index].text);
    });
  });

  it('should filter the list correctly when currentFilter changes', () => {
    let todoItemArray = el.queryAll(By.css('app-todo-item'));
    const newTodoArray = initialState.todos.map((todo, index) => {
      if (index === 0) return { ...todo, completed: !todo.completed };
      return todo;
    });

    expect(todoItemArray).toHaveLength(initialState.todos.length);

    store.setState({ todos: newTodoArray, filter: 'completed' });
    store.refreshState();

    fixture.detectChanges();

    todoItemArray = el.queryAll(By.css('app-todo-item'));
    expect(todoItemArray).toHaveLength(1);

    store.setState({ todos: newTodoArray, filter: 'pending' });
    store.refreshState();

    fixture.detectChanges();

    todoItemArray = el.queryAll(By.css('app-todo-item'));
    expect(todoItemArray).toHaveLength(2);
  });
});
