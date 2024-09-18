import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { ItemListComponent } from './item/item-list/item-list.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/customer',
    pathMatch: 'full',
  },
  {
    path: 'customer',
    component: CustomerListComponent,
    pathMatch: 'full',
  },
  {
    path: 'item',
    component: ItemListComponent,
    pathMatch: 'full',
  },
  //   {
  //     path: 'order',
  //     component: OrderComponent,
  //     pathMatch: 'full',
  //   },
];
