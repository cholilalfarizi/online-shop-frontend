import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListService } from './customer-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../../emp-add-edit/emp-add-edit.component';
import { DetailCustomerComponent } from '../detail-customer/detail-customer.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  public customers: any[] = [];
  filteredCustomer: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  name: string = '';
  pageSizes: Array<number> = [5, 10, 20];
  totalData: number = 0;

  constructor(
    private customerListService: CustomerListService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCustomers();
  }

  public getCustomers(): void {
    this.customerListService
      .getAllCustomer(this.currentPage, this.pageSize, this.name)
      .subscribe(
        (response: any) => {
          this.customers = response.data;
          this.filteredCustomer = this.customers;
          this.totalData = response.pagination.totalItem;
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching customers:', error.message);
        }
      );
  }

  filterData(): void {
    this.getCustomers();
    console.log(this.name);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.totalData / this.pageSize)) {
      this.currentPage++;
      this.getCustomers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCustomers();
    }
  }

  pageNumbers() {
    let totalPages = Math.ceil(this.totalData / this.pageSize);
    return Array.from({ length: totalPages }, (v, i) => i + 1);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getCustomers();
  }

  changePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getCustomers();
  }

  openPopup() {
    this.dialog.open(EmpAddEditComponent);
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCustomers();
        }
      },
    });
  }

  deleteCustomer(id: number) {
    this.customerListService.deleteCustomer(id).subscribe({
      next: (res) => {
        alert('Customer deleted!');
        this.getCustomers();
      },
      error: console.log,
    });
  }

  detailCustomer(id: number) {
    this.dialog.open(DetailCustomerComponent, {
      data: id,
    });
  }
}
