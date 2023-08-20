import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FakeDataService } from './fake-data.service';

describe('FakeDataService', () => {
  let service: FakeDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FakeDataService]
    });
    service = TestBed.inject(FakeDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no outstanding HTTP requests are pending.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all data', () => {
    const testData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    service.getAllData().subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service['baseURL']}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get limited data', () => {
    const quantity = 5;
    const testData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    service.getLimitData(quantity).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service['baseURL']}?limit=${quantity}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should get data by ID', () => {
    const id = 1;
    const testData = { id: 1, name: 'Product 1' };

    service.getDataById(id).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${service['baseURL']}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
});
