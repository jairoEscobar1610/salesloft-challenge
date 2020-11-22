import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { mockPeopleList } from 'src/app/core/mockups/people-list.mockup';

import { PeopleTableComponent } from './people-table.component';

describe('PeopleTableComponent', () => {
  let component: PeopleTableComponent;
  let fixture: ComponentFixture<PeopleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleTableComponent],
      imports: [MatTableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleTableComponent);
    component = fixture.componentInstance;
    component.elements = mockPeopleList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should bind list of people with details', async() => {
    expect(component.elements[0].id === 1).toBeTruthy();
    expect(component.elements.length).toBe(10);
  });

  it('should display all the people on the table', async () => {
    
    let fixture = TestBed.createComponent(PeopleTableComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableBodyElements = fixture.debugElement.query(By.css("table[id='people-table'] tbody")).children;
      expect(tableBodyElements.length).toBe(10);
      
    });
    
  });

  it('should display correct columns for people data', async () => {
    
    let fixture = TestBed.createComponent(PeopleTableComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableHeaders = fixture.debugElement
        .query(By.css("table[id='people-table'] thead tr"))
        .children.map(header=>
            header.nativeElement.innerHTML.trim()
          );
      console.log(tableHeaders);
      expect(tableHeaders).toEqual(['Email Address','Name','Job Role']);
      
    });
    
  });
});
