import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DuplicatesPageComponent } from './pages/duplicates-page/duplicates-page.component';


const routes: Routes = [{ path: '', component: DuplicatesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuplicatesRoutingModule { }
