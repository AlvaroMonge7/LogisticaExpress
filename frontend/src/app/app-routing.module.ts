import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { LoginComponent } from './components/login/login.component';
import { AddShipmentComponent } from './components/add-shipment/add-shipment.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { ModifyCompanyComponent } from './components/modify-company/modify-company.component';

const routes: Routes = [
  { path: 'shipment', component: ShipmentsComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'addShipment', component: AddShipmentComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'modifyCompany/:id_company', component: ModifyCompanyComponent },
  { path: 'companies', component: CompaniesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
