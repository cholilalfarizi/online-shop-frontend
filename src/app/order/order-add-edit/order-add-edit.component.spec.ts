import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAddEditComponent } from './order-add-edit.component';

describe('OrderAddEditComponent', () => {
  let component: OrderAddEditComponent;
  let fixture: ComponentFixture<OrderAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
