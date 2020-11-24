import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';

import { DuplicatesRoutingModule } from './duplicates-routing.module';
import { DuplicatesPageComponent } from './pages/duplicates-page/duplicates-page.component';


@NgModule({
  declarations: [DuplicatesPageComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    DuplicatesRoutingModule
  ]
})
export class DuplicatesModule { }
