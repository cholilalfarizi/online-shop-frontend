import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from '../item-service.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemAddEditComponent } from '../item-add-edit/item-add-edit.component';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  public items: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  name: string = '';
  pageSizes: Array<number> = [5, 10, 20];
  totalData: number = 0;

  constructor(
    private itemService: ItemServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.itemService
      .getAllItem(this.currentPage, this.pageSize, this.name)
      .subscribe(
        (response: any) => {
          this.items = response.data;
          this.totalData = response.pagination.totalItem;
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching items:', error.message);
        }
      );
  }

  filterData(): void {
    this.getItems();
    console.log(this.name);
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.totalData / this.pageSize)) {
      this.currentPage++;
      this.getItems();
    }
  }

  // Move to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getItems();
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
    this.getItems();
  }

  // Change page size when a new size is selected
  changePageSize(pageSize: any) {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset to the first page
    this.getItems();
  }

  openAddForm() {
    this.dialog.open(ItemAddEditComponent);
  }

  // Open the edit form for a specific customer
  openEditForm(data: any) {
    const dialogRef = this.dialog.open(ItemAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getItems();
        }
      },
    });
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe({
      next: (res) => {
        alert('Item deleted!');
        this.getItems(); // Refresh the list after deletion
      },
      error: console.log,
    });
  }

  detailItem(id: number) {
    this.dialog.open(ItemDetailComponent, {
      data: id,
    });
  }
}
