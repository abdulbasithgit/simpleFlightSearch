import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFlightComponent } from './search-flight/search-flight.component';

const routes: Routes = [
  {
    path: 'searchFlight',
    component: SearchFlightComponent
  },
  {
    path: '',
    redirectTo: '/searchFlight',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
