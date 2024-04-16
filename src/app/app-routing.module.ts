import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { BandValueUpdateComponent } from './band-value-update/band-value-update.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reports', component: ReportsComponent },
  // { path: 'reports/:reporId/:reportSectionId', component: ReportsComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'search', component: SearchComponent },
  { path: 'band-value', component: BandValueUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
