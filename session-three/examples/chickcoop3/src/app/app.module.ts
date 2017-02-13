import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {AlertModule} from 'ng2-bootstrap';
import { ChickenListComponent } from './chicken-list/chicken-list.component';
import { ChickenComponent } from './chicken/chicken.component';

import {ButtonsModule} from 'ng2-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    ChickenListComponent,
    ChickenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
