import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormContactsService } from '../form-contacts.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formService: FormContactsService
  ) {}

  fetchData: [] = [];

  ngOnInit() {
    this.formService.getAllData().subscribe((data) => {
      console.log(data);
    });

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
      phNo: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]+$'),
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

  title = 'Drop your message to us';
  message: any;

  clearUserInput() {
    this.myForm.get('name')?.reset();
    this.myForm.get('email')?.reset();
    this.myForm.get('phNo')?.reset();
    this.myForm.get('message')?.reset();
  }

  clearMessage() {
    this.message = '';
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Ph No', form.value.phNo);
    console.log('Message', form.value.message);

    let body = {
      name: form.value.name,
      email: form.value.email,
      phNo: form.value.phNo,
      message: form.value.message,
    };

    this.formService.postData(body).subscribe((response) => {
      console.log(response);
      if (response) {
        this.message = "Submitted successfully, We'll get back to you soon !!";
        this.clearUserInput();
        // setTimeout(this.clearMessage, 20000);
      }
    });
  }
}
