import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFrequencyComponent } from './character-frequency.component';

describe('CharacterFrequencyComponent', () => {
  let component: CharacterFrequencyComponent;
  let fixture: ComponentFixture<CharacterFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
