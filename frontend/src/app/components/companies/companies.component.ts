import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies:any;

  constructor(
    private companiesService:CompaniesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.router.navigateByUrl('/login');
    }else{

      this.companiesService.companies().subscribe(
        data=>{
          this.companies=data;
          console.log(this.companies)
        }
      )
    }
  }

  deleteCompany(id_company:number){
    const index = this.companies.findIndex((obj: { id_company: any; }) => obj.id_company === id_company);
    if (index !== -1) {
      this.companies.splice(index, 1);
    }
    this.companiesService.deleteCompany(id_company).subscribe(
      data=>{

      }
    )
  }

  addCompany(){
    this.router.navigateByUrl('/addCompany');
  }

  modifyCompany(id_company:number){
    this.router.navigateByUrl(`/modifyCompany/${id_company}`);
  }

}
