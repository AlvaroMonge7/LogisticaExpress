import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentsService } from 'src/app/services/shipments.service';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css'],
})
export class ShipmentsComponent implements OnInit {
  shipments: any;
  precio: number | undefined;

  constructor(
    private shipmentsService: ShipmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.router.navigateByUrl('/login');
    } else {
      this.shipmentsService.shipments().subscribe((data) => {
        this.shipments = data;
        this.calculatePrices();
        this.calculateTransportCompany();
      });
    }
  }

  calculatePrices() {
    this.shipments.forEach((item: any) => {
      const peso = item.weight;
      if (peso >= 0 && peso <= 0.1) {
        this.precio = peso * 5;
      } else if (peso > 0.1 && peso <= 0.3) {
        this.precio = peso * 5 + 1;
      } else if (peso > 0.3 && peso <= 5) {
        this.precio = peso * 10;
      } else if (peso > 5 && peso <= 10) {
        this.precio = peso * 5 + peso + 75;
      } else {
        this.precio = (peso - 10) * 7.5 + 130 + peso;
      }
      item.precio = this.precio; // Agrega el precio calculado a la propiedad del objeto
    });
  }

  calculateTransportCompany() {
    this.shipments.forEach((item: any) => {
      const postalCode = item.postal_code.toString();

      if (postalCode.length >= 2) {
        const dosPrimerosDigitos = parseInt(postalCode.substring(0, 2), 10);

        this.shipmentsService.getCompanyByPostalCode(dosPrimerosDigitos).subscribe(
          data=>{
            item.carrier=data.company
          }
        )
      }
    });
  }

  deleteShipment(id_shipment: number) {
    const index = this.shipments.findIndex(
      (obj: { id_shipment: any }) => obj.id_shipment === id_shipment
    );
    if (index !== -1) {
      this.shipments.splice(index, 1);
    }
    this.shipmentsService.deleteShipment(id_shipment).subscribe((data) => {});
  }

  addShipment() {
    this.router.navigateByUrl('/addShipment');
  }
}
