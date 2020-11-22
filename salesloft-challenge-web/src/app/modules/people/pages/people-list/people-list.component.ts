import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleService } from 'src/app/core/services/people/people.service';
import { People } from 'src/app/shared/models/people.model';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, OnDestroy, AfterViewInit {

  //DataTable data
  elements: Array<People> = new Array<People>();
  currentPage = 1;
  pages = 0;


  //Error label handling
  public peopleListErrorMsg: string = "";

  //Subscriptions
  public peopleListSubscription?: Subscription;

  constructor(private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.fetchList();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.peopleListSubscription!.unsubscribe();
  }

  /**
   * Get url list
   */
  fetchList(): void {
    this.peopleListErrorMsg = "";
    this.spinner.show();
    this.peopleListSubscription = this.peopleService.getPeopleList()
      .pipe(
        map(response => response.data),
        map((response) => response.map((data: any) => new People(data.id, data.display_name, data.email_address, data.title)))
      )
      .subscribe(res => {
        console.log(res);
        //Error exists
        this.elements = res;

      }, error => {
        console.log(error);
        this.peopleListErrorMsg = "Cannot connect to the Salesloft API. Please try again later";
      }, () => {
        this.spinner.hide();
      }
      );

  }

}
