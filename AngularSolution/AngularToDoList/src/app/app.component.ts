import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoItem } from '../models/to-do-item';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';
import { ToDoItemService } from '../services/to-do-item.service';
import { Subscription } from 'rxjs';
import { ToDoItemPost } from '../models/to-do-item-post';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToDoItemComponent, MatPaginatorModule]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'My Angular To Do List';
  filter: "all" | "active" | "done" = "all";
  toDoItems: ToDoItem[] = [];

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent?: PageEvent;

  model!: ToDoItemPost;
  private toDoItemGetSubscription?: Subscription;
  private toDoItemPostSubscription?: Subscription;
  private toDoItemDeleteSubscription?: Subscription;
  private toDoItemPatchSubscription?: Subscription;
  constructor(private toDoItemService: ToDoItemService) {

  }
  ngOnDestroy(): void {
    this.toDoItemPostSubscription?.unsubscribe();
    this.toDoItemGetSubscription?.unsubscribe();
    this.toDoItemDeleteSubscription?.unsubscribe();
    this.toDoItemPatchSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.initializeData();
    this.fetchData();
  }
  initializeData(): void {
    this.toDoItemPostSubscription = this.toDoItemService.getToDoItems().subscribe(
      {
        next: (response) => {
          console.log(response);
          response.forEach(obj => {
            obj.createdOn = obj.createdOn.split('T')[0];
            obj.dueDate = obj.dueDate.split('T')[0];
          })
          this.toDoItems = response;
          this.length = this.toDoItems.length;
        },
        error: (response) => {
          console.log(response);
        }
      }
    );
  }
  fetchData(): void {
    this.toDoItemPostSubscription = this.toDoItemService.getToDoItems(this.pageSize, this.pageIndex).subscribe(
      {
        next: (response) => {
          console.log(response);
          response.forEach(obj => {
            obj.createdOn = obj.createdOn.split('T')[0];
            obj.dueDate = obj.dueDate.split('T')[0];
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

    this.toDoItemPostSubscription = this.toDoItemService.postToDoItem(this.model).subscribe(
      {
        next: (response) => {
          console.log(response);
          response.createdOn = response.createdOn.split('T')[0];
          response.dueDate = response.dueDate.split('T')[0];
          this.toDoItems.unshift(response);
          this.length = this.toDoItems.length;
        },
        error: (response) => {
          console.log(response);
          this.toDoItems.unshift({
            id: this.toDoItems.length,
            description: this.model.description,
            done: this.model.done,
            createdOn: new Date().toISOString().split('T')[0],
            dueDate: this.model.dueDate,
          });
        }
      }
    );
  }
  edit(item: ToDoItem) {
    this.toDoItemPatchSubscription = this.toDoItemService.patchToDoItem(item, item.id).subscribe(
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
    this.toDoItemPostSubscription = this.toDoItemService.deleteToDoItem(item.id).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (response) => {
          console.log(response);
        }
      }
    );
    this.toDoItems.splice(this.toDoItems.indexOf(item), 1);
    this.length = this.toDoItems.length;
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.fetchData();
  }
}
