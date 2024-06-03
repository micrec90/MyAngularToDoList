import { Injectable } from '@angular/core';
import { ToDoItem } from '../models/to-do-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToDoItemPost } from '../models/to-do-item-post';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {

  constructor(private http: HttpClient) { }

  getToDoItems(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(`https://localhost:7109/api/ToDoItems`);
  }
  postToDoItem(model: ToDoItemPost): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(`https://localhost:7109/api/ToDoItems`, model);
  }
  patchToDoItem(model: ToDoItemPost, index: number): Observable<ToDoItem> {
    return this.http.patch<ToDoItem>(`https://localhost:7109/api/ToDoItems/` + index, model);
  }
  deleteToDoItem(index: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7109/api/ToDoItems/` + index);
  }
}
