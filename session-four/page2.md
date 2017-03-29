# Reactive Forms

From this point on we will be using the reactive-fm component for our examples.

First, we need to include the reactive forms module into our project.
You can have both, but you can only use one strategy per form.

_app.module.ts_

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
Instead, reactive forms module gives us the directives _formControl_ and _ngFormGroup_ which are
a little different.

There are still FormGroups and FormControls, but they are defined in the component and 
then bound to the template via [formControl] and [formGroup] rather than having the template define the form controls. 

This allows us a much higher degree of flexibility. We can even have things that are not
in the form at all to start with in the case of something like a dynamically created form.   

So how exactly do you specify Template vs Reactive?

if you have imported FormsModule...that is:

```
import { FormsModule } from '@angular/forms';
```
and you use the form element with no directives

```html
<form>
```

or 
```html
<form  #f="ngForm">
```

Its a template form.  Behind the scenes, all the little angular2 gnomes are working hard and managing that ngModel

If you have imported FormsModule and ReactiveFormsModule:

```
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

```

Then these are still template forms
```html
 <form>
 <form #f="ngForm">
```
 and this is a reactive form.
```html
 <form [formGroup]="userForm">
 ```
 

## Example
 
Lets start out with our base form.  Paste into reactive-fm.html

_reactive-fm.html_
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

There is nothing in here yet..just a form. 
Also, to confuse things, there is a _form-control_ class in the bootstrap. This is really only bootstrap for now, so ignore that.

 

## Form Builder

Since the Form groups and controls are not automatically generated, they are specified in the component.
This can be done with the objects themselves:

```typescript
this.myGroup = new FormGroup({
    name: new FormControl('Fred'),
    phone: new FormControl('333-333-3333'),
	email: new FormControl('right@said.fred.com')
  });
```
  
Or we can use the [Form Builder](https://angular.io/docs/ts/latest/api/forms/index/FormBuilder-class.html)

The form builder helps us build up the data structure a little easier.
This can be imported into our component and injected as needed.

Populate the reactive-fm.component.ts with the following.

_reactive-fm.component.ts_
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

So what we have done, for the most part is declare the form control first in the component.  Its Independant and we do not
even have to have the html sitting around to test things.

When we build the form, we then bind the inputs to the alread defined form controls.

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
 
We still have the error messages, but it is not really a two way thing.
Changes in input are passed to the formControl where they are validated, and the result is passed back in:

```typescript
[formGroup]="userForm"
```

 ## Adding Validators

 Lets add some validators
 
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


Here we have 3 validators.

+ Check if the use is named nate
+ Regex check for eamil
+ Regex check for phone number


To use then, we just pass them in the formm builder.

```typescript
   constructor(private formBuilder: FormBuilder) {


     this.userForm = this.formBuilder.group({
      'name': ['', [Validators.required, ValidationService.nateValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator] ],
      'phone': ['', [Validators.required, ValidationService.phoneValidator]]
    });
   }
```
   

The results are reflected in the Form Group.
   
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
 
You can quickly build a library of messages as well so that you are not always pasting in error messages.
An example of that is [this example](https://coryrylan.com/blog/angular-form-builder-and-validation-management).
  
 
Further Reading:

  [Scotch.io](https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol)
  
 
  
