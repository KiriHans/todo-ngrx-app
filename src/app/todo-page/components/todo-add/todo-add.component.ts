import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatCheckboxModule } from '@angular/material/checkbox';

import * as TodoActions from '../../store/actions/todo.actions';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent {
  todoAdd: FormControl;
  toggleAll = false;

  constructor(private store: Store) {
    this.todoAdd = new FormControl('', Validators.required);
  }

  add(): void {
    if (this.todoAdd.invalid) return;
    this.store.dispatch(TodoActions.createTodo({ text: this.todoAdd.value }));
    this.todoAdd.reset();
  }

  toggleAllTodos(event: Event): void {
    event.stopPropagation();
    this.toggleAll = !this.toggleAll;
    this.store.dispatch(TodoActions.toggleAllTodos({ completed: this.toggleAll }));
  }
}
