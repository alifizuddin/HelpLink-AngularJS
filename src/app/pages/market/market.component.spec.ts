import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MarketService } from '../../services/market.service';

import { MarketComponent } from './market.component';

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;
  let marketService: jasmine.SpyObj<MarketService>;

  beforeEach(async () => {
    marketService = jasmine.createSpyObj<MarketService>('MarketService', [
      'getProducts',
      'addProduct',
      'purchaseProduct',
      'getPurchases'
    ]);
    marketService.getProducts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [MarketComponent],
      providers: [{ provide: MarketService, useValue: marketService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not show products pending review in the market catalog', () => {
    marketService.getProducts.and.returnValue(of([
      {
        id: 'pending',
        name: 'Pending listing',
        description: 'Awaiting approval',
        price: 10,
        image: 'pending.jpg',
        status: 'pending_review'
      },
      {
        id: 'approved',
        name: 'Approved listing',
        description: 'Approved for display',
        price: 15,
        image: 'approved.jpg',
        status: 'approved'
      }
    ]));

    component.loadProducts();

    expect(component.products.some((product) => product.id === 'pending')).toBeFalse();
    expect(component.products.some((product) => product.id === 'approved')).toBeTrue();
  });
});
