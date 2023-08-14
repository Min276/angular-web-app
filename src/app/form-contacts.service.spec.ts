import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormContactsService } from './form-contacts.service';

describe('FormContactsService', () => {
  let service: FormContactsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormContactsService],
    });

    service = TestBed.inject(FormContactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable with all data', () => {
    const mockData = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        phNo: '09453453454',
        message: 'adfadfaddd',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'hello@gmail.com',
        phNo: '09453453454',
        message: 'djlakjfajsd',
      },
    ];

    service.getAllData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:3000/form_contacts');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should post data and return an Observable with the response', () => {
    const postData = { name: 'Test User', email: 'test@example.com',  phNo: "09453453454", message: "Hello everyone" };
    const mockResponse = { success: true, message: 'Data posted successfully' };

    service.postData(postData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/form_contacts');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postData);
  });
});
