import { CreateTask, Order, Task, TodoState } from '../models/task.model';
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
    addTask(task: CreateTask): void {
      patchState(store, (state) => {
        const lastEl = state.tasks[state.tasks.length - 1];
        const _task: Task = {
          ...task,
          id: lastEl.id + 1,
          order: lastEl.order + 1,
        };
        if (!task.owner) {
          _task.owner = 'r.kirilenko';
        }
        if (!task.priority) {
          _task.priority = 1;
        }
        return { tasks: [...state.tasks, _task] };
      });
    },
  })),
  withComputed((store) => ({
    tasksCount: computed(() => store.tasks().length),
    sortedTasks: computed(() => {
      const direction = store.filter.order() === 'asc' ? 1 : -1;

      return store
        .tasks()
        .slice()
        .sort((a, b) => direction * a.title.localeCompare(b.title));
    }),
    selectedOrder: computed(() => store.filter.order()),
  }))
);
