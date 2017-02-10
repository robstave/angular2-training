# Starting the project 
The project we are working on will be using bootstrap to start with.
So we will start this project with angular-cli and walk through the steps to integrate boostrap as well.
 
So create a directory and check the angular cli version to make sure we have installed that properly.

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

Fancy!  Beta >24 is good for now.

```bash
ng new my-app 
cd my-app
ng serve
```

## Install ng2-bootstrap and bootstrap



Angular Bootstrap is a layer used to make use of all the neat stuff that bootstrap has too offer.  Its not 
just a CSS library. There are moving parts that require code to work. Usually Jquery is used to take avantage of
these functions in a vanilla project.  We want to abstract out as much of that as possible and make that stuff
work in the "Angular Way". Sometimes the "Angular Way" was to sweep the ugly code into a directive. This code 
is written by the angular folks, so its as Angular as its gonna get.

The angular-bootstrap project is here:
https://github.com/valor-software/ng2-bootstrap/blob/development/docs/getting-started/ng-cli.md

install ng2-bootstrap locallly.

```bash
npm install ng2-bootstrap bootstrap --save
```

So we have the bootstrap packages installed.  But there is a little work needed to have our 
project work with it.

Luckily, the project has angular-cli specific notes.
https://github.com/valor-software/ng2-bootstrap/blob/development/docs/getting-started/ng-cli.md

has us adding the Alert module to the application.  Ok...lets roll with that


open src/app/app.module.ts and add

```typescript
import { AlertModule } from 'ng2-bootstrap';


@NgModule({
   ...
   imports: [AlertModule.forRoot(), ... ],
    ... 
})
```

This allows our project to import an Alert.

open angular-cli.json and insert a new entry into the styles array

```typescript
      "styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
```


This points to the css.

open src/app/app.component.html and add

```html
<alert type="success">hello</alert>
```
This is how an alert is used.


Now open the browser to 4200 and you see the bootstrap alert


# Chicken coop project
Everybody does the todo list.  We will riff off of that and do a project that is a chicken coop.

Here is a super rough sketch. There will be the main app, a list and a chicken eventually.

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/coop.png "Coop")


## Bootstrap skeleton
We will not go too deep here into bootstrap at the moment. But since we have gotten it installed, lets
use it.
There is not a whole lot going on here with the bootstrap.  A container and two rows, one for the
input which we will populate later and one for the list.

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/coop1.png "Coop")

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



 
 

## Chicken list.



create a list 

Either kill your ng-serve or use another bash for adding components.

	 
$ ng generate component chicken-list
installing component
  create src\app\chicken-list\chicken-list.component.css
  create src\app\chicken-list\chicken-list.component.html
  create src\app\chicken-list\chicken-list.component.spec.ts
  create src\app\chicken-list\chicken-list.component.ts
  update src\app\app.module.ts

  
Cut the listing html from the app template into chicken-list.component.html

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
          <label>Chicken2</label>
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


Make sure your ng serve is running and you should see the same page as you did before.


Lets move the chickens into the component as data.
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

Use the ngFor directive that we had used earlier to loop through the chickens and
add that to the chicken-list template.
The value is "let chicken of chickens".  We see the let first, thats like the
var but local, and in a loop. It references each item in the property chickens as a local variable.
It is scoped as well and you will not be able to reference chicken outside that directive.

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


## Creating the chicken

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

Now lets add an input to the chicken component. This is really the same steps that we took in session one.
Import the input annotation so we can use the @input functionality.

```typescript
import { Component, OnInit, Input } from '@angular/core';

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








