import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { WikiComponent } from './wiki/wiki.component';
import { WikiserviceService } from './services/wikiservice.service';


@NgModule({
  declarations: [
    AppComponent,
    WikiComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [WikiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
