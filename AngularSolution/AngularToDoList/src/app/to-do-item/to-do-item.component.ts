import { Component, Input, Output, EventEmitter, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToDoItem } from "../to-do-item";

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
  @Output() remove = new EventEmitter<ToDoItem>();

  saveItem(description: string) {
    if (!description) return;

    this.editable = false;
    this.item.description = description;
  }

}
