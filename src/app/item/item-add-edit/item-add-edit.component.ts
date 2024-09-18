import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemServiceService } from '../item-service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-add-edit',
  templateUrl: './item-add-edit.component.html',
  styleUrl: './item-add-edit.component.css',
})
export class ItemAddEditComponent {
  itemForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private itemServce: ItemServiceService,
    private _dialogRef: DialogRef<ItemAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this._fb.group({
      name: ['', Validators.required],
      stock: ['', Validators.required],
      code: ['', Validators.required],
      price: ['', Validators.required],
      isAvailable: [true],
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.itemForm.valid) {
      const itemData = {
        name: this.itemForm.get('name')?.value || '',
        stock: this.itemForm.get('stock')?.value || '',
        code: this.itemForm.get('code')?.value || '',
        price: this.itemForm.get('price')?.value || '',
        isAvailable: this.itemForm.get('isAvailable')?.value || true,
      };

      if (this.data) {
        this.itemServce.editItem(this.data.id, itemData).subscribe({
          next: (val: any) => {
            alert('Item updated successfully');
            this._dialogRef.close();
          },
          error(err: any) {
            console.log(err);
          },
        });
      } else {
        this.itemServce.addItem(itemData).subscribe({
          next: (val: any) => {
            alert('Item added successfully');
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
