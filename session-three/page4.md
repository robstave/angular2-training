#  Sorting


We will finish off with:a bootstrap button to sort the chickens by eggs or name.  Then
a quick look at some of the other ng directives like ng-if, ng-switch, ng-class and ng-style.
 

in our app.module.ts, we add the ButtonsModule as an import (in two places)

The api for this is here:
https://valor-software.com/ng2-bootstrap/#/buttons


```typescript
...
import {ButtonsModule} from 'ng2-bootstrap'; //<-added
...

...
@NgModule({
  declarations: [
    AppComponent,
    ChickenListComponent,
    ChickenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot() //<-added
  ],
  ...
})
export class AppModule { }

```

Now Lets add the buttons to the chicken list for now.
The format is:
```html
<div class="btn-group">
      <label class="btn btn-success" [(ngModel)]="sortChickensOrder" btnRadio="name" uncheckable>Name</label>
      <label class="btn btn-success" [(ngModel)]="sortChickensOrder" btnRadio="eggs" uncheckable>Eggs</label>
    </div>
```
The Classes are there for formating.  The main thing to look at is the [(ngModel))]. That is our two
way binding in action.  The Property _sortChickensOrder_ exists in the Chicken-list component. That is the
model. If the model is changed, (that is the string value is changed from "eggs" to "name") then it gets
passed into the radio button and vise versa.

Also, we changed the ngFor loop.

```html
   <li *ngFor="let chicken of peckingOrder()">
```
So now we are getting the chickens from a function and not just a property.

The full listing for chicken-list.component.html is:

```html
<div class="row">

  <div class="col-md-4">
    <label>Coop Stats</label>
    <div>Eggs:{{eggs}}</div>
    <div>Collected:{{collectedEggs}}</div>
  </div>

  <div class="col-md-4">
    <div class="btn-group"> 
      <label class="btn btn-success" [(ngModel)]="sortChickensOrder" btnRadio="name"  >Name</label>
      <label class="btn btn-success" [(ngModel)]="sortChickensOrder" btnRadio="eggs"  >Eggs</label>
    </div>
  </div>

</div>

<br>

<div class="row">
  <div class="col-md-12">
    <ul class="list-unstyled">
      <li *ngFor="let chicken of peckingOrder()">
        <app-chicken [chicken]="chicken" (eggEvent)="eggEvent($event)" (deleteEvent)="deleteChickenFromList($event)"></app-chicken>
      </li>
    </ul>
  </div>
</div>

```


We will add the radio button model to the component and use it to the return the list of chickens...sorted.

```typescript
...
  sortChickensOrder: string = "name";
...

... 
  peckingOrder(): Chicken[] {
    if (this.sortChickensOrder == "eggs")
      return this.chickens.sort((a: Chicken, b: Chicken) => b.eggs - a.eggs);

    if (this.sortChickensOrder == "name")
      return this.chickens.sort((a: Chicken, b: Chicken) => b.name < a.name ? 1 : -1);

    return this.chickens;
  }
...
```


# Other Ng Directives

## NgIf
NgIf is used to show/hide dom elements based on the condition that pass to the directive.
The condition is evalutated as true or false.

The nice thing here is that the condition is evaluated as truthy. 
And is very forgiving.  Checking something like a.b.c will not crash if a or a.b is undefined.

It is the same as ng-if in angular1.x.  Note there is no ng-show equivalent. (this was like ng-if, but did not
remove the element from the DOM, only hid it).


```html
<div *ngIf="false"></div> <!-- never displayed -->
<div *ngIf="a > b"></div> <!-- displayed if a is more than b -->
<div *ngIf="str == 'yes'"></div> <!-- displayed if str holds the string "yes" -\
<div *ngIf="showMe()"></div> <!-- displayed if fx returns true -\

```

## NgSwitch
Similar to ngIf, but is used for more complex logic. Used in a means similar to a javascript switch.

The ngSwitchDefault is optional.  It will show if none of the previous statements are active.
Mote than one ngSwitchCase can be active as well.

```html
<div class="container" [ngSwitch]="myVar">
  <div *ngSwitchCase="'A'">Var is A</div>
  <div *ngSwitchCase="'B'">Var is B</div>
  <div *ngSwitchDefault>Var is something else</div>
</div>
```

## ngStyle 
Allows you to set css properties based on an expression.

```html
<div [style.background-color]="'yellow'">
  Uses fixed yellow background
</div>
```

```html
<div [ngStyle]="{color: 'white', 'background-color': 'blue'}">
   Uses fixed white text on blue background
</div>
```

```html
<div>
  <span [ngStyle]="{color: color}">
  {{ color }} text 
  </span>
</div>
```

## ngClass
Similar to the ngStyle in that you can add a css class to the element of the dom.  

## Example

We can tweek the coop code a little here.
Lets highlight some thresholds.

in the chicken.component.css we will add to css classes

```css
.bordered1 {
 background-color: lightgreen;
}

.bordered2 { 
 background-color: lightpink;
}
```

In the Chicken template, we will add either the border1 or border2 class to a container div.
In addition, hide the eggs label and count if there are no eggs.
 

```html
<div [ngClass] = "chicken.eggs > 4 ? 'bordered1' : 'bordered2' ">
<div class="row">
    <div class="col-md-6">
        <label>Name:</label>{{chicken.name}}
    </div>
    <div class="col-md-4">
        <label>Breed:</label>{{chicken.breed}}
    </div>
    <div class="col-md-4" *ngIf="chicken.eggs > 0">
        <label>Eggs:</label>{{chicken.eggs}}
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <span class="pull-right">
            <button (click)="addEgg()">Lay eggs</button>
            <button (click)="collectEggs()">Collect</button>
            <button (click)="deleteChicken(chicken.name)">Delete</button>
        </span>
    </div>
</div>
</div>
```

In the Chicken list template, we can change the color based on the number of eggs.

```html
  <div class="col-md-4">
    <label>Coop Stats</label>
    <div [ngStyle]="eggs > 5 ? {color:'green'} : {color:'blue'}">Eggs:{{eggs}}</div>
 

    <div>Collected:{{collectedEggs}}</div>
  </div>
```  

Here is a snapshot with a low egg count

![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop5snap.png "Coop")

And here is after with the three changes


![Coop](https://github.com/robstave/angular2-training/blob/master/session-three/images/coop6snap.png "Coop")


