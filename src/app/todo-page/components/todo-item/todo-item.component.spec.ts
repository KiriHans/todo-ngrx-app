import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

import { TodoItemComponent } from './todo-item.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppState } from 'src/app/app.reducer';
import { TodoItem } from '../../models/todo-item.model';
import { A11yModule } from '@angular/cdk/a11y';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectInputDirective } from '../../directives/select-input.directive';
import { Action } from '@ngrx/store';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let el: DebugElement;
  let store: MockStore<AppState>;

  let compiled: HTMLElement;

  let harnessLoader: HarnessLoader;

  let dispatchSpy: jest.SpyInstance<void, [action: Action], unknown>;

  const todoItemTest = new TodoItem('test');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TodoItemComponent,
        NoopAnimationsModule,
        A11yModule,
        ReactiveFormsModule,
        SelectInputDirective,
      ],
      providers: [provideMockStore()],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    compiled = fixture.nativeElement;

    harnessLoader = TestbedHarnessEnvironment.loader(fixture);

    component.todo = todoItemTest;
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should render a li element', () => {
    const li = el.query(By.css('li'));

    expect(li).toBeTruthy();
  });

  it('should render an element with "view" class containing a checkbox and a label', () => {
    const viewElement = el.query(By.css('.view'));

    expect(viewElement).toBeTruthy();

    const checkbox = viewElement.query(By.css('mat-checkbox'));
    const label = viewElement.query(By.css('label[for="edit"]'));

    expect(checkbox).toBeTruthy();

    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe(todoItemTest.text);
  });

  it('should render an input element with "edit" class', () => {
    const input = el.query(By.css('input.edit'));

    expect(input).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.completed).toBeInstanceOf(FormControl);
    expect(component.inputTodo).toBeInstanceOf(FormControl);
  });

  it('should dispatch an action when checkbox is pressed', async () => {
    const checkbox = await harnessLoader.getHarness(MatCheckboxHarness);

    expect(dispatchSpy).not.toHaveBeenCalled();

    await checkbox.check();

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should change class of li element to "editing" when label is double-clicked', () => {
    const editTodoSpy = jest.spyOn(component, 'editTodo');
    let editing = el.query(By.css('.editing'));
    const label = el.query(By.css('label[for="edit"]'));

    expect(editing).toBeFalsy();

    label.triggerEventHandler('dblclick');

    fixture.detectChanges();

    editing = el.query(By.css('.editing'));

    expect(editTodoSpy).toHaveBeenCalled();
    expect(editing).toBeTruthy();
  });

  it('should reset Form Control inputTodo if input value is empty and to not dispatch any action', () => {
    const stopEditSpy = jest.spyOn(component, 'stopEdit');

    const label = el.query(By.css('label[for="edit"]'));
    const input = el.query(By.css('input.edit'));

    label.triggerEventHandler('dblclick');

    component.inputTodo.setValue('');

    fixture.detectChanges();

    input.triggerEventHandler('blur');

    fixture.detectChanges();
    expect(stopEditSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();

    label.triggerEventHandler('dblclick');

    expect(component.inputTodo.value).toBe(todoItemTest.text);
  });

  it("should not dispatch any action if input value hasn't changed", () => {
    const stopEditSpy = jest.spyOn(component, 'stopEdit');

    const label = el.query(By.css('label[for="edit"]'));
    const input = el.query(By.css('input.edit'));

    label.triggerEventHandler('dblclick');

    fixture.detectChanges();

    input.triggerEventHandler('blur');

    expect(stopEditSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch an action when input value changes', () => {
    const stopEditSpy = jest.spyOn(component, 'stopEdit');

    const label = el.query(By.css('label[for="edit"]'));
    const input = el.query(By.css('input.edit'));

    label.triggerEventHandler('dblclick');
    component.inputTodo.setValue('new Value');

    fixture.detectChanges();

    input.triggerEventHandler('blur');

    expect(stopEditSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should trigger stopEdit function when Enter Key is pressed with a correct value', () => {
    const stopEditSpy = jest.spyOn(component, 'stopEdit');

    const label = el.query(By.css('label[for="edit"]'));
    const input = el.query(By.css('input.edit'));

    label.triggerEventHandler('dblclick');
    component.inputTodo.setValue('new Value');

    fixture.detectChanges();

    input.triggerEventHandler('keyup.enter');

    expect(stopEditSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should change Form Control value if checkbox is pressed', async () => {
    expect(component.completed.value).toBe(false);

    const checkbox = await harnessLoader.getHarness(MatCheckboxHarness);

    await checkbox.check();

    expect(component.completed.value).toBe(true);
  });

  it('should dispatch an action if "destroy" button is pressed', async () => {
    const deleteTodoSpy = jest.spyOn(component, 'deleteTodo');
    const button = await harnessLoader.getHarness(MatButtonHarness.with({ selector: '.destroy' }));

    await button.click();

    expect(deleteTodoSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
