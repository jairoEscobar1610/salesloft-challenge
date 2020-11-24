import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { mockPeopleList } from 'src/app/core/mockups/people-list.mockup';
import { IPagination } from 'src/app/shared/models/pagination.interface';
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

  @Input()
  totalCount = 0;

  @Input()
  currentPage = 0;

  @Output()
  updateList = new EventEmitter<IPagination>();

  displayedColumns: string[] = ['emailAddress', 'displayName', 'title'];
  pageSizeOptions: number[] = [10, 20, 25, 50, 100];
  dataSource = new MatTableDataSource(this.elements);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    // Assign paginator/sort functions
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }


    if (this.paginator) {
      this.paginator.page.subscribe((pageEvent: PageEvent) => {
        this.updateList.emit({ page: pageEvent.pageIndex + 1, per_page: pageEvent.pageSize });
      });
    }

  }

  public ngOnChanges(): void {
    // Update datatable data
    this.setDataSource(this.elements);
  }

  /**
   * Set Datasource ad configure datatable
   * @param elements People array
   */
  setDataSource(elements: any[]): void {
    this.dataSource.data = elements;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    setTimeout(() => {
      if (this.paginator) {
        this.paginator.length = this.totalCount;
        this.paginator.pageIndex = this.currentPage - 1;
      }

    });
  }


}
