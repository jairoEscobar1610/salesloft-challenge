import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { mockPeopleList } from 'src/app/core/mockups/people-list.mockup';
import { People } from 'src/app/shared/models/people.model';

const ELEMENT_DATA: People[] = mockPeopleList;


@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  elements: Array<any> = new Array<any>();

  displayedColumns: string[] = ['email_address', 'display_name', 'title'];
  dataSource = this.elements;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
  }

  public ngOnChanges(): void {
    //Update datatable data
    this.setDataSource(this.elements);
 }

  setDataSource(elements : any[]) : void{
    this.dataSource = elements;
  }


}
