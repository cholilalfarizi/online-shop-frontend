import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../order-service.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderAddEditComponent } from '../order-add-edit/order-add-edit.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent implements OnInit {
  public orders: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  keyword: string = '';
  pageSizes: Array<number> = [5, 10, 20];
  totalData: number = 0;

  constructor(
    private orderService: OrderServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  public getOrder(): void {
    this.orderService
      .getAllOrder(this.currentPage, this.pageSize, this.keyword)
      .subscribe(
        (response: any) => {
          this.orders = response.data;
          this.totalData = response.pagination.totalItem;
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching items:', error.message);
        }
      );
  }

  filterData(): void {
    this.getOrder();
    console.log(this.keyword);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.totalData / this.pageSize)) {
      this.currentPage++;
      this.getOrder();
    }
  }

  // Move to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getOrder();
    }
  }

  // Generate array of page numbers for pagination buttons
  pageNumbers() {
    let totalPages = Math.ceil(this.totalData / this.pageSize);
    return Array.from({ length: totalPages }, (v, i) => i + 1);
  }

  // Change the current page when a page number is clicked
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getOrder();
  }

  // Change page size when a new size is selected
  changePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset to the first page
    this.getOrder();
  }

  openAddForm() {
    this.dialog.open(OrderAddEditComponent);
  }

  // Open the edit form for a specific customer
  openEditForm(data: any) {
    const dialogRef = this.dialog.open(OrderAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrder();
        }
      },
    });
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe({
      next: (res) => {
        alert('Order deleted!');
        this.getOrder(); // Refresh the list after deletion
      },
      error: console.log,
    });
  }

  detailOrder(id: number) {
    this.dialog.open(OrderDetailComponent, {
      data: id,
    });
  }
}
