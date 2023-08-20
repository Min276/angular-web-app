// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AboutUsComponent } from './about-us.component';

// describe('AboutUsComponent', () => {
//   let component: AboutUsComponent;
//   let fixture: ComponentFixture<AboutUsComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AboutUsComponent]
//     });
//     fixture = TestBed.createComponent(AboutUsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AboutUsComponent } from './about-us.component';
import { RecommendationService } from '../recommendation.service';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let recommendationService: RecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: RecommendationService,
          useValue: {
            getAllData: () => of([]), // Mock the RecommendationService
            postData: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    recommendationService = TestBed.inject(RecommendationService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls with default values', () => {
    fixture.detectChanges(); // Trigger ngOnInit

    const nameControl = component.myForm.get('name');
    const emailControl = component.myForm.get('email');
    const positionControl = component.myForm.get('position');
    const companyControl = component.myForm.get('company');
    const serviceControl = component.myForm.get('service');
    const messageControl = component.myForm.get('message');

    expect(nameControl?.value).toEqual('');
    expect(emailControl?.value).toEqual('');
    expect(positionControl?.value).toEqual('');
    expect(companyControl?.value).toEqual('');
    expect(serviceControl?.value).toEqual('');
    expect(messageControl?.value).toEqual('');
  });

  it('should validate form controls', () => {
    fixture.detectChanges();

    const nameControl = component.myForm.get('name');
    const emailControl = component.myForm.get('email');
    const positionControl = component.myForm.get('position');
    const companyControl = component.myForm.get('company');
    const serviceControl = component.myForm.get('service');
    const messageControl = component.myForm.get('message');

    // Set invalid values
    nameControl?.setValue('');
    emailControl?.setValue('invalid-email');
    positionControl?.setValue('');
    companyControl?.setValue('');
    serviceControl?.setValue('');
    messageControl?.setValue('short');

    expect(nameControl?.invalid).toBe(true);
    expect(emailControl?.invalid).toBe(true);
    expect(positionControl?.invalid).toBe(true);
    expect(companyControl?.invalid).toBe(true);
    expect(serviceControl?.invalid).toBe(true);
    expect(messageControl?.invalid).toBe(true);

    // Set valid values
    nameControl?.setValue('John Doe');
    emailControl?.setValue('johndoe@example.com');
    positionControl?.setValue('Developer');
    companyControl?.setValue('ABC Inc.');
    serviceControl?.setValue('Web Development');
    messageControl?.setValue('This is a longer message.');

    expect(nameControl?.valid).toBe(true);
    expect(emailControl?.valid).toBe(true);
    expect(positionControl?.valid).toBe(true);
    expect(companyControl?.valid).toBe(true);
    expect(serviceControl?.valid).toBe(true);
    expect(messageControl?.valid).toBe(true);
  });

  it('should clear user input', () => {
    fixture.detectChanges();

    const nameControl = component.myForm.get('name');
    const emailControl = component.myForm.get('email');
    const positionControl = component.myForm.get('position');
    const companyControl = component.myForm.get('company');
    const serviceControl = component.myForm.get('service');
    const messageControl = component.myForm.get('message');

    nameControl?.setValue('John Doe');
    emailControl?.setValue('johndoe@example.com');
    positionControl?.setValue('Developer');
    companyControl?.setValue('ABC Inc.');
    serviceControl?.setValue('Web Development');
    messageControl?.setValue('This is a longer message.');

    component.clearUserInput();

    expect(nameControl?.value).toEqual(null);
    expect(emailControl?.value).toEqual(null);
    expect(positionControl?.value).toEqual(null);
    expect(companyControl?.value).toEqual(null);
    expect(serviceControl?.value).toEqual(null);
    expect(messageControl?.value).toEqual(null);
  });

  it('should submit form data', () => {
    fixture.detectChanges();

    spyOn(recommendationService, 'postData').and.returnValue(of({}));

    component.myForm.setValue({
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'Developer',
      company: 'ABC Inc.',
      service: 'Web Development',
      message: 'This is a longer message.',
    });

    component.onSubmit(component.myForm);

    expect(recommendationService.postData).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'Developer',
      company: 'ABC Inc.',
      title: 'Web Development',
      message: 'This is a longer message.',
    });
    expect(component.message).toBe('Submitted successfully, Data added to recommendations !!');
    expect(component.myForm.value).toEqual({
      name: null,
      email: null,
      position: null,
      company: null,
      service: null,
      message: null,
    });
  });
});
