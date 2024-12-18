import { Order, Task, TodoState } from '../models/task.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';

export const initialState: TodoState = {
  tasks: [
    {
      id: 1,
      title: 'First Task',
      description: 'First Task Description',
      order: 0,
      owner: 'r.kirilenko',
      priority: 0,
    },
    {
      id: 2,
      title: 'Second Task',
      description: 'Second Task Description',
      order: 0,
      owner: 'r.kirilenko',
      priority: 0,
    },
  ],
  isLoading: false,
  filter: { order: 'asc', query: '' },
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ tasks, filter }) => ({
    tasksCount: computed(() => tasks().length),
    sortedTasks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return tasks()
        .slice()
        .sort((a, b) => direction * a.title.localeCompare(b.title));
    }),
  })),
  withMethods((store) => ({
    updateOrder(order: Order): void {
      patchState(store, (state) => ({
        filter: { ...state.filter, order },
      }));
    },
    deleteTask(taskId: Task['id']): void {
      patchState(store, (state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    },
    addTask(task: Task): void {
      patchState(store, (state) => ({
        tasks: [...state.tasks, task],
      }));
    },
  }))
);
