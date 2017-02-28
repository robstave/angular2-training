# Starting the project 

We will be touching on parts of angular2 while building a simple application. The project we are working on will be using
_angular-cli_ to build the project and [bootstrap](http://getbootstrap.com/) assist with the css.


So lets start this project in a similar manner as before with angular-cli and walk through the steps to integrate bootstrap as well.
 
Create a directory and check the angular cli version from bash/cygwin to make sure we have installed the module properly.

```bash
$ ng -v
angular-cli: 1.0.0-beta.26
node: 7.5.0
os: win32 x64
```

Looks like we are running. 
Create the new project using angular-cli and kick off the server to verify its running.


```bash
ng new my-app 
cd my-app
ng serve
```

## Install ng2-bootstrap and bootstrap

[Angular Bootstrap](https://valor-software.com/ng2-bootstrap/#/) is a package that helps us use the neat stuff that bootstrap has too offer.  Its not 
just a CSS library. There are some moving parts that require javascript to work. 
We want to abstract out as much of that as possible and make that functionality
work in the "Angular Way".  This package is written by the angular folks, so it should be pretty solid.



Install ng2-bootstrap locally from npm

```bash
npm install ng2-bootstrap bootstrap --save
```

So we have the bootstrap packages installed.  HOwever, there are a few loose ends that we need to address for 
the angular-cli project to play well with it. Luckily, the [project web page](https://github.com/valor-software/ng2-bootstrap/blob/development/docs/getting-started/ng-cli.md) has angular-cli specific notes.


The example given on the in their run through, has us adding the Alert module to the application.  Lets roll with that.


Open _src/app/app.module.ts_ and add

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


This points our angular-cli project to the bootstrap css. In angular1.x (or any JQuery project) you would have just added
this as a link in the index.htm.

It is done here because part of what angular-cli does is package up and serve the code.  It will, ultimately, still end up 
in index.html, but that is done behind the scenes.


Finally, add the alert to the app component template. Open _src/app/app.component.html_ and add

```html
<alert type="success">hello</alert>
```
This is how an alert is used.


Now kick off _ng serve_ if it is not going and open the browser to localhost:4200. You see the bootstrap alert.



# Chicken coop project
Everybody does the todo list.  We will riff off of that and do a project that is a chicken coop.

Here is a super rough sketch. There will be three components.  The main app, a chicken list and a chicken component.

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop.png "Coop")



## Bootstrap skeleton
We will not go too deep here into bootstrap at the moment. But since its installed, lets use it
to scaffold out the project a bit. Basically, bootstrap lays out items [in a grid](https://v4-alpha.getbootstrap.com/layout/grid/).
You have containers, rows and columns. Well will hardcode the html and classes to make this:
 

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop1snap.png "Coop")

The code, in _app.component.html_ is as follows.

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
This is just a static html page to get an idea of what we are looking at.
 

## Chicken list component

The chicken list will contain the list of chickens.  For now, the data will reside in this component as a simple list.

Either kill your ng-serve or use another bash for adding components.
 
```bash
$ ng generate component chicken-list
installing component
  create src\app\chicken-list\chicken-list.component.css
  create src\app\chicken-list\chicken-list.component.html
  create src\app\chicken-list\chicken-list.component.spec.ts
  create src\app\chicken-list\chicken-list.component.ts
  update src\app\app.module.ts
```
  
Cut the list template code from the app template and paste into the _chicken-list.component.html_

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
 
 And change your _app.component.html_ template to.
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

So all we did here was replace the html containing the chickens with the `<app-chicken-list></app-chicken-list>` component.

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

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop2snap.png "Coop")




[Page 2](page2.md)


