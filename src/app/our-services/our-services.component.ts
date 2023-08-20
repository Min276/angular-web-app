import { Component, OnInit } from '@angular/core';
import { FakeDataService } from '../fake-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css'],
})
export class OurServicesComponent implements OnInit {
  constructor(private dataService: FakeDataService) {}
  fetchData: any;
  showLoadMore = false;
  isLoading= true;
  apiAllData: any;

  ngOnInit(): void {
    this.loadData(9);
    this.fetchAllData();
  }

  fetchAllData() {
    this.dataService.getAllData()?.subscribe((data) => {
      console.log(data);
      this.apiAllData = data;
    });
  }

  loadData(quantity: number) {
    this.dataService.getLimitData(quantity)?.subscribe((data) => {
      console.log(data);

      this.fetchData = data;
      this.showLoadMore = true;
      this.isLoading = false;

      if (data?.length === this.apiAllData?.length) {
        this.showLoadMore = false;
      }
    });
  }

  limitDescription = (text: any) => {
    return text?.slice(' ', 120).concat('...');
  };

  loadMore() {
    this.loadData(this.fetchData?.length + 6);
    console.log(this.fetchData?.length);
  }
}
