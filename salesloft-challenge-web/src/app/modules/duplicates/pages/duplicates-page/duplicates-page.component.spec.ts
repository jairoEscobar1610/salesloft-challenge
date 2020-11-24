import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { By } from '@angular/platform-browser';
import { PeopleService } from 'src/app/core/services/people/people.service';

import { DuplicatesPageComponent } from './duplicates-page.component';

describe('DuplicatesPageComponent', () => {
  let component: DuplicatesPageComponent;
  let fixture: ComponentFixture<DuplicatesPageComponent>;
  let mockGroups = [
    ['example@gmail.com', 'example@gmai.com'],
    ['example@test.com', 'example@teest.com']
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [DuplicatesPageComponent],
      imports: [HttpClientModule, HttpClientTestingModule, MatCardModule, MatChipsModule],
      providers: [PeopleService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatesPageComponent);
    component = fixture.componentInstance;
    component.groups = mockGroups;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should bind group of possible duplicates', async () => {
    expect(component.groups).toBeTruthy();
  });

  it('should display all the emails from a given group', async () => {
    let chipElement;
    component = fixture.componentInstance;
    component.groups = mockGroups;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      mockGroups[0].forEach((email, index) => {
        chipElement = fixture.debugElement.query(By.css(`#email-${0}-${index}-chip`)).nativeElement;
        expect(chipElement.innerHTML).toContain(email);
      });
    });
  });

  it('should display the correct number of groups', async () => {
    let chipElements;
    component = fixture.componentInstance;
    component.groups = mockGroups;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      chipElements = fixture.debugElement.queryAll(By.css(`.group-card`));
      expect(chipElements.length).toBe(2);
    });
  });

  it('should display the error message', waitForAsync(() => {
    component = fixture.componentInstance;
    component.errorMsg = "Sample error"
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorContainer = fixture.debugElement.query(By.css("#duplicates-error")).nativeElement;
      expect(errorContainer.innerHTML).toBe("Sample error");

    });
  }));
});
