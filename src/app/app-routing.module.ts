import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { RestockComponent } from './restock/restock.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const routes: Routes = [{
  path: '',
  component:NavBarComponent,
  children:[ { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to 'home' component when path is empty
  { path: 'home', component: HomeComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'restock', component: RestockComponent },
  { path: 'overview', component: OverviewComponent }]
}
 
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
