import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeuresSupService } from '../../services/heures-sup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heures-sup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './heures-sup.component.html',
  styleUrls: ['./heures-sup.component.css'],
})
export class HeuresSupComponent {
  employeId: number = 0;
  startDate: string = '';
  endDate: string = '';
  totalCost: number | null = null;
  errorMessage: string | null = null;

  constructor(private heuresSupService: HeuresSupService) {}

  calculate() {
    this.totalCost = null; // Reset cost before calculation
    this.errorMessage = null; // Reset error message
    if (this.employeId <= 0) {
      this.errorMessage = 'ID Employé invalide.';
      return;
    }

    this.heuresSupService
      .calculateOvertimeCost(this.employeId, this.startDate, this.endDate)
      .subscribe({
        next: (cost) => (this.totalCost = cost),
        error: (err) =>
          (this.errorMessage = 'Erreur lors du calcul. Veuillez réessayer.'),
      });
  }
}
