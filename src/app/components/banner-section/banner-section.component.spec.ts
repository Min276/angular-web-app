import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSectionComponent } from './banner-section.component';
import { ActionButtonComponent } from '../action-button/action-button.component';

describe('BannerSectionComponent', () => {
  let component: BannerSectionComponent;
  let fixture: ComponentFixture<BannerSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerSectionComponent, ActionButtonComponent]
    });
    fixture = TestBed.createComponent(BannerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
