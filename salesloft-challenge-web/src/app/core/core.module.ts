import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoggerService } from './services/logger.service';
import { ConsoleLoggerService } from './services/console-logger.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    HeaderComponent, FooterComponent, PageNotFoundComponent
  ],
  providers:[{ provide: LoggerService, useClass: ConsoleLoggerService }]
})
export class CoreModule { }
