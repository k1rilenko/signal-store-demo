import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToDoComponent } from '@my-test-app/to-do';

@Component({
  imports: [RouterModule, ToDoComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-test-app';
}
