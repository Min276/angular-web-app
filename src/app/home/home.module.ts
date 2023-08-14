import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BannerSectionComponent } from '../components/banner-section/banner-section.component';
import { ActionButtonComponent } from '../components/action-button/action-button.component';


@NgModule({
  declarations: [
    HomeComponent,
    BannerSectionComponent,
    ActionButtonComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
