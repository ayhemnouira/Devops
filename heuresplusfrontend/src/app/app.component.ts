import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { HeuresSupComponent } from './components/heures-sup/heures-sup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'heures-plus-frontend';
}
