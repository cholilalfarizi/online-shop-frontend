import { Component, Inject } from '@angular/core';
import { OrderServiceService } from '../order-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent {
  data: any;
  constructor(
    private orderService: OrderServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ngOnInit(): void {
    console.log('ID received in dialog:', this.id);
    this.detailOrder(this.id);
  }

  detailOrder(id: number) {
    this.orderService.detailOrder(id).subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: console.log,
    });
  }
}
