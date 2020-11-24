import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-character-frequency-table',
  templateUrl: './character-frequency-table.component.html',
  styleUrls: ['./character-frequency-table.component.scss']
})
export class CharacterFrequencyTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  elements: Array<any> = new Array<any>();

  displayedColumns: string[] = ['key', 'frequency'];
  dataSource = new MatTableDataSource(this.elements);
  @ViewChild(MatSort) sort?: MatSort;


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    // Assign sort function
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

  }

  public ngOnChanges(): void {
    // Update datatable data on API call
    this.setDataSource(this.elements);
  }

  /**
   * Set Datasource and configure datatable
   * @param elements People array
   */
  setDataSource(elements: any[]): void {
    this.dataSource.data = elements;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

}
