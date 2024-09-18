import { Component, Inject } from '@angular/core';
import { ItemServiceService } from '../item-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css',
})
export class ItemDetailComponent {
  data: any;
  constructor(
    private itemService: ItemServiceService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ngOnInit(): void {
    console.log('ID received in dialog:', this.id);
    this.detailItem(this.id);
  }

  detailItem(id: number) {
    this.itemService.detailItem(id).subscribe({
      next: (res) => {
        this.data = res.data;
      },
      error: console.log,
    });
  }
}
