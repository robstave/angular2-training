#  Sorting


We will finish off with a bootstrap radio button to indicate the sorting order of the 
chickens.

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


