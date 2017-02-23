import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {  LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserDataService } from './services/user-data.service';
 

import { AppRoutingModule }     from './app-routing.module';
import { AlbumsComponent } from './albums/albums.component';
import { TodosComponent } from './todos/todos.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UsersComponent,
    UserComponent,
    AboutComponent,
    AlbumsComponent,
    TodosComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule // <-- routes
  ],
  providers: [ UserDataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
