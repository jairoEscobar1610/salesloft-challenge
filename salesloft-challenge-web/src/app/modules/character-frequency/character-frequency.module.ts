import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterFrequencyRoutingModule } from './character-frequency-routing.module';
import { CharacterFrequencyListComponent } from './pages/character-frequency-list/character-frequency-list.component';
import { CharacterFrequencyTableComponent } from './components/character-frequency-table/character-frequency-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [CharacterFrequencyListComponent, CharacterFrequencyTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    CharacterFrequencyRoutingModule
  ]
})
export class CharacterFrequencyModule { }
