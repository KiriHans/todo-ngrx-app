import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, TodoAddComponent, TodoListComponent],
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent {}
