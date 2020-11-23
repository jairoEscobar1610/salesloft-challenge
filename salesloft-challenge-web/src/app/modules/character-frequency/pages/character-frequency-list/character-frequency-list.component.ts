import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PeopleService } from 'src/app/core/services/people/people.service';
import { CharacterFrequency } from 'src/app/shared/models/character-frequecy.model';

@Component({
  selector: 'app-character-frequency-list',
  templateUrl: './character-frequency-list.component.html',
  styleUrls: ['./character-frequency-list.component.scss']
})
export class CharacterFrequencyListComponent implements OnInit, OnDestroy, AfterViewInit {

  

  //DataTable data
  elements: Array<CharacterFrequency> = new Array<CharacterFrequency>();


  //Error label handling
  public errorMsg: string = "";

  //Subscriptions
  public characterFrequencySubscription?: Subscription;

  constructor(private spinner: NgxSpinnerService,
    private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.fetchFrequencies();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.characterFrequencySubscription!.unsubscribe();
  }

  /**
   * Get character frequency list
   */
  fetchFrequencies(): void {
    this.errorMsg = "";
    this.spinner.show();

    //Format observable data before consumption
    this.characterFrequencySubscription = this.peopleService.getCharacterFrequency()
      .subscribe(res => {
        //Error exists
        this.elements = res;

      }, error => {
        console.log(error);
        this.errorMsg = "Cannot connect to the API. Please try again later";
      }, () => {
        this.spinner.hide();
      }
      );
  }

}
