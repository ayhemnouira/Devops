import { Routes } from '@angular/router';
import { EmployeListComponent } from './components/employe-list/employe-list.component';
import { HeuresSupComponent } from './components/heures-sup/heures-sup.component';

export const routes: Routes = [
  { path: 'employes', component: EmployeListComponent },
  { path: 'heures-sup', component: HeuresSupComponent },
  { path: '', redirectTo: '/employes', pathMatch: 'full' },
  { path: '**', redirectTo: '/employes' }, // Route wildcard pour gérer 404
];
