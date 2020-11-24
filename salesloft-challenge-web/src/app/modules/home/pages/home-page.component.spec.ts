import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, MockComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'home', component: MockComponent }, { path: 'people', component: MockComponent },
        { path: 'character-frequency', component: MockComponent }, { path: 'duplicates', component: MockComponent }
      ])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Home page button should navigate on click - people', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.detectChanges();
      fixture.debugElement.query(By.css('button[id="people-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/people');
      });

    })));
  it('Header should navigate on click - character-frequency', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {

      fixture.detectChanges();

      fixture.debugElement.query(By.css('button[id="character-frequency-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/character-frequency');
      });

    })));
  it('Header should navigate on click - duplicates', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {

      fixture.detectChanges();

      fixture.debugElement.query(By.css('button[id="duplicate-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(location.path()).toEqual('/duplicates');
      });

    })));
});

@Component({
  selector: 'app-mock-component',
  template: ''
})
class MockComponent {
}
