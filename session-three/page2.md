# Creating a Model

Angular cli has the ability to create classes.  This does require a little more hand holding.
Classes are only created in the app directory unless the target directory exists (unlike components)
and even though best practices seem to dictate that it should be `***.model.ts`, you have to specify that.

The only benefit to using angular-cli for classes that I see is that it will format the names
well and you can add testcase scaffolding.


Lets create our chicken class to use as a model.


```bash
$ ng generate class chicken/chicken.model
installing class
  create src\app\chicken\chicken.model.ts
```

Inspecting _chicken.model.ts_ we see:

```typescript
export class Chicken {
}
```

A little underwhelming.  No matter.  Lets populate this with some properties.

```typescript
export class Chicken {
    name: string;
    eggs: number;
    breed: string;

    constructor(name: string, eggs?: number, breed?: string) {
        this.name = name;
        if (eggs) {
            this.eggs = eggs;
        } else {
            this.eggs = 0;
        }
        if (breed) {
            this.breed = breed;
        } else {
            this.breed = "Leghorn";
        }

    }
}
```

We have three properties in the above class and are using the optional symbol ? in the signature as well to indicate optional parameters.

Lets initialize the chicken list with a few chickens below.

```typescript
import { Component, OnInit } from '@angular/core';
import { Chicken } from '../chicken/chicken.model';  //<--Added

@Component({
  selector: 'app-chicken-list',
  templateUrl: './chicken-list.component.html',
  styleUrls: ['./chicken-list.component.css']
})
export class ChickenListComponent implements OnInit {

  chickens: Chicken[];   

  constructor() { 
 
    let lineup = new Array<Chicken>();  //<--Added some init code

    lineup.push(new Chicken('Moneypenny'));
    lineup.push(new Chicken('Butterbean',2));
    lineup.push(new Chicken('Pickles', 3, 'Rhode Island Red'));
    lineup.push(new Chicken('Nugget'));
    this.chickens = lineup;
  }

  ngOnInit() { }
}
```

When the Chicken-List component is created, a few chickens are created in the constructor and added to the _chickens_ property of the
list component. Note that some of the chickens do not use all the property values.

## Inputs
So we have a list of chickens rather than just some strings. All that is needed to pass this data into the component
is to change the data types.



In _chicken.component.ts_, import the chicken model and change the property type

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Chicken } from './chicken.model';  //<--Added

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  styleUrls: ['./chicken.component.css']
})
export class ChickenComponent implements OnInit {
  @Input() chicken: Chicken; // <-- Changed to chicken

  constructor() { }

  ngOnInit() { }
}
```



We will render the chicken as a row with three columns.

```html
<div class="row">
    <div class="col-md-4">
        <label>Name:</label>{{chicken.name}}
    </div>
    <div class="col-md-4">
        <label>Breed:</label>{{chicken.breed}}
    </div>
    <div class="col-md-4">
        <label>Eggs:</label>{{chicken.eggs}}
    </div>
</div>
```

And now we have this:

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop3snap.png "Coop")

 

## Adding an item 

Lets edit the _app.component.html_.  Quite a bit! Mostly we are adding bootstrap stuff here.
We will handwave over the details for now and concentrate on the inputs and submit button.

What we want to do is to be able to add a name/breed and click 'submit' to add the item to the list.
We do this by adding an interaction event to the button element.

```html
<button type="submit" (click)="addChicken(newname, newbreed)"
        class="btn btn-primary">Submit</button>
```

By adding a `( )` around an event name, we can bind a function to that event.					  
The event name in this case is actually the native DOM event _click_.
There are many events you can choose from, although, not all DOM elements have all events, and sometimes not all
angular directives support the ones that could be there.  

In this case, a click event will call addChicken with local variables _newname_ and _newbreed_. These are local variables that will need 
to be declared.

On the input for name, we add _#newname_.  We use the hash _#_ to tell Angular to assign the tag to a local variable in the view.

This is one of the differences between Angular1.x and Angular2.  In Angular1.x, you could just declare variables in the
$scope or in the template and be able to go between the template and controller as they were connected by two-way binding.

Convenient, but slow. In Angular2, local variables declared with the hashtag are not visible in the component.


But we can two way bind variables to the controller if we have to.  More on that later

```html
<input type="text" class="form-control" id="name_id" 
       name="name_id"  #newname>
```					 

The final version of the _app.component.html_ template is:


```html
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1>Coop</h1>
      <div class="row">
        <div class="col-md-8">
          
          <form>
            <div class="form-group">
              <!-- Name field !-->
              <label for="name_id" class="control-label">Name</label>
              <input type="text" class="form-control" id="name_id" 
                     name="name_id"
                     #newname>
            </div>

            <div class="form-group">
              <!-- Breed field !-->
              <label for="breed_id" class="control-label">Breed</label>
              <input type="text" class="form-control" id="breed_id" 
                     name="breed_id"
                     #newbreed>
            </div>
            <div class="form-group">
              <!-- Submit button !-->
              <button type="submit"
                      (click)="addChicken(newname, newbreed)"
                      class="btn btn-primary">Submit</button>
            </div>
          </form>

        </div>
         
    </div>
  </div>

  <app-chicken-list></app-chicken-list>

</div>
```


![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop4snap.png "Coop")

In the_app.component.ts_, we will add the `addChicken()`  function.  Note that what we passed in was the variable reference
to the input.  So the input to the function is HTMLInputElement.

```typescript
  addChicken(name: HTMLInputElement, breed: HTMLInputElement): boolean {
    console.log(`Adding Chicken name: ${name.value} breed: ${breed.value}`);
    return false;
  }
```

We could have easily passed in 
 
 
```typescript
 (click)="addChicken(newname.value, newbreed.value)" 
```
and just used strings.
 
If you open up the console, you can see the data being sent to the function when submit is clicked.
 
 
## ViewChild
 
We saw earlier how we could pass data through the view with the square brackets.  We can also pass data to child components
by referencing them directly.  
 
In our case, our form is in the app component and the list is actually in the list component.  The ideal solution here
would be to have the list reside in a service outside the component list so that you could modify it from anywhere that
has access to the service. Then have components that need that data, subscribe to it.
We will do that too in a bit when we get deeper in Observables. 

But for now, lets try something that is not used in every
other todo list you find on the internet. It will give us a chance to talk about lifecycle hooks a bit as well.
 
The [view child](https://angular.io/docs/ts/latest/api/core/index/ViewChild-decorator.html) is really kind of a view query. It allows us to find components that are children of a parent component.
Since the component has a selector, its not a far stretch to consider this like using a jquery to find a child element.
But the way this is done, it does not feel like it.
 

 
Edit the _chicken-list.component.ts_ to add the function to add a chicken:
 
 
```typescript
import { Component, OnInit } from '@angular/core';
import { Chicken } from '../chicken/chicken.model'; 

@Component({
  selector: 'app-chicken-list',
  templateUrl: './chicken-list.component.html',
  styleUrls: ['./chicken-list.component.css']
})
export class ChickenListComponent implements OnInit {

  chickens: Chicken[]; 
  
  constructor() { 
 
    let lineup = new Array<Chicken>();

    lineup.push(new Chicken('Moneypenny'));
    lineup.push(new Chicken('Butterbean',2));
    lineup.push(new Chicken('Pickles', 3, 'Rhode Island Red'));
    lineup.push(new Chicken('Nugget'));
    this.chickens = lineup;
  }

  ngOnInit() {
 
  }

  public addChicken(newLilClucker:Chicken){   //<-------Added
    this.chickens.push(newLilClucker);
  }
}
```
 
Whats new here
 * Added a function to add a chicken to the list.
 
Now..for the big changes
in _app.component.ts_


```typescript
import { Component, 
         ViewChild, AfterViewInit             //<--Added
		 } from '@angular/core';

import { ChickenListComponent } from './chicken-list/chicken-list.component';   //<--Added
import { Chicken } from './chicken/chicken.model';    //<--Added

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(ChickenListComponent) chickenList: ChickenListComponent //<--Added

  ngAfterViewInit(){
        console.log('How many Chickens: ' + this.chickenList.chickens.length);
  }
 
  addChicken(name: HTMLInputElement, breed: HTMLInputElement): boolean {       //<--Added
    console.log(`Adding Chicken name: ${name.value} breed: ${breed.value}`);

    let newChicken:Chicken = new Chicken(name.value, 0, breed.value );
    name.value = '';  //clear text
    breed.value = ''; //clear text
 
    this.chickenList.addChicken(newChicken);
    return false;
  }

}
```

Changes made were
  * import the Chicken model
  * import ViewChild
  * import AfterViewInit
  * import ChickenListComponent
  * Added the @ViewChild annotation to the chickenList property
  * Added ngAfterViewInit method
  * upon submit, create a new chicken and add it to the chicken list.
 
The most interesting here is the _ngAfterViewInit_. This is what is known as a lifecycle hook. These can be added to a 
component to trigger code on all sorts of events. 

As a component is created, rendered, added to DOM, modified and destroyed, various lifecycle events are triggered.  

If the component has implemented the right functions, it can hear these events and act upon them.
 
The _constructor_ is always there by default, and is called for any class when it is created. 
It is really is not a ng hook, but the concept is the same.
 
There is also an _ngOnInit_. This is called much later on, when the component has been created and needs
to be initialized.

_ngAfterViewInit_ is called after Angular initializes the component's views and child views.
It is called once after the first _ngAfterContentChecked_.
 
The @ViewChild is like a input of sorts.  Once the Init view is done, our variable will
contain the child component with the specified selector.  If there is more than one selector, then
the first one will be there.
 
In addition, if the chicken-list changes, we will be alerted and can change it here as well.
 
[Read more about lifecycle hooks](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html) in the Angular IO docs.

 
 
So, to overview these changes:

* We added inputs with local variables that can be used by the component function that was bound to the _click_ event of the submit button.
* We added an addChicken method to the list of chickens
* We added a ViewChild Annotation to get a reference to the chicken-list child component so we could call its addChicken method.

If we did it all correct. The add will work.


* https://angular.io/docs/ts/latest/api/core/index/ViewChild-decorator.html
* http://learnangular2.com/viewChild/
 

At this point, we have a ![snapshot](https://github.com/robstave/angular2-training/blob/master/session-three/examples/chickcoop1 "code")
 of the code saved in the repo.
You should be able to run it with just _npm update_.


[Page 3](page3.md)
