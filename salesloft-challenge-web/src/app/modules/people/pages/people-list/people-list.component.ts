import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeopleService } from 'src/app/core/services/people/people.service';
import { IPagination } from 'src/app/shared/models/pagination.interface';
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
  totalCount=0;


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
   * Get people list
   */
  fetchList(page?:number, per_page?:number): void {
    this.peopleListErrorMsg = "";
    this.spinner.show();

    //Format observable data before consumption
    this.peopleListSubscription = this.peopleService.getPeopleList(page,per_page)
      .pipe(
        map(response => (
          {data:response.data.map((data: any) => new People(data.id, data.display_name, data.email_address, data.title)), 
          total_count: response.metadata.paging.total_count,
          current_page: response.metadata.paging.current_page})
        ),
      )
      .subscribe(res => {
        //Error exists
        this.elements = res.data;
        this.totalCount = res.total_count;
        this.currentPage = res.current_page;

      }, error => {
        console.log(error);
        this.peopleListErrorMsg = "Cannot connect to the Salesloft API. Please try again later";
      }, () => {
        this.spinner.hide();
      }
      );
  }

  /**
   * Update list based on pagination changes
   */
  updateList(paginationOptions : IPagination): void {
    this.fetchList(paginationOptions.page, paginationOptions.per_page);
  }

}
