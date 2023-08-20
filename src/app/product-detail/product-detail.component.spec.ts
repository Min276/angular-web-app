import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FakeDataService } from '../fake-data.service';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let fakeDataService: jasmine.SpyObj<FakeDataService>;
  let route: ActivatedRoute;
  let location: Location;

  const fakeProductData = {
    id: 1,
    title: 'Sample Product',
    description: 'This is a sample product description.',
    category: 'Sample Category',
    image: 'sample-image.jpg',
    rating: { rate: 4.5, count: 10 },
    price: 99.99,
  };

  beforeEach(() => {
    const fakeDataServiceSpy = jasmine.createSpyObj('FakeDataService', ['getDataById']);
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: Location, useValue: jasmine.createSpyObj('Location', ['back']) },
        { provide: FakeDataService, useValue: fakeDataServiceSpy },
      ],
    });
    fakeDataService = TestBed.inject(FakeDataService) as jasmine.SpyObj<FakeDataService>;
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product data on initialization', () => {
    fakeDataService.getDataById.and.returnValue(of(fakeProductData));

    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
    expect(component.productData).toEqual(fakeProductData);
  });

  it('should navigate back when goBack() is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
