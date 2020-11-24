import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, MockLoaderComponent, MockComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([
        { path: 'home', component: MockComponent }, { path: 'people', component: MockComponent },
        { path: 'character-frequency', component: MockComponent }, { path: 'duplicates', component: MockComponent }
      ])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Header should navigate on click - home', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.query(By.css('a[id="home-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/home');
      });

    })));
  it('Header should navigate on click - people', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.query(By.css('a[id="people-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/people');
      });

    })));
  it('Header should navigate on click - character-frequency', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.query(By.css('a[id="character-frequency-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/character-frequency');
      });

    })));
  it('Header should navigate on click - duplicates', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.query(By.css('a[id="duplicate-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/duplicates');
      });

    })));
  it('Header logo should navigate on click - home', waitForAsync(
    inject([Router, Location], (router: Router, location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.query(By.css('a[id="logo-link"]')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/home');
      });

    })));
});

@Component({
  selector: 'app-loader',
  template: ''
})
class MockLoaderComponent {
}

@Component({
  selector: 'app-mock-component',
  template: ''
})
class MockComponent {
}

