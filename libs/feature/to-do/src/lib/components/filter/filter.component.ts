import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/task.model';
import { TodoStore } from '../../+state/todo.store';

@Component({
  selector: 'lib-filter',
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  todoStore = inject(TodoStore);

  changeOrder(order: Order): void {
    this.todoStore.updateOrder(order);
  }
}
