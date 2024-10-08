import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddEditComponent } from './item-add-edit.component';

describe('ItemAddEditComponent', () => {
  let component: ItemAddEditComponent;
  let fixture: ComponentFixture<ItemAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
