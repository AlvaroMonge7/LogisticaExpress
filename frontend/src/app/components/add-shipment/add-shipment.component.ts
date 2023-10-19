import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentsService } from 'src/app/services/shipments.service';

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.css']
})
export class AddShipmentComponent{

  postal_code:any;
  addressee:any;
  sender:any;
  weigth:any;

  constructor(
    private shipmentsService:ShipmentsService,
    private router:Router
    ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.router.navigateByUrl('/login');
    }
  }

  save(){
    this.shipmentsService.addShipment(this.postal_code,this.addressee,this.sender,this.weigth).subscribe(
      (data)=>{
        
      }
    )
  }

}
