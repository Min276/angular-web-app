import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FakeDataService } from '../fake-data.service';
import { BannerSectionComponent } from '../components/banner-section/banner-section.component';
import { ActionButtonComponent } from '../components/action-button/action-button.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fakeDataService: FakeDataService;

  const fakeData = [
    {
      id: 1,
      image: 'image1.jpg',
      category: 'Category 1',
      title: 'Product 1',
      description: 'Description for Product 1',
      rating: { rate: 4.5 },
      price: 19.99,
    },
    // ... Add more fake data as needed
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, BannerSectionComponent, ActionButtonComponent],
      providers: [
        {
          provide: FakeDataService,
          useValue: {
            getLimitData: () => of(fakeData),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fakeDataService = TestBed.inject(FakeDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display data', () => {
    expect(component.isLoading).toBe(false);
    expect(component.fetchData).toEqual(fakeData);
    expect(component.showFullList).toBe(true);

    const cardElements = fixture.nativeElement.querySelectorAll('.card');
    expect(cardElements.length).toBe(fakeData.length);

    const titleElement = cardElements[0].querySelector('h3');
    expect(titleElement.textContent).toContain(fakeData[0].title);

    // Add more assertions for other data if needed
  });

  it('should limit description', () => {
    const longDescription = 'This is a long description that needs to be limited.';
    const limitedDescription = component.limitDescription(longDescription);
    expect(limitedDescription).toBe(`${longDescription.slice(0, 120)}...`);
  });

  // Add more test cases as needed
});
