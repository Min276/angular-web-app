import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerSectionComponent } from '../components/banner-section/banner-section.component';
import { HomeComponent } from './home.component';
import { ActionButtonComponent } from '../components/action-button/action-button.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, BannerSectionComponent, ActionButtonComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
