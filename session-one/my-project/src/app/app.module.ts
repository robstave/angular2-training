import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UsaComponent } from './usa/usa.component';
import { TexasComponent } from './usa/texas/texas.component';
import { DallasComponent } from './usa/texas/dallas/dallas.component';
import { PennsylvaniaComponent } from './usa/pennsylvania/pennsylvania.component';
import { StateComponent } from './usa/state/state.component';

@NgModule({
  declarations: [
    AppComponent,
    UsaComponent,
    TexasComponent,
    DallasComponent,
    PennsylvaniaComponent,
    StateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
