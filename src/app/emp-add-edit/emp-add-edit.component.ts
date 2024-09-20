import { Component, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerListService } from '../customer/customer-list/customer-list.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  // standalone: true,
  // imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css',
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  selectedFile: File | null = null;
  phoneRegex: RegExp = /^(\\+62|62|0)8[1-9][0-9]{6,10}$/;

  constructor(
    private _fb: FormBuilder,
    private _customerServce: CustomerListService,
    private _dialogRef: DialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        const formData = new FormData();

        const customerData = {
          name: this.empForm.get('name')?.value || '',
          address: this.empForm.get('address')?.value || '',
          phone: this.empForm.get('phone')?.value || '',
        };
        formData.append(
          'request',
          new Blob([JSON.stringify(customerData)], { type: 'application/json' })
        );

        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }

        this._customerServce.editCustomer(this.data.id, formData).subscribe({
          next: (val: any) => {
            alert('customer updated successfully');
            this._dialogRef.close();
          },
          error(err: any) {
            console.log(err);
          },
        });
      } else {
        const formData = new FormData();

        const customerData = {
          name: this.empForm.get('name')?.value || '',
          address: this.empForm.get('address')?.value || '',
          phone: this.empForm.get('phone')?.value || '',
        };
        formData.append(
          'request',
          new Blob([JSON.stringify(customerData)], { type: 'application/json' })
        );

        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }

        this._customerServce.addCustomer(formData).subscribe({
          next: (val: any) => {
            alert('customer added successfully');
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
