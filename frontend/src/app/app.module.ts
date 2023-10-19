import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { AddShipmentComponent } from './components/add-shipment/add-shipment.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModifyCompanyComponent } from './components/modify-company/modify-company.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ShipmentsComponent,
    CompaniesComponent,
    AddShipmentComponent,
    AddCompanyComponent,
    NavbarComponent,
    ModifyCompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
