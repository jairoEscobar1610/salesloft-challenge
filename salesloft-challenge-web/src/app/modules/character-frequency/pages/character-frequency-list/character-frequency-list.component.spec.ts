import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockCharacterFrequency } from 'src/app/core/mockups/character-frequency.mockup';
import { PeopleService } from 'src/app/core/services/people/people.service';

import { CharacterFrequencyListComponent } from './character-frequency-list.component';

describe('CharacterFrequencyListComponent', () => {
  let component: CharacterFrequencyListComponent;
  let fixture: ComponentFixture<CharacterFrequencyListComponent>;

 beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CharacterFrequencyListComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [PeopleService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFrequencyListComponent);
    component = fixture.componentInstance;
    component.elements = mockCharacterFrequency;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should bind list of character frequencies', async() => {
    expect(component.elements[0].key).toBeTruthy();
  });


  it('should display the error message', async() => {
    fixture = TestBed.createComponent(CharacterFrequencyListComponent);
    component = fixture.componentInstance;
    component.errorMsg = "Sample error"
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errorContainer = fixture.debugElement.query(By.css("#character-frequency-error")).nativeElement;
      expect(errorContainer.innerHTML).toBe("Sample error");
      
    });
  });
});
