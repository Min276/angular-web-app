import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if a route is currently active', () => {
    const router = TestBed.inject(Router);

    const testCases = [
      { route: '/', isActive: true },
      { route: '/about-us', isActive: false },
      { route: '/our-services', isActive: false },
      { route: '/contact-us', isActive: false },
      { route: '/non-existing-route', isActive: false }
    ];

    testCases.forEach((testCase) => {
      const isActive = component.isRouteActive(testCase.route);
      expect(isActive).toBe(testCase.isActive, `Route ${testCase.route} should be active: ${testCase.isActive}`);
    });
  });
});

