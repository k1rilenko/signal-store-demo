import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStore } from './+state/todo.store';
import { TaskComponent } from './components/task/task.component';
import { FilterComponent } from './components/filter/filter.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

@Component({
  selector: 'lib-to-do',
  imports: [CommonModule, TaskComponent, FilterComponent, CreateTaskComponent],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class ToDoComponent {
  readonly store = inject(TodoStore);
}
