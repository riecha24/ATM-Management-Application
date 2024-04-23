import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ATMService {
  private denominations: Map<number, number>;
  private transactionHistory: string[];

  private denominationsSubject: BehaviorSubject<Map<number, number>>;
  private transactionHistorySubject: BehaviorSubject<string[]>;

  constructor() {
    this.denominations = new Map<number, number>([
      [100, 10],
      [50, 10],
      [20, 10],
      [10, 10],
      [5, 10],
      [1, 10]
    ]);

    this.transactionHistory = [];

    this.denominationsSubject = new BehaviorSubject<Map<number, number>>(this.denominations);
    this.transactionHistorySubject = new BehaviorSubject<string[]>(this.transactionHistory);
  }

  getDenominations(): Observable<Map<number, number>> {
    return this.denominationsSubject.asObservable();
  }

  getTransactionHistory(): Observable<string[]> {
    return this.transactionHistorySubject.asObservable();
  }

  withdraw(amount: number): boolean {
    if (this.canWithdraw(amount)) {
      this.updateDenominations(amount);
      this.transactionHistory.push(`Dispensed $${amount}`);
      this.transactionHistorySubject.next(this.transactionHistory);
      return true;
    } else {
      this.transactionHistory.push(`Failed to dispense $${amount} - Insufficient Funds`);
      this.transactionHistorySubject.next(this.transactionHistory);
      return false;
    }
  }
  restock(denomination: number, quantity: number): void {
    if (this.denominations.has(denomination)) {
      this.denominations.set(denomination, quantity);
      this.denominationsSubject.next(this.denominations);
    } else {
      console.error(`Invalid denomination: ${denomination}`);
    }
  }

  private canWithdraw(amount: number): boolean {
    let remainingAmount = amount;
    for (const [denomination, count] of this.denominations) {
      const billsNeeded = Math.min(Math.floor(remainingAmount / denomination), count);
      remainingAmount -= billsNeeded * denomination;
    }
    return remainingAmount === 0;
  }

  private updateDenominations(amount: number): void {
    let remainingAmount = amount;
    for (const [denomination, count] of this.denominations) {
      const billsNeeded = Math.min(Math.floor(remainingAmount / denomination), count);
      remainingAmount -= billsNeeded * denomination;
      this.denominations.set(denomination, count - billsNeeded);
    }
    this.denominationsSubject.next(this.denominations);
  }
}
