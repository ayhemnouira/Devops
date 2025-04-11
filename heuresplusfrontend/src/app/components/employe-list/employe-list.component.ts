import { Component, OnInit } from '@angular/core';
import { Employe } from '../../models/employe';
import { EmployeService } from '../../services/employe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employe-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css'],
})
export class EmployeListComponent implements OnInit {
  employes: Employe[] = [];

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getEmployes().subscribe({
      next: (data) => {
        this.employes = data;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }
}
