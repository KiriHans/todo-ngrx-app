import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectInputDirective } from '../../directives/select-input.directive';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TodoActions from '../../store/actions/todo.actions';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    ReactiveFormsModule,
    SelectInputDirective,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit, OnDestroy {
  @Input() todo!: TodoItem;

  editing = false;
  show = false;

  completed!: FormControl;
  inputTodo!: FormControl;

  destroyed$ = new Subject<null>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.completed = new FormControl(this.todo.completed);
    this.inputTodo = new FormControl(this.todo.text, Validators.required);

    this.completed.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe({
      next: () => {
        this.store.dispatch(TodoActions.toggleTodo({ id: this.todo.id }));
      },
    });
  }

  editTodo(): void {
    this.editing = true;
    this.show = true;

    this.inputTodo.setValue(this.todo.text);
  }

  stopEdit(): void {
    this.editing = false;
    this.show = false;

    if (this.inputTodo.invalid || this.inputTodo.value === this.todo.text) return;

    this.store.dispatch(TodoActions.editTodo({ id: this.todo.id, newText: this.inputTodo.value }));
  }

  deleteTodo(): void {
    this.store.dispatch(TodoActions.deleteTodo({ id: this.todo.id }));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
