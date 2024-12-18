import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TodoStore } from '../../+state/todo.store';

@Component({
  selector: 'lib-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  readonly todoStore = inject(TodoStore);
  task = input.required<Task>();

  deleteTask() {
    this.todoStore.deleteTask(this.task().id);
  }
}
