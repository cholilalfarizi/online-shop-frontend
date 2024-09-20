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

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getOrder();
    }
  }

  pageNumbers() {
    let totalPages = Math.ceil(this.totalData / this.pageSize);
    return Array.from({ length: totalPages }, (v, i) => i + 1);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getOrder();
  }

  changePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getOrder();
  }

  openAddForm() {
    this.dialog.open(OrderAddEditComponent);
  }

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

  downloadReport() {
    this.orderService
      .downloadReport(this.currentPage, this.pageSize, this.keyword)
      .subscribe({
        next: (response) => {
          const blob = response.body;

          // Check if blob is not null before proceeding
          if (blob) {
            const contentDisposition = response.headers.get(
              'Content-Disposition'
            );

            // Extract filename from the contentDisposition header if it exists
            const filename = contentDisposition
              ? contentDisposition.split('filename=')[1].replace(/"/g, '')
              : 'Order_Report.pdf'; // Default filename if not found
            console.log('Content-Disposition header:', contentDisposition);

            // Create a URL for the Blob and trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Use the filename from the server
            a.click();
            window.URL.revokeObjectURL(url); // Clean up
          } else {
            console.error('Failed to download the report: Blob is null');
          }
        },
        error: (err) => {
          console.error('Error downloading the report:', err);
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
