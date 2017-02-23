# Nested Child Routes

Nested routes are a new feature to the angular router.  
If you think about it, an ng2 app is really a nested collection of components.
The router allows you to nest the urls as well.

We have seen earlier where we can create components and pass in the id as an input to
the component.

If you had a component that displayed the eggs laid by a chicken, you could have

```html
<app-eggs [chicken]="chicken"></app-eggs>
```
But everything is so coupled and the child component depends on the parent having that chicken around.

Instead, what if we could just indicate in the url the chicken id and have routing set up so that
a certain path indicates the comoponent....any component.  Let the router figure it out and just use this over and over.

```html
<router-outlet></router-outlet>
```


You most certainly can have a url like _/ranchReport/chickens/33/eggs_ map to nested components like
 
```
[ ranchComponent [ chickensComponent [chickenComponent [ eggComponent]]]]
```

and then with a change of the url have _/ranchReport/cows/22/milkProduction map to

```
[ ranchComponent [ cowsComponent [cowComponent [milkComponent]]]]
```

Each token in the url can be mapped to a component, and each sub token to another component and the whole thing
rendered by just nesting router-output in each component template.

## Adding child routes to the application

Lets finish out this application with the other options availible in the json fake api.

We will make it so that when a user clicks on a user, the user data is there, but underneath you
can select the users todos, albums and posts.

The [Route](https://angular.io/docs/ts/latest/api/router/index/Route-interface.html) interface is defined as follows:

```typescript
interface Route {
  path : string
  pathMatch : string
  matcher : UrlMatcher
  component : Type<any> 
  redirectTo : string
  outlet : string
  canActivate : any[]
  canActivateChild : any[]
  canDeactivate : any[]
  canLoad : any[]
  data : Data
  resolve : ResolveData
  children : Routes   //<------ can add children
  loadChildren : LoadChildren
}
```

We can specify additional child routes as just a list of other routes.

For our example, lets use

```typescript
const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent },
 { path: 'about', component: AboutComponent },
 { path: 'users', component: UsersComponent },
 { path: 'user/:id', component: UserComponent,

    children : [
      { path: "todos", component: TodosComponent},
      { path: "albums", component: AlbumsComponent},
      { path: "posts", component: PostsComponent},
    ]
 },
 { path: 'contactus', redirectTo: 'about' },
 ];
```

So that /user/33/todo lists the todos specific to userId 33.
or /user/33/posts lists the uesrs posts.

In angular1.x with the classic router, you were stuck with one controller and you had to template out
any/all of the various parts with lots of ng-ifs.

With the new router. /user/33 renders the user template with its own router-output and what Angular puts into that output depends on the child token.

Lets build the components first.

```bash
ng generate component posts
ng generate component albums
ng generate component todos
```


Now lets tweek the *app-routing.module.ts* to point to the new components.

```typescript
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
```

So...we pretty much just added the child routes

Fix the *user.component.html* to add some links to the new child routes.
```html
<h2> User:{{user.name}}</h2>

<div>
  <div>Username:{{user.username}}</div>
  <div>Email:{{user.email}}</div>
  <div>Id:{{user.id}}</div>
  <div>Phone:{{user.phone}}</div>
</div>

<nav>
  <a [routerLink]="['todos']">Todos</a><br />
  <a [routerLink]="['albums']">Albums</a><br />
  <a [routerLink]="['posts']">Posts</a><br />

</nav>

<div style="border: 2px solid green; padding: 1rem;">
  <router-outlet></router-outlet>
</div>
```

Note: the router link is just "todos"  We do not want "/todos" or that would route to the absolute path of "/todos"
which is nowhere.  Since we are in the context of /user/333, clicking on the "todo" routerLink will navigate to /user/333/todos.

Assuming you used angular cli..clicking on todos will show

![Simple5](https://github.com/robstave/angular2-training/blob/master/session-six/images/simple5.png "Simple5")


Lets fill in the uesr data service

Recall that the API for todos is /users?userId=xxx







```typescript
import { Injectable, } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UserDataService {

  constructor(private http: Http, ) {
    this.http = http;
  }

  //Get users given a user Id
  getUser(id: string): Observable<any> {
    let userUrl = "http://jsonplaceholder.typicode.com/users/" + id;
    return this.http.request(userUrl);
  };

  //Get all users.
  getUsers(): Observable<any> {
    let userUrl = "http://jsonplaceholder.typicode.com/users";
    return this.http.request(userUrl);
  };

  getUserTodos(id: string): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', id);

    let userUrl = "http://jsonplaceholder.typicode.com/todos";
    return this.http.request(userUrl, { search: params });
  };

  getUserPosts(id: string): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', id);

    let userUrl = "http://jsonplaceholder.typicode.com/posts";
    return this.http.request(userUrl, { search: params });
  };

  getUserAlbums(id: string): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', id);

    let userUrl = "http://jsonplaceholder.typicode.com/albums";
    return this.http.request(userUrl, { search: params });
  };


}
```

Really not a whole lot extra here except new functions and search params.

We will fill out the Album component as an example and leave the other two as
an exercise for the reader

In 

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

 id: string = null;
  loading: boolean;
  data: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private userDataService: UserDataService) {
    this.route.parent.params.subscribe(params => {
      this.id = params["id"];
    });
  }

  makeRequest(id: string): void {

    //clear data and loading
    this.data = null;
    this.loading = true;

    //build request and subscribe to results.

    this.userDataService.getUserAlbums(id)
      .subscribe(res => {
        this.data = res.json();
        this.loading = false;
      });
  }

  ngOnInit() {
    this.makeRequest(this.id);
  }

}
```

The pattern should be pretty repetitive at this point with the imports and the contstructor and the service.

The only difference here is that if we were to get the "params" for this component...they would be empty.
The urls is parsed as "/user/33" and "album", so how are we to know what the user id is.

Luckily, the route is a tree.  We can get route.parent for the parents active route and find the parm from there.

```typescript
  this.route.parent.params.subscribe(params => {
      this.id = params["id"];
    });
```

The album.component.html is pretty standard.  We are just parsing the data to a table.

```html
<h2> Album list for userId:{{id}}</h2>
<div *ngIf="loading">loading...</div>
<table *ngIf="data">
  <tr>
    <th>Id</th>
    <th>Title</th>
  </tr>
  <tr *ngFor="let album of data">
    <td>{{album.id}}</td>
    <td>{{album.title}}</td>
  </tr>
</table>
```



![Simple6](https://github.com/robstave/angular2-training/blob/master/session-six/images/simple6.png "Simple6")
