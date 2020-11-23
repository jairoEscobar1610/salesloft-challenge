import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { mockCharacterFrequency } from 'src/app/core/mockups/character-frequency.mockup';
import { CharacterFrequency } from 'src/app/shared/models/character-frequecy.model';

import { CharacterFrequencyTableComponent } from './character-frequency-table.component';

describe('CharacterFrequencyTableComponent', () => {
  let component: CharacterFrequencyTableComponent;
  let fixture: ComponentFixture<CharacterFrequencyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterFrequencyTableComponent],
      imports: [MatTableModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFrequencyTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource<CharacterFrequency>(mockCharacterFrequency);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should bind list of frequencies', async () => {
    expect(component.dataSource.data[0].key === 'a').toBeTruthy();
    expect(component.dataSource.data.length).toBe(10);
  });

  it('should display all the character frequencies on the table', async () => {

    let fixture = TestBed.createComponent(CharacterFrequencyTableComponent);
    component = fixture.componentInstance;
    component.setDataSource(mockCharacterFrequency);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableBodyElements = fixture.debugElement.query(By.css("table[id='character-frequency-table'] tbody")).children;
      expect(tableBodyElements.length).toBe(10);

    });

  });

  it('should display correct columns for character frequency data', async () => {

    let fixture = TestBed.createComponent(CharacterFrequencyTableComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableHeaders = fixture.debugElement
        .query(By.css("table[id='character-frequency-table'] thead tr"))
        .children.map(header =>
          header.nativeElement.innerHTML.trim()
        );
      expect(tableHeaders).toEqual(['Key', 'Frequency']);

    });
  });

});
