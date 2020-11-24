import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PeopleService } from 'src/app/core/services/people/people.service';

@Component({
  selector: 'app-duplicates-page',
  templateUrl: './duplicates-page.component.html',
  styleUrls: ['./duplicates-page.component.scss']
})
export class DuplicatesPageComponent implements OnInit, OnDestroy, AfterViewInit {



  // Error label handling
  public errorMsg = '';

  public groups: Array<Array<string>> = [];

  // Subscriptions
  public duplicatesSubscription?: Subscription;

  constructor(private spinner: NgxSpinnerService, private peopleService: PeopleService) {
  }

  ngOnInit(): void {
    this.fetchDuplicates();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.duplicatesSubscription) {
      this.duplicatesSubscription.unsubscribe();
    }

  }

  /**
   * Get possible duplicates from People API
   */
  fetchDuplicates(): void {
    this.errorMsg = '';
    this.spinner.show();

    // Format observable data before consumption
    this.duplicatesSubscription = this.peopleService.getPossibleDuplicates()
      .subscribe(res => {
        this.groups = res.groups;

      }, error => {
        // Error exists
        console.log('Error:', error);
        this.errorMsg = 'Cannot connect to the API. Please try again later';
      }, () => {
        this.spinner.hide();
      }
      );
  }

}
