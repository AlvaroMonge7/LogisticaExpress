import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-modify-company',
  templateUrl: './modify-company.component.html',
  styleUrls: ['./modify-company.component.css'],
})
export class ModifyCompanyComponent implements OnInit {
  name: string = '';
  postal_code: string = '';

  constructor(
    private companyService: CompaniesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.router.navigateByUrl('/login');
    }else{
      let id_company = this.route.snapshot.params['id_company'];
      this.companyService.getCompany(id_company).subscribe((data) => {
        this.name = data[0].name;
        this.postal_code = data[0].postal_code;
      });
    }
  }

  validatePostalCodes() {
    var numbers = this.postal_code.trim().split(',');

    for (var i = 0; i < numbers.length; i++) {
      var number = numbers[i].trim();
      if (!/^\d{2}$/.test(number)) {
        alert('Introduce números de dos cifras separados por comas.');
        return false;
      }
    }
    return true;
  }

  modifyCompany(){
    if(this.validatePostalCodes()){
      const companyId = this.route.snapshot.params['id_company'];
      const newData = {
        name: this.name,
        postal_code: this.postal_code,
      };

      this.companyService.modifyCompany(companyId, newData).subscribe(
        (data:any)=>{
          if(data.success){
            this.router.navigateByUrl('/companies');
          }else{
            alert(data.message)
          }
        }
      );
    }
  }
  
}

