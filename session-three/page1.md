


# Starting the project 
We are going to use bootstrap the first time around...so lets just bite the bullet and walk through
angular-cli and bootstrap



https://github.com/valor-software/ng2-bootstrap/blob/development/docs/getting-started/ng-cli.md

So create a directory and check the angular cli version.

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

## install ng2-bootstrap and bootstrap

Angular Bootstrap is a layer used to make use of all the neat stuff that bootstrap has too offer.  Its not 
just a CSS library. There are moving parts that require code to work. Usually Jquery is used to take avantage of
these functions in a vanilla project.  We want to abstract out as much of that as possible and make that stuff
work in the "Angular Way". Sometimes the "Angular Way" was to sweep the ugly code into a directive. This code 
is written by the angular folks, so its as Angular as its gonna get.

install ng2-bootstrap locallly.

```bash
npm install ng2-bootstrap bootstrap --save
```

moving along, the instructions on 

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

open angular-cli.json and insert a new entry into the styles array

```typescript
      "styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
```
open src/app/app.component.html and add

```html
<alert type="success">hello</alert>
```

now open the browser to 4200 and you see the bootstrap alert


# Chicken coop project
Everybody does the todo list.  We will riff off of that and do a project that is a chicken coop.

Here is a super rough sketch. There will be the main app, a list and a 
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
          <input type="text" class="form-control add-todo" placeholder="Add todo">
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
      <div>

      </div>
    </div>
  </div>

</div>
```
 



	 