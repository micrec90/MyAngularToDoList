import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoItem } from './to-do-item';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToDoItemComponent]
})
export class AppComponent {
  title = 'My Angular To Do List';
  filter: "all" | "active" | "done" = "all";
  toDoItems: ToDoItem[] = [
    { description: "wake up", done: true, dueDate: '' },
    { description: "eat", done: false, dueDate: '' },
    { description: "survive", done: false, dueDate: '' },
    { description: "sleep", done: false, dueDate: '' }
  ];
  get items() {
    if (this.filter === "all") {
      return this.toDoItems;
    }
    return this.toDoItems.filter((item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }
  addItem(description: string) {
    if (!description) return;

    this.toDoItems.unshift({
      description,
      done: false,
      dueDate: ''
    });
  }
  remove(item: ToDoItem) {
    this.toDoItems.splice(this.toDoItems.indexOf(item), 1);
  }
}
