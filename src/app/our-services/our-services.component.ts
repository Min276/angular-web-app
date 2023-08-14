import { Component, OnInit } from '@angular/core';
import { FakeDataService } from '../fake-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {

   constructor(private dataService: FakeDataService){}
   fetchData: any;

    ngOnInit(): void {
      this.dataService.getAllData().subscribe((data) => {
        console.log(data);
        this.fetchData = data;
      })
    }

    limitDescription = (text: any) => {
      return text?.slice(" ", 120).concat("...");
    };
}
