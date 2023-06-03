import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectInputDirective } from '../../directives/select-input.directive';

/* RXJS Modules */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* NGRX Modules¨*/
import { Store } from '@ngrx/store';
import * as TodoActions from '../../store/actions/todo.actions';

/* Angular Material Modules */
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    A11yModule,
    ReactiveFormsModule,
    SelectInputDirective,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: TodoItem;

  private destroyRef = inject(DestroyRef);

  editing = false;
  show = false;

  completed!: FormControl;
  inputTodo!: FormControl;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.completed = new FormControl(this.todo.completed);
    this.inputTodo = new FormControl(this.todo.text, Validators.required);

    this.completed.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
}
