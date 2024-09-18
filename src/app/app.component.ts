import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [
  //   RouterOutlet,
  //   CustomerListComponent,
  //   MatToolbarModule,
  //   MatIconModule,
  //   MatButtonModule,
  //   MatDialogModule,
  // ], // Remove HttpClientModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'readiness-frontend';

  constructor(private _dialog: MatDialog) {}

  openEditAddCustForm() {
    this._dialog.open(EmpAddEditComponent);
  }
}
