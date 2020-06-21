import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { ITask } from './models/task.model';
import { NotificationService } from './services/notification.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todos';
  todos: ITask[] = [];
  completedTodos: ITask[] = [];
  userInput: string = null;
  selectedTodoId: string = null;

  constructor(
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    if (this.localStorageService.checkPropertyExistence('tasks') && this.localStorageService.get('tasks') !== 0) {
      this.todos = this.localStorageService.get('tasks');
    }
    if (this.localStorageService.checkPropertyExistence('completed') && this.localStorageService.get('completed') !== 0) {
      this.completedTodos = this.localStorageService.get('completed');
    }
  }

  newTodo = (value: string) => {
    this.userInput = value;
  }

  checkForRedundancy = () => {
    let isRedundant = false;
    this.todos.find(e => {
      if (e.text === this.userInput) {
        isRedundant = true;
      } else {
        isRedundant = false;
      }
    });
    return isRedundant;
  }

  createTodo = () => {
    if (this.selectedTodoId !== null) {
      this.todos.find(e => {
        if (e.id === this.selectedTodoId) {
          e.text = this.userInput;
          return;
        }
      });
      // this.todos.push({ id: this.selectedTodoId, createdDate: new Date(), text: this.userInput });
      this.localStorageService.set('tasks', Object.assign([], this.todos));
      this.notificationService.showSuccess('Todo created successfully!', 'Success');
      this.selectedTodoId = null;
      this.userInput = null;
    } else {
      let exists = false;
      if (this.todos.length > 0) {
        exists = this.checkForRedundancy();
        if (exists) {
          this.notificationService.showError( 'Todo exists already. Cannot create Todo', 'Error');
        } else {
          this.todos.push({ id: uuidv4(), createdDate: new Date(), text: this.userInput });
          this.localStorageService.set('tasks', Object.assign([], this.todos));
          this.notificationService.showSuccess('Todo created successfully!', 'Success');
        }
      } else {
        this.todos.push({ id: uuidv4(), createdDate: new Date(), text: this.userInput });
        this.localStorageService.set('tasks', Object.assign([], this.todos));
        this.notificationService.showSuccess('Todo created successfully!', 'Success');
      }
    }
  }

  markAsCompleted = ($event) => {
    this.selectedTodoId = $event;
    this.todos.find(e => {
      if (e.id === this.selectedTodoId) {
        this.todos.pop();
        this.completedTodos.push(e);
        this.localStorageService.set('completed', Object.assign([], this.completedTodos));
      }
    });
    this.selectedTodoId = null;
  }

  modifyTodo = ($event) => {
    this.selectedTodoId = $event;
    this.todos.find(e => {
      if ( e.id === this.selectedTodoId) {
        this.userInput = e.text;
      }
    });
    // this.selectedTodoId = null;
  }

  deleteTodo = ($event) => {
    this.selectedTodoId = $event;
    this.todos.find(e => {
      if (e.id === this.selectedTodoId) {
        this.todos.pop();
        return;
      }
    });
    this.updateLocalStorageForChanges();
    this.notificationService.showSuccess('Todo deleted successfully!', 'Success');
    this.selectedTodoId = null;
  }

  deleteCompletedTodo = ($event) => {
    this.selectedTodoId = $event;
    this.completedTodos.find(e => {
      if (e.id === this.selectedTodoId) {
        this.completedTodos.pop();
        return;
      }
    });
    this.localStorageService.set('completed', Object.assign([], this.completedTodos));
    this.notificationService.showSuccess('Todo deleted successfully!', 'Success');
    // this.selectedTodoId = null;
  }

  updateLocalStorageForChanges = () => {
    this.localStorageService.set('tasks', Object.assign([], this.todos));
  }
}
