import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSmallComponent } from './product-details-small.component';

describe('ProductDetailsSmallComponent', () => {
  let component: ProductDetailsSmallComponent;
  let fixture: ComponentFixture<ProductDetailsSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
