import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PeopleService } from 'src/app/core/services/people/people.service';
import { People } from 'src/app/shared/models/people.model';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, OnDestroy, AfterViewInit {

  //DataTable data
  elements: Array<any> = new Array<any>();
  currentPage = 1;
  pages = 0;


  //Error label handling
  public peopleListErrorMsg:string = "";

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

  ngOnDestroy(){
    this.peopleListSubscription!.unsubscribe();
  }

  /**
   * Get url list
   */
  fetchList(): void {
    this.peopleListErrorMsg = "";
    //this.spinner.show();
    this.peopleListSubscription = this.peopleService.getPeopleList()
      .subscribe(res => {
        
        //Error exists
        this.elements = res.data;
        this.spinner.hide();
      }, error =>{
        this.peopleListErrorMsg = "Cannot connect to the Salesloft API. Please try again later";
      }
      );

  }

}
