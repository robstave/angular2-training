# Starting the project 

We will be touching on parts of angular2 while building a simple application. The project we are working on will be using
angular-cli to build the project and bootstrap.

So lets start this project in a similar manner as before with angular-cli and walk through the steps to integrate boostrap as well.
 
Create a directory and check the angular cli version to make sure we have installed that properly.

```bash
$ ng -v

                             _                           _  _
  __ _  _ __    __ _  _   _ | |  __ _  _ __         ___ | |(_)
 / _` || '_ \  / _` || | | || | / _` || '__|_____  / __|| || |
| (_| || | | || (_| || |_| || || (_| || |  |_____|| (__ | || |
 \__,_||_| |_| \__, | \__,_||_| \__,_||_|          \___||_||_|
               |___/
angular-cli: 1.0.0-beta.26
node: 7.5.0
os: win32 x64
```

Fancy!  Looks like we are running. 
Create the new project using angular-cli and kick off the server to verify its running.


```bash
ng new my-app 
cd my-app
ng serve
```

## Install ng2-bootstrap and bootstrap

Angular Bootstrap is a package that helps us use the neat stuff that bootstrap has too offer.  Its not 
just a CSS library. There are moving parts that require code to work. Usually Jquery is used to take advantage of
these functions in a vanillaJs project.  We want to abstract out as much of that as possible and make that functionality
work in the "Angular Way".  This package 
is written by the angular folks, so its as Angular as its going to get.

The angular-bootstrap project is here:

https://github.com/valor-software/ng2-bootstrap/blob/development/docs/getting-started/ng-cli.md

install ng2-bootstrap locally.

```bash
npm install ng2-bootstrap bootstrap --save
```

So we have the bootstrap packages installed.  But there is a little work needed to have our 
project work with it.

Luckily, the [project](https://github.com/valor-software/ng2-bootstrap/blob/development/docs/getting-started/ng-cli.md) has angular-cli specific notes.

The example one the webpage has us adding the Alert module to the application.  Ok...lets roll with that


open src/app/app.module.ts and add

```typescript
import { AlertModule } from 'ng2-bootstrap';


@NgModule({
   ...
   imports: [AlertModule.forRoot(), ... ],
    ... 
})
```

So now we have imported the AlertModule and set up the configuration.

Open angular-cli.json and insert a new entry into the styles array

```typescript
      "styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
```


This points our angular-cli project to the css. It is done here because part of what angular-cli does is package up and serve
the code.  It will end up putting the css in index.html behind the scenes.


Add the alert to the page. Open src/app/app.component.html and add

```html
<alert type="success">hello</alert>
```
This is how an alert is used.


Now open the browser to 4200 and you see the bootstrap alert.



# Chicken coop project
Everybody does the todo list.  We will riff off of that and do a project that is a chicken coop.

Here is a super rough sketch. There will be three components.  The main app, a chicken list and a chicken.

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop.png "Coop")



## Bootstrap skeleton
We will not go too deep here into bootstrap at the moment. But since its installed, lets use it
to scaffold out the project a bit.
There is not a whole lot going on here with the bootstrap.  A container and two rows, one for the
input which we will populate later and one for the list.

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop1.png "Coop")

```html
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1>Coop</h1>
      <div class="row">
        <div class="col-md-8">
          <input type="text" class="form-control">
        </div>
        <div class="col-md-4">
          <button id="checkAll" class="btn btn-success">Add</button>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <ul class="list-unstyled">
        <li>
          <label>Chicken1</label>
        </li>
        <li>
          <label>Chicken2</label>
        </li>
        <li>
          <label>Chicken2</label>
        </li>
      </ul>
    </div>
  </div>
  
</div>
```
This is just a static html page to kinda get an idea of what we are looking at.
 

## Chicken list component

The chicken list will contain the list of chickens.  For now, the data will reside in this component as a simple list.

Either kill your ng-serve or use another bash for adding components.
 
$ ng generate component chicken-list
installing component
  create src\app\chicken-list\chicken-list.component.css
  create src\app\chicken-list\chicken-list.component.html
  create src\app\chicken-list\chicken-list.component.spec.ts
  create src\app\chicken-list\chicken-list.component.ts
  update src\app\app.module.ts

  
Cut the list template code from the app template and paste into the chicken-list.component.html

```html
    <div class="row">
    <div class="col-md-12">
      <ul class="list-unstyled">
        <li>
          <label>Chicken1</label>
        </li>
        <li>
          <label>Chicken2</label>
        </li>
        <li>
          <label>Chicken3</label>
        </li>
      </ul>
    </div>
  </div>
 ```
 
 And change your app.component.html template to.
 ```html 
  <div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1>Coop</h1>
      <div class="row">
        <div class="col-md-8">
          <input type="text" class="form-control">
        </div>
        <div class="col-md-4">
          <button id="checkAll" class="btn btn-success">Add</button>
        </div>
      </div>
    </div>
  </div>

  <app-chicken-list></app-chicken-list>

</div>
```

So all we did here was replace the html with the app-chicken-list component.

Make sure your ng serve is running and you should see the same page as you did before.

Looks the same.

## Chicken component

Lets move the chickens from static data into the chicken list component.

In the chicken-list.component.ts, lets create a _chickens_ property and fill it with some names.

```typescript 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chicken-list',
  templateUrl: './chicken-list.component.html',
  styleUrls: ['./chicken-list.component.css']
})
export class ChickenListComponent implements OnInit {

  chickens: string[];

  constructor() { 
    this.chickens = ['Moneypenny', 'Butterbean', 'Nugget', 'Pickles'];
  }

  ngOnInit() {
  }

}
```

We will use the ngFor directive that we had used earlier to loop through the chickens and
add that to the chicken-list template.


```html 
  <div class="row">
    <div class="col-md-12">
      <ul class="list-unstyled">
        <li *ngFor="let chicken of chickens" >
            <label>{{chicken}}</label>
        </li>
      </ul>
    </div>
  </div>
``` 

The value of the _*ngFor_ is "let chicken of chickens".  We see the _let_ first. Recall that is like the
_var_ but local, and in a loop. It references each item in the property chickens as a local variable.
It is scoped as well and you will not be able to reference chicken outside that directive.


## Chicken Component

So lets scaffold out the last component here...the chicken itself.

```bash
$ ng generate component chicken
installing component
  create src\app\chicken\chicken.component.css
  create src\app\chicken\chicken.component.html
  create src\app\chicken\chicken.component.spec.ts
  create src\app\chicken\chicken.component.ts
  update src\app\app.module.ts
```

We would like to pass in the value of the chicken into the chicken component so that each item can be rendered in the list.

Now lets add an @input annotation to the chicken component. This is really the same steps that we took in session one.
Import the input annotation so we can use the @input functionality.

```typescript
import { Component, OnInit, 
         Input  //<----Added
	} from '@angular/core';

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  styleUrls: ['./chicken.component.css']
})
export class ChickenComponent implements OnInit {

  @Input() chicken: string; // <-- added Input annotation

  constructor() { }

  ngOnInit() {
  }
}
```

Each time the Chicken component is created, the name property is set with the value that was passed in the directive.



Modify the chicken-list template to use the new component directive _app-chicken_.
We are using the square brackets again to note that we are passing in a reference to the chicken variable.

```html
  <div class="row">
    <div class="col-md-12">
      <ul class="list-unstyled">
        <li *ngFor="let chicken of chickens" >
            <app-chicken [chicken]="chicken"></app-chicken>
        </li>
      </ul>
    </div>
  </div>
``` 
  
And finally, the chicken.html template.

```
<label>{{chicken}}</label>
```
What we see is not too terribly different.

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop2.png "Coop")




[Page 2](page2.md)


