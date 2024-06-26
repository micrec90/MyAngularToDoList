import { Component, Input, Output, EventEmitter} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToDoItem } from "../../models/to-do-item";

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do-item.component.html',
  styleUrl: './to-do-item.component.css'
})
export class ToDoItemComponent {
  editable = false;

  @Input() item!: ToDoItem;
  @Output() edit = new EventEmitter<ToDoItem>();
  @Output() remove = new EventEmitter<ToDoItem>();

  saveItem(description: string, date: string) {
    if (!description) return;

    this.editable = false;
    this.item.description = description;
    this.item.dueDate = date;
  }
}
