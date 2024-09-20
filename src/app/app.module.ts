import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailCustomerComponent } from './customer/detail-customer/detail-customer.component';
import { ActivatedRoute } from '@angular/router';
import { ItemListComponent } from './item/item-list/item-list.component';
import { routes } from './app.routes'; // Import routing dari app.routes.ts
import { ItemAddEditComponent } from './item/item-add-edit/item-add-edit.component';
import { MatRadioModule } from '@angular/material/radio';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderAddEditComponent } from './order/order-add-edit/order-add-edit.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    EmpAddEditComponent,
    CustomerListComponent,
    DetailCustomerComponent,
    ItemListComponent,
    ItemAddEditComponent,
    ItemDetailComponent,
    OrderListComponent,
    OrderAddEditComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatAutocompleteModule,
  ],
  providers: [
    provideHttpClient(withFetch()), // Provide HttpClient with fetch
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
