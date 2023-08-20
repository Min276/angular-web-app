import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeDataService } from '../fake-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: FakeDataService,
    private location: Location
  ) {}

  productData: any;
  isLoading = true;

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.dataService
      .getDataById(id)
      .subscribe((data) => {
        this.productData = data
        this.isLoading = false;
  }   );
  }

  goBack(): void {
    this.location.back();
  }
}
