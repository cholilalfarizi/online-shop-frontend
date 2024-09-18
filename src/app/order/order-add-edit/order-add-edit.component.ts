import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderServiceService } from '../order-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrl: './order-add-edit.component.css',
})
export class OrderAddEditComponent {
  orderForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private orderService: OrderServiceService,
    private _dialogRef: DialogRef<OrderAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.orderForm = this._fb.group({
      orderCode: ['', Validators.required],
      quantity: ['', Validators.required],
      customerId: ['', Validators.required],
      itemId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.orderForm.patchValue({
        orderCode: this.data.orderCode,
        quantity: this.data.quantity,
        customerId: this.data.customers?.id,
        itemId: this.data.item?.id,
      });
    }
  }

  onFormSubmit() {
    if (this.orderForm.valid) {
      const orderData = {
        orderCode: this.orderForm.get('orderCode')?.value || '',
        quantity: this.orderForm.get('quantity')?.value || '',
        customerId: this.orderForm.get('customerId')?.value || '',
        itemId: this.orderForm.get('itemId')?.value || '',
      };

      if (this.data) {
        this.orderService.editOrder(this.data.id, orderData).subscribe({
          next: (val: any) => {
            alert('Order updated successfully');
            this._dialogRef.close();
          },
          error(err: any) {
            console.log(err);
          },
        });
      } else {
        this.orderService.addOrder(orderData).subscribe({
          next: (val: any) => {
            alert('Order added successfully');
            this._dialogRef.close();
          },
          error(err: any) {
            console.log(err);
          },
        });
      }
    }
  }
}
