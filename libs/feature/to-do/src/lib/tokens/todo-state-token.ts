import { InjectionToken } from '@angular/core';
import { TodoState } from '../models/task.model';
import { initialState } from '../+state/todo.store';

export const TODO_STATE = new InjectionToken<TodoState>('TodoState', {
  factory: () => initialState,
});
