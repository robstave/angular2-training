# Passing in data 


So we have this wonderful application, but it only handles static data at the moment.
How would we make it work with a more dynamic list of states?

What we need is a state component that has a name property.

Generate the _state_ component.


```bash
$ ng generate component usa/state
installing component
  create src\app\usa\state\state.component.css
  create src\app\usa\state\state.component.html
  create src\app\usa\state\state.component.spec.ts
  create src\app\usa\state\state.component.ts
  update src\app\app.module.ts
```

Lets modify the _state.component.ts_ to have an input


```typescript
import { Component, 
         OnInit, 
         Input // <-- Added
        } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styles: [`
   p {
    border-style: solid;
    border-color: yellow;
     }
  `]
})
export class StateComponent implements OnInit {

  @Input() name: string; // <-- added Input annotation

  constructor() { }

  ngOnInit() {
  }

}
```

and the corresponding _state.component.ts_ template as well.

```html
<p>
  {{name}} works! 
</p>
```
 
## One-time String initialization with @Input
The input will be used as part of the directive to create a state.

So..to pass it in, lets edit the USA template in _usa.component.html_

```html
<p>
  This is the USA component.
  <app-texas></app-texas>
  <app-pennsylvania></app-pennsylvania>
  <app-state name="Florida"></app-state>
</p>
```

We can now pass a name of Florida into the state component.

This is what is known as a one-time string initialization.

We use one-time string initialization to pass a string constant into a child component, but only once during start up. 
It is sending a string, so there really is no changes that can happen down the road.

So now when we run the app, we see Florida.

## Property binding

We can also bind component properties with the square brackets.

Lets modify the usa component some more

```javascript
// usa.component.ts
@Component({
  selector: 'app-usa',
  templateUrl: './usa.component.html',
  styleUrls: ['./usa.component.css']
})
export class UsaComponent implements OnInit {
  favorite = "California";
  others = ["Nevada", "Oregon", "Utah","Oklahoma"];
  constructor() { }

  ngOnInit() {
  }
}
```

if we change the input to a property binding, we get this:
```html
  <app-state [name]="favorite"></app-state>
```

and now we see California

## ngFor

One last change.  We will use the built in directive ngFor to loop over the values.
This allows us to add elements to the dom on the fly based on data in an array.

The syntax is :

```typescript
   *ngFor="let item of items"
```
Let _item_ defines the variable that we are using hold the value we are indexed to and _items_ is the property in the controller
that we are referencing.

We changed our usa component to have an _others_ property. This was a list of state names.
We can update our template to render this list of state components. To do this, we will use *ngFor, which
will iterate over a list of items and generate a new tag for each one. Here’s what our new template
will look like:


```html
<p>
  This is the USA component.
  <app-texas></app-texas>
  <app-pennsylvania></app-pennsylvania>
  <app-state [name]="favorite"></app-state>
  <app-state *ngFor="let stateName of others" [name]="stateName"></app-state>
</p>
```

This is similar to the ng-for loop in angular1.


Further Reading:

  * [Passing data into Angular 2+ components with @Input](https://toddmotto.com/passing-data-angular-2-components-input)

  
## Source Code
Included in this directory is the final version of the exercise.
Assuming you have typescript and angular cli installed, you should be able to just use npm update to use it.

 





