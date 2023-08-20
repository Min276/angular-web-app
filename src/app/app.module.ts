import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AboutUsModule } from './about-us/about-us.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OurServicesModule } from './our-services/our-services.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailModule } from './product-detail/product-detail.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    AboutUsModule,
    OurServicesModule,
    ProductDetailModule,
    ContactUsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
