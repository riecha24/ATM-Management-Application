import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  cards = [
    { title: 'withdraw', subtitle: 1 ,content:'withdraw'},
  { title: 'restock', subtitle: 2,content:'restock' },
  { title: 'overview', subtitle: 3,content:'overview' }
  ]
  
  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
