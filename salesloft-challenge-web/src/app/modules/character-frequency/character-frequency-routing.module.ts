import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterFrequencyComponent } from './character-frequency.component';

const routes: Routes = [{ path: '', component: CharacterFrequencyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterFrequencyRoutingModule { }
