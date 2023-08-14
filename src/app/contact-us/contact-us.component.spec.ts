import { ComponentFixture, TestBed, waitForAsync, tick} from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactUsComponent } from './contact-us.component';
import { FormContactsService } from '../form-contacts.service';
import { of } from 'rxjs';


describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  let formService: FormContactsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, FormContactsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(FormContactsService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const form: FormGroup = component.myForm;
    expect(form.get('name')?.value).toEqual('');
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('phNo')?.value).toEqual('');
    expect(form.get('message')?.value).toEqual('');
  });

  it('should show error message when name field is invalid and dirty', () => {
    const form: FormGroup = component.myForm;
    const nameControl = form.get('name');
    nameControl?.setValue(''); 
    nameControl?.markAsDirty(); 

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage.textContent).toContain('Please provide a valid name.');
  });


  it('should call formService.postData() on form submission', () => {
    spyOn(formService, 'postData').and.returnValue(
      of({ success: true })
    );

    const form: FormGroup = component.myForm;
    form.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      phNo: '1234567890',
      message: 'Test message',
    });

    component.onSubmit(form);

    expect(formService.postData).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      phNo: '1234567890',
      message: 'Test message',
    });
  });

  it('should show success message after successful form submission', waitForAsync(async () => {
    const postDataSpy = spyOn(formService, 'postData').and.returnValue(
      of({ success: true })
    );
  
    const form: FormGroup = component.myForm;
    form.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      phNo: '1234567890',
      message: 'Test message',
    });
  
    component.onSubmit(form);
  
    await fixture.whenStable();
  
    expect(postDataSpy).toHaveBeenCalled();
  
    fixture.detectChanges();
  
    const successMessage = fixture.nativeElement.querySelector('h3.success');
    expect(successMessage.textContent).toContain(
      "Submitted successfully, We'll get back to you soon !!"
    );
  }));
  
});

