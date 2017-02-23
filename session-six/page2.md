# Routing Module

In the Angular.io docs, there is a section  [Router Modules](https://angular.io/docs/ts/latest/guide/router.html#!#why-routing-module)

Bascially, our root ngModule is getting pretty busy and routing is taking a good part of that.
Really we can separate that out a bit, particularly if we think the application is going to get 
rather large.

> The Routing Module replaces the routing configuration in the root or feature module. Either configure routes in the Routing Module or within the module itself but not in both.
> 
> The Routing Module is a design choice whose value is most obvious when the configuration is complex and includes specialized guard and resolver services. It can seem like overkill when the actual configuration is dead simple.
> 
> Some developers skip the Routing Module (e.g., AppRoutingModule) when the configuration is simple and merge the routing configuration directly into the companion module (e.g., AppModule).

So do we need to do this?  It sounds like its up to you, but if you have more that a simple app, its probibly not a bad idea.


They do a refactor in the [Tour of Heros example](https://angular.io/docs/ts/latest/tutorial/toh-pt5.html), lets try that here.


Create a new file called *app-routing.module.ts*


```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'contactus', redirectTo: 'about' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```

Since we are exporting the RouterModule, we should be able to acccess it in other feature modules down the road.
Plus, this is imported into app.module.ts, so we can remove the imports from the main module and they still
will be availible.



*app.module.ts*

```typescript
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

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule // <-- routes
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Basically we import AppRoutingModule and strip out the routing stuff.

Viola, refactoring done.



# Adding a service 

Lets add some more functionality.  The json api also provides todos, albums and posts and can filter the results based on queries.

For example:

```bash
GET	/posts?userId=1
```

We would like to add this functionality, but we have already copy/pasted that html code once. Lets refactor that while we are on a role.


We will create the service to hold all the http stuff.  The steps will [look similar to the tour of heros](https://angular.io/docs/ts/latest/tutorial/toh-pt4.html)

```bash
mkdir services
ng generate services/userData
```


```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService {

  constructor() { }

}
```

Pretty empty at the moment.  Note the _@Injectable()_.  

Services in Angular are provided by [Dependancy Injection](https://angular.io/docs/ts/latest/guide/dependency-injection.html).
The dependency comes from another source and can be declared on the fly. Behind that decorator is more code than we care to look at.

Think about it, we will be needing the HTTP module, but we could be depending on any number of other services.
Rather than declare that out, we will let angular figure it out.

> The consumer of an injected service does not know how to create that service. It shouldn't care. It's the dependency injection's job to create and cache that service.
>
> Sometimes a service depends on other services ... which may depend on yet other services. Resolving these nested dependencies in the correct order is also the framework's job. At each step, the consumer of dependencies simply declares what it requires in its constructor and the framework takes over.
 
  See: [Dependecy Injection Cookbook](https://angular.io/docs/ts/latest/cookbook/dependency-injection.html)

So later, we can declare this in our providers and it will be created for us as Angular sees fit.
We usually will be using the injection to use just our services, but it is also a critical 
feature for testing where we can mock out the services either in production or in testing.


Angular1.x relied on dependancy injection as well and had a similar approach.

Useful Links:

 * https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html



Lets fill in our service.  This is _/services/user-data.service.ts_


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
}
```

And thats our service. We are returning Observables, so the components can subscribe to the
data as needed.  



In *app.modules.ts* we add

```typescript
import { AppRoutingModule }     from './app-routing.module';
...
 providers: [ UserDataService ],
```

So at this point, the service is availible for all the components.



now in *user.component.ts* here is all the code.

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data.service';   //<-- Added

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Object;
  loading: boolean;
  id: string;

  constructor(private route: ActivatedRoute, private userDataService: UserDataService) {   //<-- Modified
    route.params.subscribe(params => { this.id = params['id']; });
  }

  makeRequest(id: string): void {

    //clear data and start loading
    this.user = "";
    this.loading = true;

    //build request and subscribe to results.

    this.userDataService.getUser(id)
      .subscribe(res => {
        this.user = res.json();
        this.loading = false;
      });
  }

  ngOnInit() {
    this.makeRequest(this.id)
  }

}


```

We have cleaned this up a LOT. 

* Added the import
* Added the service in the constructor
* The service is NOT availible to use in the constructor.  We can refer to it, but should not be called until _ngOnInit()_


Lets apply the same approach to the users component.


The *users.component.ts* is as follows.


```typescript
import { Component, OnInit, } from '@angular/core';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private userDataService: UserDataService) {
  }

  makeRequest(): void {

    //clear data and start loading
    this.data = "";
    this.loading = true;

    //build request and subscribe to results.

    this.userDataService.getUsers()
      .subscribe(res => {
        this.data = res.json();
        this.loading = false;
      });
  }


  ngOnInit() {
    this.makeRequest()
  }

}
```


At this point, there is a snapshot as well.  See simple-route3 in code.


[Page 3](page3.md)



