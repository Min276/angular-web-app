import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecommendationService } from '../recommendation.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  title = 'About Us Page';
  myForm!: FormGroup;

  constructor(
    private fakeData: RecommendationService,
    private fb: FormBuilder
  ) {}
  apiAllData: any;
  showLoadMore: any;
  fetchData: any;
  isLoading = true;

  ngOnInit(): void {
    this.fetchAllData(4);

    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(40)],
      ],
      position: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      company: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      service: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  fetchAllData(quantity: number) {
    this.fakeData.getAllData()?.subscribe((data) => {
      console.log(data);
      this.apiAllData = data;
      this.fetchData = data.slice(0, quantity);
      this.showLoadMore = true;
      this.isLoading = false;

      if (this.fetchData?.length === this.apiAllData?.length) {
        this.showLoadMore = false;
      }
    });
  }

  loadMore() {
    this.fetchAllData(this.fetchData.length + 4);
    console.log(this.fetchData?.length);
  }

  message: any;

  clearUserInput() {
    this.myForm.get('name')?.reset();
    this.myForm.get('email')?.reset();
    this.myForm.get('position')?.reset();
    this.myForm.get('company')?.reset();
    this.myForm.get('service')?.reset();
    this.myForm.get('message')?.reset();
  }

  clearMessage() {
    this.message = '';
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('position', form.value.position);
    console.log('company', form.value.company);
    console.log('service', form.value.service);
    console.log('Message', form.value.message);

    let body = {
      name: form.value.name,
      email: form.value.email,
      position: form.value.position,
      company: form.value.company,
      title: form.value.service,
      message: form.value.message,
    };

    this.fakeData.postData(body).subscribe((response) => {
      console.log(response);
      if (response) {
        this.message =
          'Submitted successfully, Data added to recommendations !!';
        this.clearUserInput();
        this.fetchAllData(4);
      }
    });
  }
}
