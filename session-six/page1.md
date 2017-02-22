# Routing

Routing is basically the ability to focus the application to a specific component
using the browsers url. By being able to manipulate the URL without forcing a reload,
we can manage the page state as well as take advantages of browser features like
history and linking.

In the beginning of SPA (Single Page Apps), they used the [hashtag](http://blog.mgm-tp.com/2011/10/must-know-url-hashtechniques-for-ajax-applications/) locator to trick the
browser into switching around the application without really causing a reload.  Going
to a url with the app might look like.

```
http://greatness.com/index.html/#
```

and subsequent states might look like

```
http://greatness.com/index.html/#/about
```

```
http://greatness.com/index.html/#/user?id=3&view=simple
```

Now we have state we can go to anytime.  We can enforce permissions per route if we have to
and use built in broswer features like bookmarking and refresh.

This is how angular does it as well out of the box (there are other routers you could have used.)

Older browsers did not handle the histories so wel though and requiered an http request of some kind
to trigger a change in state.

With HTML5, browsers can now manage its histories without requests.  To utilize this, you need a modern
broswer, and a server that can support HTML5 based routing.


The three main items you need for routing are:

 * *Routes* to map the url routes to the components (or redircts)
 * *RouterOutlet* as a component (like app-root) to render the specified component.
 * *RouterLink* directive to specify the links that will go to the router (like href)
 

Start out the project with angular-cli.

```bash
ng new simple-routes 
cd simple-routes
```

We will create a small app to demonstrate routing tha has 3 routes.  Home, about and users.

Inspecting app.module.ts we see the http and forms are there...but no router. 
In addition, router support was removed from angular-cli, so we will be doing this ourselves.

_This may change, but the router was still under so much development that they removed it for now_



So, its probibly better to create our components first

```bash
ng g component home
ng g component about
ng g component users

```


```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {  RouterModule,  Routes } from '@angular/router';  //<---added
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent },
 { path: 'about', component: AboutComponent },
 { path: 'users', component: UsersComponent },
 { path: 'contactus', redirectTo: 'about' },
 ];

 
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


So we have added the route imports and a constant object that specifies our routes.
We have added the Routes to the imports (with forRoot pointing to the root set of routes, this is done only once).

The "" path will be our default path.

In routes:
  * _path_ specifies the the URL substring that the route applies to
  * _component_ specifies the componet that the route maps to
  * _redirect_ is optional. It is better to redirect to a route than map a new one 


Now, lets look at app.component.html

```html
<div>
  <nav>
    <a>Navigation:</a>
    <ul>
      <li><a [routerLink]="['home']">Home</a></li>
      <li><a [routerLink]="['about']">About</a></li>
      <li><a [routerLink]="['users']">Users</a></li>
    </ul>
  </nav>

  <router-outlet></router-outlet>
</div>
```

In the template we have two things that are new.
There is a _routerLink_ directive.  Think of this as a sort of href to tell the browser what url to send to the router.
Note that it is a list. Our link is the first item in that list.

There is also the <router-outlet> component.  The component specified in the route will be replaced here.

This is how things are generally laid out in angular with a shell view handling navigation and a router-outlet
where the view is rendered.

In addition, angular2 router supports child routes, so that subroutes and sub outlets can be embedded. 

For now though, lets just _ng serve_ and see our appliation in action


![Simple](https://github.com/robstave/angular2-training/blob/master/session-six/images/simple1.png "Simple1")

There are three links and each routes to a different component.


# Adding Http


So, lets add HTTP to this. Recall the json fake api?  We will use that.
This one will go pretty fast.

Paste this into users.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private http: Http) {
    this.http = http;
  }

  onError = function (e) {
    console.log("error", e);
  }

  //called unconditionally
  onComplete = function (url) {
    console.log("Completed:" + url);
  }

  makeRequest(id: number): void {

    //clear data and loading
    this.data = "";
    this.loading = false;

    let usersUrl = "http://jsonplaceholder.typicode.com/users"
    if (id) {
      usersUrl = usersUrl + "/" + id;
    }


    //start loading
    this.loading = true;

    //build request and subscribe to results.

    this.http.request(usersUrl)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)
      );
  }

  ngOnInit() {
    this.makeRequest(null)
  }

}
```
This is the same code basically as session 5.  We imported the HTTP module
so we can query the users url at jsonplaceholder.typicode.com.

When we init the component, we make the request (recall the old code could take 
a user id or null to show all users.) Results are placed in data.


 Edit users.component.html

```html
<h2>Users</h2>


<div *ngIf="loading">loading...</div>

<table>
  <tr>
    <th>Name</th>
    <th>Username</th>
    <th>email</th>
  </tr>
  <tr *ngFor="let user of data">
    <td>{{user.name}}</td>
    <td>{{user.username}}</td>
    <td>{{user.email}}</td>
  </tr>
</table>
```

We are using the ngFor directive to loop over the users and print them in the table.


![Simple2](https://github.com/robstave/angular2-training/blob/master/session-six/images/simple2.png "Simple1")

 
## Show a single user

Lets add another route to display a single user.  We would like it to display the 
user when we click on the routeLink with the users id.

Create another component.


```bash
ng generate component user
```

Edit *app.module.ts*
We should see the import of the UserComponent taken care of for us by angular-cli

```bash
const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent },
 { path: 'about', component: AboutComponent },
 { path: 'users', component: UsersComponent },
 { path: 'user/:id', component: UserComponent },
 { path: 'contactus', redirectTo: 'about' } ];

```

We will add the route with _:id_ to indicate that we will be passing the id in the route.


In the *users.component.html* template, we need to add the routerLink to point to the users
component.

```html
<table>
  <tr>
    <th>Name</th>
   <th>Username</th>
   <th>email</th>
 </tr>
    <tr *ngFor="let user of data">
        <td><a [routerLink]="['/user/'+user.id]">{{user.name}}</a></td>
        <td>{{user.username}}</td>
        <td>{{user.email}}</td>
    </tr>
</table>
```

Note that we are using "/user" rather than "user".  This is because if we do not specify the root (or relative path)
it will route to something like /users/user/3. The router can be pretty flexable.
We want the page to go to "user".


*user.component.ts* is pretty close to the users component. You can paste it all in.

```html
import { Component, OnInit } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Object;
  loading: boolean;
  id: string;

  constructor(private http: Http, private route: ActivatedRoute) {
    this.http = http;
    route.params.subscribe(params => { this.id = params['id']; });
  }

  onError = function (e) {
    console.log("error", e);
  }

  //called unconditionally
  onComplete = function (url) {
    console.log("Completed:" + url);
  }

  makeRequest(id: string): void {

    //clear data and loading

    this.user = "";
    this.loading = false;

    let usersUrl = "http://jsonplaceholder.typicode.com/users"
    if (id) {
      usersUrl = usersUrl + "/" + id;
    }


    //start loading
    this.loading = true;

    //build request and subscribe to results.

    this.http.request(usersUrl)
      .subscribe((res: Response) => {

        this.user = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)
      );
  }


  ngOnInit() {
    this.makeRequest(this.id)
  }

}
```

and finally the *user.component.html* template

```html
<h2> User:{{user.name}}</h2>

<div>
  <div>Username:{{user.username}}</div>
  <div>Email:{{user.email}}</div>
  <div>Id:{{user.id}}</div>
  <div>Phone:{{user.phone}}</div>
</div>
```



![Simple3](https://github.com/robstave/angular2-training/blob/master/session-six/images/simple3.png "Simple4")
![Simple4](https://github.com/robstave/angular2-training/blob/master/session-six/images/simple4.png "Simple4")



