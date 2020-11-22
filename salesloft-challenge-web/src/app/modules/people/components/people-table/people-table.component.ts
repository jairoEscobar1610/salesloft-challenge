import { Component, Input, OnInit } from '@angular/core';
import { mockPeopleList } from 'src/app/core/mockups/people-list.mockup';
import { People } from 'src/app/shared/models/people.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: People[] = mockPeopleList;


@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements OnInit {

  @Input()
  elements: Array<any> = new Array<any>();

  displayedColumns: string[] = ['email_address', 'name', 'job_role'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
    
  }

}
