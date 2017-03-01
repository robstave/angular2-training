# Event Emitter
 
Directives and Components communicate to parent components via Emitter Events.
These are custom events, usually something like _click_ or _mousedown_.  They are declared as outputs of the 
child component and basically implement the [observer](https://en.wikipedia.org/wiki/Observer_pattern) pattern.

## Observer pattern

The basic observer pattern acts a little like twitter.  You have something that you subscribe to, like a subject.
When someone tweets, an event is broadcast on that subject, and it is sent to all the observers of that subject.

A more webapp-like case might be a "spinner" component for a shopping cart.  A component with a text value and a +/-
button for each item in the shopping list.  When you click on the button, or type in a value, we emit
to the parent the new value.

Angular1.x made use of this concept with the $scope.  You could communicate to other controllers (components)
that share the $scope by doing a $scope.broadcast() or a $scope.emit().  You could subscribe to those events with $scope.on();
Under the hood, this was used a lot as was how all the two way binding worked.  You did not have to know 
much about this, although, occasionally, you had to bump the $scope a bit to see changes you make.

Angular2 is more surgical. There is no scope, and you declare exactly what you are going to tell
parent components if needed.

## Small Plnkr example.

Here is a really simple example demonstrating the Emitter in action. 
Plnkr: https://plnkr.co/edit/rbzvzrW00loySV30Ie1j

see _app/app.subject.ts_

```typescript
import { Component,  OnInit, Input, EventEmitter  } from '@angular/core';

@Component({
  selector: 'my-button',
  
  //This is needed to let angular know that clickEvent can be emitted from the component
  outputs: ['clickEvent'],
  template: `<button (click)="clickButton()">{{name}}</button>`
})
export class SubjectComponent {
  
  //Sets the name from the input
   @Input() name: String;  
  
   count:number = 0;
   
   clickEvent: EventEmitter<number>;  
  
  //create the Event Emitter and save it
  constructor() {
    this.clickEvent = new EventEmitter(); 
   }
  
  //when the button is clicked, emit the event (with the count as $event)
   clickButton(name:string):void{
     this.count++;
     this.clickEvent.emit(this.count);     
  }
  
}
```


The parent sees the _clickEvent_ and binds accordingly.

```html
   <my-button name="red" (clickEvent)="incrCount('red', $event)"></my-button>
```



 

The basic steps are:

1. Specify outputs in the @Component configuration.
2. Create an [EventEmitter](https://angular.io/docs/ts/latest/api/core/index/EventEmitter-class.html) and set it to the output property.
3. Emit an event from the EventEmitter, when needed.

The subscribing part is all done automatically through the _@Component_ outputs configuration.

This is in a way similar to Angular1.x events. In 1.x you could use the scope to either scope.$emit or scope.$broadcast and then
register with scope.$on.  This no longer exists in that form.  And, as a note, it appears the the Event Emitter is really
only intended for components.  If you want to have subscription to events as a service, use Rxjs (will discuss later)

Further reading:
 * [Event Emitter in Angular.io](https://angular.io/docs/ts/latest/api/core/index/EventEmitter-class.html)
 * [Todd Motto tutorial](https://toddmotto.com/component-events-event-emitter-output-angular-2)



Back to the Chickens!
---------------------


## Add Event Emitter to the Chicken 

So lets emit an event from the chicken component indicating we would like to delete the chicken from the list.

The list is managed in the chicken-list component, so when a chicken is deleted, we
will emit that event up from the chicken component to the list.



```typescript
import { Component, OnInit, Input, 
         EventEmitter               //<--Added
		 } from '@angular/core';
import { Chicken } from './chicken.model';  

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  outputs: ['deleteEvent'],   //<--Added
  styleUrls: ['./chicken.component.css']
})
export class ChickenComponent implements OnInit {

 deleteEvent: EventEmitter<string> //<--Added

  @Input() chicken: Chicken; 

  constructor() {
    this.deleteEvent = new EventEmitter(); //<--Added
   }

  deleteChicken(name:string):void{
    this.deleteEvent.emit(name);    //<--Added
  }

  ngOnInit() {
  }

}
```

So we:
 * Imported EventEmitter
 * Added an output for the "deleteEvent"
 * Created the EventEmitter in the constructor (there are lots of ways folks do this)
 * Emit the event when click the delete button.
 
Modify the template for the button



```html
<div class="row">
    <div class="col-md-6">
        <label>Name:</label>{{chicken.name}}
    </div>
    <div class="col-md-4">
        <label>Breed:</label>{{chicken.breed}}
    </div>
    <div class="col-md-4">
        <label>Eggs:</label>{{chicken.eggs}}
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <span>
        <button (click)="deleteChicken(chicken.name)">Delete</button>
    </span>

    </div>
</div>
```

* Add a delete button to call the function in the component.



Now lets modify the chicken list component for the output.
We are listening for the delete event and handle it similar to the click event.
The name of the chicken is in the event

```html
  <div class="row">
    <div class="col-md-12">
      <ul class="list-unstyled">
        <li *ngFor="let chicken of chickens" >
            <app-chicken [chicken]="chicken"
                         (deleteEvent)="deleteChickenFromList($event)"
            ></app-chicken>
        </li>
      </ul>
    </div>
  </div>
```

* Bind the "deleteChicken" method (that resides in the chicken-list ) to the deleteEvent emitted from the chicken.






Implement the deleteChickenFromList. Lets just filter the list if found.

in chicken-list.component.ts
```typescript
  ...
  deleteChickenFromList(chickenName: string){  
      this.chickens = this.chickens.filter(
            (chicken) => !(chicken.name === chickenName)
      );
  }
  ...
```

For the actual delete function, we are really just filtering the list in the chicken component.
Note we are using the fat arrow function.



Clicking on the button, we should see the chicken being removed.



## Laying eggs
We are going to add one more event.  Chicken laying an egg.
There is no really new stuff here so it will be a quick walk though.



In chicken.model.ts add two functions that manage eggs. Add and Collect.

```typescript
    addEgg () {
        this.eggs++;
    }
    collectEggs() { 
	    let collected = this.eggs;
        this.eggs = 0;
		return collected;
    }
```

modify the button span in chicken.component.html for a few more functions.

```html
    <span class="pull-right">
        <button (click)="addEgg()">Lay eggs</button>
        <button (click)="collectEggs()">Collect</button>
        <button (click)="deleteChicken(chicken.name)">Delete</button>
    </span>
```


Modify the chicken.component.ts to make changes to the model and emit events

```typescript
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Chicken } from './chicken.model';   

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  outputs: ['deleteEvent', 'eggEvent'],   //<--added egg event
  styleUrls: ['./chicken.component.css']
})
export class ChickenComponent implements OnInit {

  deleteEvent: EventEmitter<string>
  eggEvent: EventEmitter<number>    //<--added

  @Input() chicken: Chicken; 

  constructor() {
    this.deleteEvent = new EventEmitter();
    this.eggEvent = new EventEmitter();  //<--added
  }

  deleteChicken(name: string): void {
    this.deleteEvent.emit(name)
  }


  addEgg() {    //<--added
    this.chicken.addEgg();  
    this.eggEvent.emit(null)
  }

  collectEggs() {  //<--added
       this.eggEvent.emit(this.chicken.collectEggs());
  }

  ngOnInit() {
  }

}
```


Bind eggEvent to the eggEvent function in the chicken-list component

```html 
<div class="row">
  <div class="col-md-12">
    <ul class="list-unstyled">
      <li *ngFor="let chicken of chickens">
        <app-chicken [chicken]="chicken" (eggEvent)="eggEvent($event)" 
        (deleteEvent)="deleteChickenFromList($event)"></app-chicken>
      </li>
    </ul>
  </div>
</div>
```




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

  eggs: number = 0;
  collectedEggs: number = 0;  //<--Added

  constructor() { 
 
    let lineup = new Array<Chicken>();

    lineup.push(new Chicken('Moneypenny'));
    lineup.push(new Chicken('Butterbean',2));
    lineup.push(new Chicken('Pickles', 3, 'Rhode Island Red'));
    lineup.push(new Chicken('Nugget'));
    this.chickens = lineup;
  }

  deleteChickenFromList(chickenName: string){     //<--modified
      console.log(`Chicken flew the coop: ${chickenName}`);

      this.chickens = this.chickens.filter(
            (chicken) => !(chicken.name === chickenName)
      );

      this.eggEvent(null);
  }

  eggEvent(collected: number){    //<--Added
       
      if (collected !== null){
           this.collectedEggs = this.collectedEggs + collected;
      }

      this.eggs = this.chickens.map(function(c){
        return c.eggs
      }).reduce((a, b) => a + b, 0);
      console.log("eggs:"+this.eggs)
   
  }

  ngOnInit() {  }

  public addChicken(newLilClucker:Chicken){
    this.chickens.push(newLilClucker);
  }

}

```

And finally, display the data in the Chicken-list template


```html
<div class="row">

  <div class="col-md-4">
   <label>Coop Stats</label>
   <div>Eggs:{{eggs}}</div>
   <div>Collected:{{collectedEggs}}</div>
  </div>
</div>

<br>

<div class="row">
  <div class="col-md-12">
    <ul class="list-unstyled">
      <li *ngFor="let chicken of chickens">
        <app-chicken [chicken]="chicken" (eggEvent)="eggEvent($event)" 
        (deleteEvent)="deleteChickenFromList($event)"></app-chicken>
      </li>
    </ul>
  </div>
</div>
```


This is a pretty good stopping point. There is a snapshot in the repo at this point
See chickencoop2.

Some interesting things to point out here.  
In this case, it would appear that adding emitting events can make your interfaces pretty complex.

This is a pretty small example, but even exploring this, it appears to me that events that 
interact with the view (think button clicks, hide/show, highlight ) are certainly best handled 
with events in the component, while things that interact with the data models my be better managed 
in a service.

Thoughts?  Discussion time:


## Two way binding

Angular 2 does not do two way binding directly, but if you can declare inputs and outputs...the two
together is roughly the same thing.

Angular.io has the best example here and I will just refer to it.  In it, they have a component that manages
a font size.  The parent component has the property _fontSizePx_.
The child component is..well..lets say its a "spinner" (a +/- kinda thing).
if the default font size is 18, we want to pass in "18" to be displayed, and as the values change we want to pass it back.

The event emitted is (sizeChange) and the template just binds the value back to the property in the parent.

```html
<my-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></my-sizer>
```

Angular2 has a syntax for this where you just combine the two into

```html
<my-sizer [(size)]="fontSizePx" ></my-sizer>
```
Known as the "box of bananas" syntax.

Here is a good link. 

 * https://angular.io/docs/ts/latest/guide/template-syntax.html#!#two-way

Where it really will come in handy is with ngModel in Forms. This will be discussed later









[Page 4](page4.md)
