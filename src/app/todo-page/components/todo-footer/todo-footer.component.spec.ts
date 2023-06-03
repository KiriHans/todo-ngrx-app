import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFooterComponent } from './todo-footer.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TodoItem } from '../../models/todo-item.model';
import { AppState } from 'src/app/app.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

import { MatButtonHarness } from '@angular/material/button/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('TodoFooterComponent', () => {
  let component: TodoFooterComponent;
  let fixture: ComponentFixture<TodoFooterComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  let titleCasePipe: TitleCasePipe;
  const initialState: AppState = {
    todos: [new TodoItem('test todo')],
    filter: 'all',
  };
  let store: MockStore<AppState>;

  let harnessLoader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoFooterComponent, NoopAnimationsModule, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFooterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    compiled = fixture.nativeElement;

    titleCasePipe = new TitleCasePipe();
    store = TestBed.inject(MockStore<AppState>);

    harnessLoader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should render a span with a todo-count class', () => {
    const todoCountSpan = el.query(By.css('.todo-count'));
    const count = todoCountSpan.query(By.css('strong')).nativeElement.innerHTML;
    const contentSpan = todoCountSpan.nativeElement.innerHTML;

    expect(todoCountSpan).toBeTruthy();
    expect(count).toBe('1');
    expect(contentSpan).toContain('items left');
  });

  it('should render a list with the corresponding filters', () => {
    const filterList = component.filterList;

    const filterListElement = el.query(By.css('ul.filters'));
    const filterListItems: string[] = filterListElement
      .queryAll(By.css('li'))
      .map((item) => item.nativeElement.textContent);

    expect(filterListElement).toBeTruthy();
    expect(filterListItems).toHaveLength(filterList.length);

    filterListItems.forEach((item, index) => {
      expect(item.trim()).toBe(titleCasePipe.transform(filterList[index]));
    });
  });

  it('should render a button with the text "Clear completed"', () => {
    const button = el.query(By.css('button.clear-completed'));

    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe('Clear completed');
  });

  it('should initialize respective signals on OnInit', () => {
    expect(component.currentFilter()).toBe(initialState.filter);
    expect(component.itemsLeftList()).toStrictEqual(initialState.todos);
  });

  it("should change filters when it's respective filter anchor is pressed", async () => {
    const changeFilterSpy = jest.spyOn(component, 'changeFilter');
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');

    const filterList = component.filterList;
    const filterAnchors = await harnessLoader.getAllHarnesses(
      MatButtonHarness.with({ selector: 'a' })
    );

    expect(filterAnchors).toBeTruthy();
    expect(filterAnchors).toHaveLength(filterList.length);

    const [firstFilter, secondFilter, thirdFilter] = filterAnchors;

    await firstFilter.click();

    expect(changeFilterSpy).not.toHaveBeenCalled();

    await secondFilter.click();

    expect(changeFilterSpy).toHaveBeenCalledTimes(1);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(1);

    await thirdFilter.click();

    expect(changeFilterSpy).toHaveBeenCalledTimes(2);
    expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
  });

  it('should clear completed todo elements when "clear completed" button is pressed', async () => {
    const clearCompletedTodosSpy = jest.spyOn(component, 'clearCompletedTodos');
    const storeDispatchSpy = jest.spyOn(store, 'dispatch');

    const cleanCompletedTodosButton = await harnessLoader.getHarness(
      MatButtonHarness.with({ selector: '.clear-completed' })
    );

    await cleanCompletedTodosButton.click();

    expect(clearCompletedTodosSpy).toHaveBeenCalled();
    expect(storeDispatchSpy).toHaveBeenCalled();
  });

  it('should show the correct number of items left in the store', () => {
    const testTodoItems: TodoItem[] = [
      new TodoItem('Item 1'),
      new TodoItem('Item 2'),
      new TodoItem('Item 3'),
    ];
    store.setState({ todos: testTodoItems, filter: 'all' });
    store.refreshState();
    fixture.detectChanges();

    const todoCountSpan = el.query(By.css('.todo-count'));
    const count = todoCountSpan.query(By.css('strong')).nativeElement.innerHTML;

    expect(count).toBe(`${testTodoItems.length}`);
  });
});
