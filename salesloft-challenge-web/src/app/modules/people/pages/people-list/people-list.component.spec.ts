import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockPeopleList } from 'src/app/core/mockups/people-list.mockup';
import { PeopleService } from 'src/app/core/services/people/people.service';
import { PeopleTableComponent } from '../../components/people-table/people-table.component';

import { PeopleListComponent } from './people-list.component';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [PeopleListComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [PeopleService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    component.elements = mockPeopleList;
    component.currentPage = 1;
    component.totalCount = 100;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind list of people with details', async() => {
    expect(component.elements[0].id).toBeTruthy();
  });

  it('should bind total count of people', async() => {
    expect(component.totalCount).toBe(100);
  });

  it('should bind current page', () => {
    expect(component.currentPage).toBe(1);
  });

  it('should display the error message', async () => {
    component = fixture.componentInstance;
    component.peopleListErrorMsg = "Sample error";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorContainer = fixture.debugElement.query(By.css("#people-list-error")).nativeElement;
      expect(errorContainer.innerHTML).toBe("Sample error");
      
    });
  });
});
