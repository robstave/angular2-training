# Reactive Forms

From this point on we will be using the reactive-fm component to write examples.

first, we need to include the reactive forms module into our project.
You can have both, but you can only use one per form.

In app.module.ts

```typescript
...
import { ReactiveFormsModule } from '@angular/forms';
...
 
@NgModule({
  ...
  imports: [
  ...
    ReactiveFormsModule,
  ...
  ],
``` 

Reactive forms do not use things like _ngModel_ or template directives like _requires_.
There is still a FormGroup(s) and FormControls, but they are defined in the component and 
then bound to the template rather than having the template define the form controls. 

This allows us a much higher degree of flexibility. We can even have things that are not
in the form, or not in the form to start with for dynamic forms.   


The reactive forms module gives us the directives _formControl_ and _ngFormGroup_.

While..gramatically we had form controls and form groups in the template form, we
used the ngForm in the form element to tell angular to build everything behind
the scenes for us.

In reactive forms, we build are own FormControl and FormGoups and then we bind 
them the other way to the form via [formControl] and [formGroup].


Lets start out with our base form.  Paste into reactive-fm.html


```html
<div class="row">
  <div class="md-col-12">
    <form novalidate>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" placeholder="first name">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" placeholder="Your email address">
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" placeholder="(xxx) xxx-xxxx">
      </div>

      <button type="submit">Sign up</button>
    </form>
  </div>
</div>
```

There is nothing in here yet..just a form. (although..technically, behind the scenes, since we have FormsModule included, it 
is treating the form element as a template.  But lets ignore that for now.

Also, to confuse things, there is a "form-control" class in the bootstrap. This is really only bootstrap for now, so ignore that.

Create another user interface in the reactive directory.
We are using the same form, but might change things up later.


```typescript
export interface User {
  name: string;
  phone: string;
  email: string;
}
```

## Form Builder.
One of the things we use in reactive forms is the Form builder.
We have to build our groups ahead of time.

this can be done with the Objects themselves.

```typescript
this.myGroup = new FormGroup({
    name: new FormControl('Fred'),
    phone: new FormControl('333-333-3333'),
	email: new FormControl('right@said.fred.com')
  });
```
  
Or we can use the [Form Builder](https://angular.io/docs/ts/latest/api/forms/index/FormBuilder-class.html)

The form builder helps us build up the data structure a little easier.
This is imported into our component and injected as needed.





Populate the reactive-fm.component.ts with the following.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import {User} from './user.interface'


@Component({
  selector: 'app-reactive-fm',
  templateUrl: './reactive-fm.component.html',
  styleUrls: ['./reactive-fm.component.css']
})
export class ReactiveFmComponent implements OnInit {

  userForm: any;

  constructor(private formBuilder: FormBuilder) {


     this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'phone': ['', Validators.required]
    });
   }

  ngOnInit() {
  }

}
```

The first thing here is that we are importing the FormBuilder and injecting it into the component in the constructor.

The syntax here is an array of values.  They could be :

```json
      'aaa': 'aValue'  // just a value
      'email': ['', Validators.required],  //init as empty string and add a validator
      'phone': ['', [Validators.required, Validators.minValue(3)] //init as empty string and add 2 validators
```
	
With our case, we are starting with the packaged Validators and the same code.

At this point, we could unit test out component just fine. We will do that in a further section


```html
<div class="row">
  <div class="md-col-12">
    <form [formGroup]="userForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" 
               formControlName="name"
               placeholder="first name">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" 
               formControlName="email"
               placeholder="Your email address">
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" 
               formControlName="phone"
               placeholder="(xxx) xxx-xxxx">
      </div>

      <button type="submit">Sign up</button>
    </form>
  </div>
</div>

 
```

TODO...explain

TODO: do a console in the submit

Lets redo this  similar to the first form

---

```html
<div class="row">
  <div class="md-col-12">
    <form [formGroup]="userForm" (submit)="saveUser()">

      <div class="form-group" [ngClass]="{ 'has-error' : (userForm.controls.name.invalid  && !userForm.controls.name.pristine) }">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" 
               formControlName="name"
               placeholder="first name">

          <div *ngIf="userForm.controls.name.dirty">
            <div *ngIf="userForm.controls.name.hasError('required')" class="help-block">Name is required</div>
          </div>
      </div>

      <div class="form-group" [ngClass]="{ 'has-error' : (userForm.controls.email.invalid  && !userForm.controls.email.pristine) }">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" 
             formControlName="email"
               placeholder="Your email address">

          <div *ngIf="userForm.controls.email.dirty">
            <div *ngIf="userForm.controls.email.hasError('required')" class="help-block">Email is required</div>
            <div *ngIf="userForm.controls.email.hasError('pattern')" class="help-block">Email is invalid</div>
          </div>
      </div>


      <div class="form-group" [ngClass]="{ 'has-error' : (userForm.controls.phone.invalid  && !userForm.controls.phone.pristine) }">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" 
               formControlName="phone"
               placeholder="(xxx) xxx-xxxx">

        <div *ngIf="userForm.controls.phone.dirty">
          <div *ngIf="userForm.controls.phone.hasError('required')" class="help-block">Phone is required</div>
          <div *ngIf="userForm.controls.phone.hasError('pattern')" class="help-block">Valid Format is required</div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="!userForm.valid" >Sign up</button>  
      
    </form>
  </div>
</div>
```
 
 
 
 
 now lets add some validators
 
 ```bash
 $ ng generate service shared/validation
installing service
  create src\app\shared\validation.service.spec.ts
  create src\app\shared\validation.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```
  
  
```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  static nateValidator(control) {
    if (control.value !== "nate") {
      return null;
    } else {
      return { 'invalidNate': true };
    }
  }


  static emailValidator(control) {
    if (control.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static phoneValidator(control) {
    if (control.value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
      return null;
    } else {
      return { 'invalidPhone': true };
    }
  }

}
```


 

 
 
 ----
 
 ```typescript
   constructor(private formBuilder: FormBuilder) {


     this.userForm = this.formBuilder.group({
      'name': ['', [Validators.required, ValidationService.nateValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator] ],
      'phone': ['', [Validators.required, ValidationService.phoneValidator]]
    });
   }
```html
   
   ----
   
```html   
<div class="row">
  <div class="md-col-12">
    <form [formGroup]="userForm" (submit)="saveUser()">

      <div class="form-group" [ngClass]="{ 'has-error' : (userForm.controls.name.invalid  && !userForm.controls.name.pristine) }">
        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" 
               formControlName="name"
               placeholder="first name">

          <div *ngIf="userForm.controls.name.dirty">
            <div *ngIf="userForm.controls.name.hasError('required')" class="help-block">Name is required</div>
            <div *ngIf="userForm.controls.name.hasError('invalidNate')" class="help-block">Nice try Nate</div>

          </div>
      </div>

      <div class="form-group" [ngClass]="{ 'has-error' : (userForm.controls.email.invalid  && !userForm.controls.email.pristine) }">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" 
             formControlName="email"
               placeholder="Your email address">

          <div *ngIf="userForm.controls.email.dirty">
            <div *ngIf="userForm.controls.email.hasError('required')" class="help-block">Email is required</div>
            <div *ngIf="userForm.controls.email.hasError('invalidEmailAddress')" class="help-block">Email is invalid</div>
          </div>
      </div>


      <div class="form-group" [ngClass]="{ 'has-error' : (userForm.controls.phone.invalid  && !userForm.controls.phone.pristine) }">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" 
               formControlName="phone"
               placeholder="(xxx) xxx-xxxx">

        <div *ngIf="userForm.controls.phone.dirty">
          <div *ngIf="userForm.controls.phone.hasError('required')" class="help-block">Phone is required</div>
          <div *ngIf="userForm.controls.phone.hasError('invalidPhone')" class="help-block">Valid Format is required</div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary" [disabled]="!userForm.valid" >Sign up</button>  
      
    </form>
  </div>
</div>
```
 
 The shared validator came from [this example](https://coryrylan.com/blog/angular-form-builder-and-validation-management)
 some of the things seem depricated, but the is a component that quickly finds the message to output from 
 an invalid message.  Worth a look if this template looks a little lengthy.
 
  
  Other links
  https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol
  
 
  
