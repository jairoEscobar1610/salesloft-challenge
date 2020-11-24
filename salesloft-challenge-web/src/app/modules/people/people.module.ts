import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleTableComponent } from './components/people-table/people-table.component';
import { PeopleListComponent } from './pages/people-list/people-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [PeopleTableComponent, PeopleListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule { }
