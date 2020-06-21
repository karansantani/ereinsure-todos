import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  // private _TODOS = new BehaviorSubject<ITask[]>([]);
  // readonly todos = this._TODOS.asObservable();

  constructor() {}

  // create = (freshTodo) => {

  // }

  // read = () => {
  //   return this.todos;
  // }

  // update = (id: number) => {

  // }

  // delete = (id: number) => {

  // }
}
