import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoStore } from '../../+state/todo.store';

type CreateTask = Omit<Task, 'order' | 'id'>;

@Component({
  selector: 'lib-create-task',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent {
  store = inject(TodoStore);
  formBuilder = inject(NonNullableFormBuilder);

  form: ReturnType<typeof this.getForm>;
  constructor() {
    this.form = this.getForm();
  }

  getForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      owner: [''],
      priority: [null],
    });
  }

  submit() {
    const formValue = this.form.getRawValue();
    const data: CreateTask = {
      ...formValue,
      priority: Number(formValue.priority),
    };
    console.log(data);
    this.store.addTask(data);
  }
}
