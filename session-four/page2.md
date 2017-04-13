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

**Template form renders group and controls from form elements in the dom**
![Template](https://github.com/robstave/angular2-training/blob/master/session-four/images/renders.png "Template")

**Reactive form requires declared group and controls in the component and binds to form elements in the dom**
![Reactive](https://github.com/robstave/angular2-training/blob/master/session-four/images/bound.png "reactive")




This allows us a much higher degree of flexibility. 
The logic is pure javascript and does not depend on html or a template to do any validation.
 

So how exactly do you specify Template vs Reactive?

If you have imported FormsModule...that is:

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

Then it is a template form.  Behind the scenes, all the little angular2 gnomes are working hard and managing that ngModel.


On the other hand, if you have imported _ReactiveFormsModule_:

```
import { ReactiveFormsModule } from '@angular/forms';
```
 
 then  this is a reactive form.
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

There is nothing in here yet, just an html form.

Also, to confuse things, there is a bootstrap class called _form-control_. This is really only bootstrap for now, so ignore that.

 

## Form Builder

With the _reactive_ approach, form groups and controls are are specified first in the component.

Here is an example.
```typescript
this.myGroup = new FormGroup({
    name: new FormControl('Fred'),
    phone: new FormControl('333-333-3333'),
	email: new FormControl('right@said.fred.com')
  });
```
  
Or we can use a helper called the [Form Builder](https://angular.io/docs/ts/latest/api/forms/index/FormBuilder-class.html)

For example, lets inject the helper into our component and use to generate our
form control.

Populate the reactive-fm.component.ts with the following.

_reactive-fm.component.ts_
```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


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

The first thing here is that we are importing the FormBuilder and injecting it into the component in the constructor.  Then later we use the helper.

The syntax here is an array of values.  They could be :

```typescript
      'aaa': 'aValue'  // just a value
      'email': ['', Validators.required],  //init as empty string and add a validator
      'phone': ['', [Validators.required, Validators.minValue(3)] //init as empty string and add 2 validators
```
	
With our case, we are starting with the packaged Validators and the same code.

At this point, we could unit test out component just fine. We will do that in a further section

_reactive-fm.component.html_
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

Lets redo this  similar to the first form.

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
 
Validation occurs in the form group as the values that were bound to the controls are modified.
The result is accessable in the formGroup with was enabled with the following line:

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

  constructor() { }

}
```


Here we have 3 validators.

+ Check if the use is named nate
+ Regex check for eamil
+ Regex check for phone number


To use then, we just pass them in the form builder.

```typescript

import { ValidationService } from '../shared/validation.service';

...

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
An example can be found [here](https://coryrylan.com/blog/angular-form-builder-and-validation-management).
  
 
Further Reading:

  [Scotch.io](https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol)
  
 
  
