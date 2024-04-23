import { Component } from '@angular/core';
import { ATMService } from '../shared/services/atm.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  denominations!: Map<number, number>;
  transactionHistory!: string[];

  constructor(private atmService: ATMService) {
    this.atmService.getDenominations().subscribe(denominations => {
      this.denominations = denominations;
    });
    this.atmService.getTransactionHistory().subscribe(history => {
      this.transactionHistory = history;
    });
  }
}
