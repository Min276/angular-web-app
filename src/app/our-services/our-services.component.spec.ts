import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OurServicesComponent } from './our-services.component';
import { FakeDataService } from '../fake-data.service';
import { of } from 'rxjs';

describe('OurServicesComponent', () => {
  let component: OurServicesComponent;
  let fixture: ComponentFixture<OurServicesComponent>;
  let fakeDataService: jasmine.SpyObj<FakeDataService>;

  const mockData = [
    {
    category:  "men's clothing",
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id : 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    rating: {
      rate: 3.9, 
      count: 120
    },
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
  },
  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
  ];

  beforeEach(() => {
    const fakeDataServiceSpy = jasmine.createSpyObj('FakeDataService', ['getAllData', 'getLimitData']);
    TestBed.configureTestingModule({
      declarations: [OurServicesComponent],
      providers: [
        { provide: FakeDataService, useValue: fakeDataServiceSpy }
      ]
    });
    fakeDataService = TestBed.inject(FakeDataService) as jasmine.SpyObj<FakeDataService>;
    fixture = TestBed.createComponent(OurServicesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all data from the service', () => {
    const mockApiAllData = [...mockData]; 
    fakeDataService.getAllData.and.returnValue(of(mockApiAllData));

    component.fetchAllData();

    expect(fakeDataService.getAllData).toHaveBeenCalled();
    expect(component.apiAllData).toEqual(mockApiAllData);
  });

  it('should load limited data on init', () => {
    const mockLimitData = [...mockData].slice(0, 9);
    fakeDataService.getLimitData.and.returnValue(of(mockLimitData));
    const expectedShowLoadMore = mockLimitData.length < mockData.length;

    component.ngOnInit();

    expect(fakeDataService.getLimitData).toHaveBeenCalledWith(9);
    expect(component.fetchData).toEqual(mockLimitData);
    expect(component.showLoadMore).toBe(expectedShowLoadMore);
    expect(component.isLoading).toBe(false);
  });

  it('should limit description text', () => {
    const description = 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system';
    const expectedResult = 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS...';
    
    const result = component.limitDescription(description);

    expect(result).toEqual(expectedResult);
  });

  it('should load more data when clicking load more button', () => {
    const initialDataLength = 9; 
    const newData = [...mockData].slice(initialDataLength, initialDataLength + 6); 
    fakeDataService.getLimitData.and.returnValue(of(newData));

    component.fetchData = [...mockData].slice(0, initialDataLength);
    component.apiAllData = mockData;

    component.loadMore();

    expect(fakeDataService.getLimitData).toHaveBeenCalledWith(initialDataLength + 6);
    expect(component.showLoadMore).toBe(true);
  });
});
