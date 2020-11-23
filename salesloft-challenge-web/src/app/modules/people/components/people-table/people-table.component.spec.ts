import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockPeopleList } from 'src/app/core/mockups/people-list.mockup';
import { People } from 'src/app/shared/models/people.model';

import { PeopleTableComponent } from './people-table.component';

describe('PeopleTableComponent', () => {
  let component: PeopleTableComponent;
  let fixture: ComponentFixture<PeopleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleTableComponent],
      imports: [MatTableModule, MatPaginatorModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource<People>(mockPeopleList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should bind list of people with details', async() => {
    expect(component.dataSource.data[0].id === 1).toBeTruthy();
    expect(component.dataSource.data.length).toBe(10);
  });

  it('should display all the people on the table', async () => {
    
    let fixture = TestBed.createComponent(PeopleTableComponent);
    component = fixture.componentInstance;
    component.setDataSource(mockPeopleList);
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
      expect(tableHeaders).toEqual(['Email Address','Name','Job Title']);
      
    });
    
  });
});
