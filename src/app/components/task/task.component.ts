import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
  @Input() tasks;
  @Output() markTodoAsCompleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() modifyTodo: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteTodo: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  completed = (id: string) => {
    this.markTodoAsCompleted.emit(id);
  }

  modify = (id: string) => {
    this.modifyTodo.emit(id);
  }

  delete = (id: string) => {
    this.deleteTodo.emit(id);
  }
}
