import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent implements OnInit {
  name: string = '';
  postal_code: string = '';

  constructor(
    private compnanyService: CompaniesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.router.navigateByUrl('/login');
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

  addCompany() {
    if (this.validatePostalCodes()) {
      this.compnanyService
        .addCompany(this.name, this.postal_code)
        .subscribe((data: any) => {
          if (data.success) {
            this.router.navigateByUrl('/companies');
          } else {
            alert(data.message);
          }
        });
    }
  }
}
