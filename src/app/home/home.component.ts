import { Component, OnInit } from '@angular/core';
import { FakeDataService } from '../fake-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private dataService: FakeDataService) {}
  fetchData: any;
  isLoading = true;
  showFullList = false;

  ngOnInit(): void {
    this.dataService.getLimitData(6).subscribe((data) => {
      console.log(data);
      this.fetchData = data;
      this.isLoading = false;
      this.showFullList = true;
    });
  }

  limitDescription = (text: any) => {
    return text?.slice(' ', 120).concat('...');
  };
}
