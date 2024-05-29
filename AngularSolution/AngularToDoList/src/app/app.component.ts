import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, CommonModule]
})
export class AppComponent {
  title = 'My Angular To Do List';
  filter: "all" | "active" | "done" = "all";
  toDoItems = [
    { description: "wake up", done: true },
    { description: "eat", done: false },
    { description: "survive", done: false },
    { description: "sleep", done: false }
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
      done: false
    });
  }
}
