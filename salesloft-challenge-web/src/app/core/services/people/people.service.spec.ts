import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ConsoleLoggerService } from '../console-logger.service';
import { LoggerService } from '../logger.service';

import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let injector: TestBed;
  let service: PeopleService;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [PeopleService, { provide: LoggerService, useClass: ConsoleLoggerService }]
    })
      .compileComponents();
    injector = getTestBed();
    service = injector.inject(PeopleService);
    httpMock = injector.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('PeopleService', () => {
    it('should return people list',
      inject(
        [PeopleService, HttpTestingController],
        (peopleService: PeopleService, backend: HttpTestingController) => {

          peopleService.getPeopleList().subscribe((data: any) => {
            expect(data.length).toBeGreaterThan(0);
          });

          // Set up
          const responseObject = [{
            id: 1,
            name: 'Test',
            email: 'test@example.com',
            job_role: 'tester'
          }];
          // End Setup

          const requestWrapper = backend.expectOne(`${peopleService.apiUrl}/people/list`);
          requestWrapper.flush(responseObject);
          expect(requestWrapper.request.method).toEqual('GET');

          httpMock.verify();
        }
      )
    );

    it('should not return any people (invalid params)',
      inject(
        [PeopleService, HttpTestingController],
        (peopleService: PeopleService, backend: HttpTestingController) => {

          peopleService.getPeopleList(0).subscribe((data: any) => {
            expect(data).toEqual({ error: 'Invalid params' });
          });

          // Set up
          const responseObject = {
            error: 'Invalid params'
          };
          const requestWrapper = backend.expectOne(`${peopleService.apiUrl}/people/list`);
          requestWrapper.flush(responseObject);
          expect(requestWrapper.request.method).toEqual('GET');

          httpMock.verify();
        }
      ));

    it('should return character frequency list',
      inject(
        [PeopleService, HttpTestingController],
        (peopleService: PeopleService, backend: HttpTestingController) => {

          peopleService.getCharacterFrequency().subscribe((data: any) => {
            expect(data.length).toBeGreaterThan(0);
          });

          // Set up
          const responseObject = [{
            key: 'a', frequency: 5
          }];
          // End Setup

          const requestWrapper = backend.expectOne(`${peopleService.apiUrl}/people/character-frequency`);
          requestWrapper.flush(responseObject);
          expect(requestWrapper.request.method).toEqual('GET');

          httpMock.verify();
        }
      ));

    it('should return possible duplicate groups',
      inject(
        [PeopleService, HttpTestingController],
        (peopleService: PeopleService, backend: HttpTestingController) => {

          peopleService.getPossibleDuplicates().subscribe((data: any) => {
            expect(data.groups).toEqual([]);
          });

          // Set up
          const responseObject = { groups: [] };
          // End Setup

          const requestWrapper = backend.expectOne(`${peopleService.apiUrl}/people/duplicates`);
          requestWrapper.flush(responseObject);
          expect(requestWrapper.request.method).toEqual('GET');

          httpMock.verify();
        }
      ));
  });
});
