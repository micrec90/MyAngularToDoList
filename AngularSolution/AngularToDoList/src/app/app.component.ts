import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoItem } from './to-do-item';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { ToDoItemService } from '../services/to-do-item.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToDoItemComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'My Angular To Do List';
  filter: "all" | "active" | "done" = "all";
  toDoItems: ToDoItem[] = [
    { description: "wake up", done: true, dueDate: '' },
    { description: "eat", done: false, dueDate: '' },
    { description: "survive", done: false, dueDate: '' },
    { description: "sleep", done: false, dueDate: '' }
  ];

  model!: ToDoItem;
  private toDoItemGetSubscription?: Subscription;
  private toDoItemPostSubscription?: Subscription;
  constructor(private toDoItemService: ToDoItemService) {

  }
  ngOnDestroy(): void {
    this.toDoItemPostSubscription?.unsubscribe();
    this.toDoItemGetSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.toDoItemPostSubscription = this.toDoItemService.getToDoItems().subscribe(
      {
        next: (response) => {
          console.log(response);
          response.forEach(obj => {
            obj.dueDate = obj.dueDate.split('T')[0]
          })
          this.toDoItems = response;
        },
        error: (response) => {
          console.log(response);
        }
      }
    );
  }
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

    this.model = {
      description,
      done: false,
      dueDate: new Date().toISOString().split('T')[0]
    };

    this.toDoItems.unshift(this.model);
    this.toDoItemPostSubscription = this.toDoItemService.postToDoItem(this.model).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (response) => {
          console.log(response);
        }
      }
    );
  }
  remove(item: ToDoItem) {
    this.toDoItems.splice(this.toDoItems.indexOf(item), 1);
  }
}
