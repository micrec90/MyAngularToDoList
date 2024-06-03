import { Injectable } from '@angular/core';
import { ToDoItem } from '../app/to-do-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {

  constructor(private http: HttpClient) { }

  getToDoItems(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(`https://localhost:7109/api/ToDoItems`);
  }

  postToDoItem(model: ToDoItem): Observable<void> {
    return this.http.post<void>(`https://localhost:7109/api/ToDoItems`, model);
  }
}
