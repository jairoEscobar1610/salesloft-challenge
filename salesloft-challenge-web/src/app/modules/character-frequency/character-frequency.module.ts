import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterFrequencyRoutingModule } from './character-frequency-routing.module';
import { CharacterFrequencyComponent } from './character-frequency.component';


@NgModule({
  declarations: [CharacterFrequencyComponent],
  imports: [
    CommonModule,
    CharacterFrequencyRoutingModule
  ]
})
export class CharacterFrequencyModule { }
