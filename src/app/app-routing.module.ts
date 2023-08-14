import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {component: HomeComponent, path: ""},
  {component: AboutUsComponent, path: "about-us"},
  {component: OurServicesComponent, path: "our-services"},
  {component: ContactUsComponent, path: "contact-us"},
  {component: ProductDetailComponent,  path: 'product-detail/:id' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
