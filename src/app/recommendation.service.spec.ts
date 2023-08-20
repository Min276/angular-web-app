// import { TestBed } from '@angular/core/testing';

// import { RecommendationService } from './recommendation.service';

// describe('RecommendationService', () => {
//   let service: RecommendationService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(RecommendationService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecommendationService } from './recommendation.service';

describe('RecommendationService', () => {
  let recommendationService: RecommendationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [RecommendationService],
    });

    recommendationService = TestBed.inject(RecommendationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test, verify that there are no outstanding HTTP requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(recommendationService).toBeTruthy();
  });

  it('should fetch data from the API via GET', () => {
    const testData = [{ id: 1, name: 'Recommendation 1' }];

    recommendationService.getAllData().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/recommendations');
    expect(req.request.method).toEqual('GET');

    // Respond with the test data
    req.flush(testData);
  });

  it('should post data to the API via POST', () => {
    const testData = { name: 'New Recommendation' };

    recommendationService.postData(testData).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/recommendations');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    // Respond with the test data
    req.flush(testData);
  });
});
