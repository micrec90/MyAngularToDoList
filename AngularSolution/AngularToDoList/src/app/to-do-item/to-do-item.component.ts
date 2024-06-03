import { Component, Input, Output, EventEmitter, output, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToDoItem } from "../../models/to-do-item";
import { ToDoItemService } from "../../services/to-do-item.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent implements OnDestroy {
  private toDoItemPatchSubscription?: Subscription;
  constructor(private toDoItemService: ToDoItemService) {

  }
  ngOnDestroy(): void {
    this.toDoItemPatchSubscription?.unsubscribe();
  }
  editable = false;

  @Input() item!: ToDoItem;
  @Output() remove = new EventEmitter<ToDoItem>();

  saveItem(description: string, date: string) {
    if (!description) return;

    this.editable = false;
    this.item.description = description;
    this.item.dueDate = date;

    this.toDoItemPatchSubscription = this.toDoItemService.patchToDoItem(this.item, this.item.id).subscribe(
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
}
