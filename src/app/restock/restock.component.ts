import { Component } from '@angular/core';
import { ATMService } from '../shared/services/atm.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrl: './restock.component.scss'
})
export class RestockComponent {
  denominations!: Map<number, number>;

  constructor(private atmService: ATMService) {
    this.atmService.getDenominations().subscribe(denominations => {
      this.denominations = denominations;
    });
  }

  restock(denomination: number, quantity: number): void {
    this.atmService.restock(denomination, quantity);
  }
}
