import { Component, Inject } from '@angular/core';
import { OrderServiceService } from '../order-service.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<OrderDetailComponent>,
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
