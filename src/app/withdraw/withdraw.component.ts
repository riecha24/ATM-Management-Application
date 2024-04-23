import { Component } from '@angular/core';
import { ATMService } from '../shared/services/atm.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  withdrawAmount!: number;
  withdrawalMessage!: string;

  constructor(private atmService: ATMService) {}

  withdraw(): void {
    if (!this.withdrawAmount || this.withdrawAmount <= 0) {
      this.withdrawalMessage = 'Please enter a valid amount.';
      return;
    }

    const success = this.atmService.withdraw(this.withdrawAmount);
    this.withdrawalMessage = success ? `Dispensed $${this.withdrawAmount}` : 'Insufficient Funds';
  }
}
