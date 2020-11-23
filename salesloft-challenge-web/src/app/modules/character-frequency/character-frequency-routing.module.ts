import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterFrequencyListComponent } from './pages/character-frequency-list/character-frequency-list.component';


const routes: Routes = [{ path: '', component: CharacterFrequencyListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterFrequencyRoutingModule { }
