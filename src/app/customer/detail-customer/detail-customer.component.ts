import { Component, Inject, OnInit } from '@angular/core';
import { CustomerListService } from '../customer-list/customer-list.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrl: './detail-customer.component.css',
})
export class DetailCustomerComponent {
  data: any;
  constructor(
    private customerListService: CustomerListService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ngOnInit(): void {
    console.log('ID received in dialog:', this.id);
    this.detailCustomer(this.id);
  }

  detailCustomer(id: number) {
    this.customerListService.detailCustomer(id).subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: console.log,
    });
  }
}
