import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader, TestKey } from '@angular/cdk/testing';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';

import { TodoAddComponent } from './todo-add.component';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from 'src/app/app.reducer';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { By } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import { CommonModule } from '@angular/common';

describe('TodoAddComponent', () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;
  let el: DebugElement;
  let compiled: HTMLElement;

  let store: MockStore<AppState>;

  let harnessLoader: HarnessLoader;

  let dispatchSpy: jest.SpyInstance<void, [action: Action], unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, TodoAddComponent, NoopAnimationsModule, ReactiveFormsModule],
      providers: [provideMockStore()],
    });
    fixture = TestBed.createComponent(TodoAddComponent);

    component = fixture.componentInstance;
    el = fixture.debugElement;
    compiled = fixture.nativeElement;

    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  beforeEach(() => {
    dispatchSpy = jest.spyOn(store, 'dispatch');

    harnessLoader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should render a form field with the class "field-add-todo"', () => {
    const fieldAdd = el.query(By.css('.field-add-todo'));

    expect(fieldAdd).toBeTruthy;
  });

  it("should render an input with it's respective prefix and suffix buttons", () => {
    const toggleAllButton = el.query(By.css('button[matIconPrefix]'));
    const toggleAllButtonText = (toggleAllButton.nativeElement as HTMLButtonElement).textContent;

    const inputTodo = el.query(By.css('input.input-create'));
    const inputPlaceholder = (inputTodo.nativeElement as HTMLInputElement).placeholder;

    const AddButton = el.query(By.css('button[matIconSuffix]'));
    const AddButtonText = (AddButton.nativeElement as HTMLButtonElement).textContent;

    expect(toggleAllButton).toBeTruthy();
    expect(toggleAllButtonText).toContain('toggle_off');

    expect(inputTodo).toBeTruthy();
    expect(inputPlaceholder).toBe('What do you want to do?');

    expect(AddButton).toBeTruthy();
    expect(AddButtonText).toContain('add_outline');
  });

  it('should initialize respective form control', () => {
    expect(component.todoAdd).toBeInstanceOf(FormControl);
  });

  it('should toggle all todo items when toggle all button is pressed', async () => {
    const toggleAllButton = await harnessLoader.getHarness(
      MatButtonHarness.with({ selector: 'button[matIconPrefix]' })
    );

    expect(component.toggleAll).toBeFalsy();

    await toggleAllButton.click();

    expect(component.toggleAll).toBeTruthy();
  });

  it('should dispatch the respective action when pressed enter while input is in focus', async () => {
    const addSpy = jest.spyOn(component, 'add');

    component.todoAdd.setValue('test');

    const inputTodo = await harnessLoader.getHarness(
      MatInputHarness.with({ selector: 'input.input-create' })
    );

    await (await inputTodo.host()).sendKeys(TestKey.ENTER);

    expect(addSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(component.todoAdd.value).toBeNull();
  });

  it('should not dispatch the respective action when input is invalid', async () => {
    const addSpy = jest.spyOn(component, 'add');

    const inputTodo = await harnessLoader.getHarness(
      MatInputHarness.with({ selector: 'input.input-create' })
    );

    await (await inputTodo.host()).sendKeys(TestKey.ENTER);

    expect(addSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch the respective action when add button is pressed', async () => {
    const addSpy = jest.spyOn(component, 'add');

    component.todoAdd.setValue('test');

    const addTodoButton = await harnessLoader.getHarness(
      MatButtonHarness.with({ selector: 'button[matIconSuffix]' })
    );

    await addTodoButton.click();

    expect(addSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should change add button image when pressed', async () => {
    let toggleAllIcon = el.query(By.css('.toggle-icon'));
    const toggleButton = el.query(By.css('button[matIconPrefix]'));

    expect(toggleAllIcon.nativeElement.textContent.trim()).toBe('toggle_off');

    toggleButton.nativeElement.click();

    fixture.detectChanges();

    toggleAllIcon = el.query(By.css('.toggle-icon'));

    expect(toggleAllIcon.nativeElement.textContent.trim()).toBe('toggle_on');
  });
});
