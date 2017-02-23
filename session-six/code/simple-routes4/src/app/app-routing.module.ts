/**
 * Routing module to go with the root module.
 * Routing configuration goes here.
 **/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { TodosComponent } from './todos/todos.component';
import { AlbumsComponent } from './albums/albums.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserComponent ,
       children : [
      { path: "todos", component: TodosComponent},
      { path: "albums", component: AlbumsComponent},
      { path: "posts", component: PostsComponent},
    ]},

    { path: 'contactus', redirectTo: 'about' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }