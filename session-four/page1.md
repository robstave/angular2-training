# Forms

Angular2 has pretty extensive framework support for forms. It defines a flexible and full API to handles the binding, validation,
error handling and change tracking.  This is a good thing because most of our application is really just forms.

Angular 1 dealt with forms using the ng-model. This provided a two-way binding that made it very
easy to bind the view model to the controller.  The problem was that the controller scope is very tightly
coupled to the view making testing difficult.  There are means to test it, but it requires the DOM, the 
scope and is pretty much an end to end test.

Angular2 provides two strategies for forms.  Template driven and reactive (model driven).  

Template driven is, in a way, similar to Angular1. There is an _ngModel_ and two way
binding is still allowed. For many simple forms, this is easy enough to roll with.  

Reactive forms move out the complex validation from the template and into the model domain. This could be in the 
template, but could really be anywhere. 


Digging around on the interwebs, I found [this](http://stackoverflow.com/questions/39142616/angular2-forms-api-template-driven-or-reactive) on stacktrace.


Template Driven Forms Features

+ Easy to use
+ Suitable for simple scenarios and fails for complex scenarios
+ Similar to angular 1
+ Two way data binding(using [(NgModel)] syntax)
+ Minimal component code
+ Automatic track of the form and its data(handled by Angular)
+ Unit testing is another challenge

Reactive Forms Features

+ More flexible, but needs a lot of practice.
+ Handles any complex scenarios.
+ No data binding is done(Immutable data model preferred by most developers)
+ More component code and less HTML markup
+ Reactive transformations can be made possible such as
  + Handling a event based on a debounce time
  + Hanlding events when the components are distinct until changed
  + Adding elements dynamically
+ Easier Unit testing

My two cents:
As long as you can get a consistent look and feel, you can choose either.  Most of the documentation out there seems to
riff off of the template based forms.  You can mix and match within an application so if a form outgrows its
maintainability, just upgrade to reactive.  Ajax-like forms should strive to be reactive.  You just cant use both
strategies in the same form.

Also, of all the code that has gone through alpha and beta changes, this is one of the high churners.  So there are lots of
tutorials that are outdated.  They usually mention what release they are relevant too.

## Start the Project

Lets kick off the project like we did other times.  Using angular-cli and bootstrap.two
We will create a component to handle each type of form

```bash
ng new form-app 
cd form-app
ng generate component template-fm
ng generate component reactive-fm

npm install ng2-bootstrap bootstrap --save

```

Modify the app.module.ts to include  some bootstrap components
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ButtonsModule } from 'ng2-bootstrap/buttons';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TemplateFmComponent } from './template-fm/template-fm.component';
import { ReactiveFmComponent } from './reactive-fm/reactive-fm.component';
 

@NgModule({
  declarations: [
    AppComponent,
    TemplateFmComponent,
    ReactiveFmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Open angular-cli.json and insert a new entry into the styles array

```typescript
      "styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
```



Edit the app.component.html to use the tab directive as so.

```typescript
<div class="container">
  <h1>Forms </h1>

  <tabset>
    <tab heading='Template Form'>
      <div class="panel ">
        <div class="panel-heading"><b>Profile info</b></div>

        <div class="panel-body">

          <app-template-fm></app-template-fm>
        </div>
      </div>
    </tab>

    <tab heading='Reactive Form'>
      <div class="panel">
        <div class="panel-heading"><b>Order</b></div>
        <div class="panel-body">
          <app-reactive-fm></app-reactive-fm>
        </div>
      </div>
    </tab>
  </tabset>
</div>
```

Do an NG serve to see that your project is up and running.

Lets start out with a simple form.  There is a bit of bootstrap sugar, but really...for the most part, we are looking
at three inputs and a submit.

Add the following to the template-fm.html template

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


------------------
Things we’ll implement:

* Bind to the user’s name, email, and phone
* Required validation on all inputs
* Pattern validation on email and phone
* Show required validation errors
* Disabling submit until valid
* Submit function

## FormControl and FormGroup
	
Two of the main objects you will work with are the FormControl and the FormGroup.
These are used to manage the data and handle its values, states and validity.  Think of it as the form interface
or form model.  We did mention that there was a template form and a reactive form, but in both cases, the form Control
and form group is used.

Lets just jump to our form for an idea of what we are trying to achieve. There are three inputs and a submit button.
Each input (name, phone, email) has a state (valid, dirty, hasErrors), and a respective value.
In addition, we would like to group them collectively as a single group, so that we can evaluate the validity of the sum controls
with a state and value.

The FormControl is the smallest unit of functionality and is used to encapsulate each input in the form (or button or any other single value).
How you associate the control to an input is determined by your template/reactive choice, but ultimately it is tied
to the form and contains that data.

Once associated, you use the control to access values and states.  For example, if the object myFormControl was associated with the
name and the input was required you might see

Name: "fred"
```typescript
myFormControl.value // is "fred"
myFormControl.dirty // is true
myFormControl.valid // is true
```

while
Name: ""
```typescript
myFormControl.value // is ""
myFormControl.dirty // is false
myFormControl.valid // is false
```

FormGroup is just a collection of Form Controls.
They both implement the _AbstractControl_ interface so things like valid can be checked across all Controls in the Group.

Here are the docs for the items:
	
 * https://angular.io/docs/ts/latest/api/forms/index/FormControl-class.html
 * https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html
	

# Template form

The two directives that make this a Template form are

* NgForm
* ngModel

The first is set in our form element with:

```html
<form #f="ngForm"  (ngSubmit)="onSubmit(f.value)" >
```

By including the FormModule in our project, we don't even really have to specify much in the form as it will
automatically assume that NgForm will be used for all form elements.  We do need access to the form group however 
so this syntax gives us a local variable that points to the group (Recall # is a local variable) and binds
the ngSubmit event to _onSubmit_.

The second part is the input. We need to set the name and ngModel directive  in the input.
```html
 <input type="text" class="form-control" 
               id="name" placeholder="first name" 
               name="name" ngModel>
```

With these two steps, we have all we need for angular to build the Form control behind the scene.

Modify the template-fm.html template form code as follows.
	   

```html
<div class="row">
  <div class="md-col-12">
    <form #f="ngForm" 
          (ngSubmit)="onSubmit(f.value)"
           class="form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" 
               id="name" placeholder="first name" 
               name="name" ngModel>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" class="form-control" 
               id="email" placeholder="Your email address" 
               name="email" ngModel>
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" 
               id="phone" placeholder="(xxx) xxx-xxxx" 
               name="phone" ngModel>
      </div>

      <button type="submit" class="btn btn-primary">Sign up</button>

      {{f.value | json}}

    </form>
  </div>
</div>
```
Note the {{f.value | json }}, this uses a pipe (previously a filter) to take the form Group  value and display it as json.
If you run the code at this point, you will see a data structure with our values displayed at the bottom. They will
change as you type.

Note however..that at this point, there is nothing going on in the controller.

![Form](https://github.com/robstave/angular2-training/blob/master/session-form/images/form1.png "Form")


We can pass on the data to the component through an onSubmit function.
In template-fm.component.ts add:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-fm',
  templateUrl: './template-fm.component.html',
  styleUrls: ['./template-fm.component.css']
})
export class TemplateFmComponent implements OnInit {

  constructor() { }

  onSubmit(x){
    console.log(x)
   
  }
  ngOnInit() {
  }

}
```

Once you click submit, you will see the values.


Now lets add some css/ngIf templating code to make validation work.

Just replace the form code with the following, and we will step through whats going on.

```html
<div class="row">
  <div class="md-col-12">
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)" class="form">
      <div class="form-group" [ngClass]="{ 'has-error' : (name.invalid  && !name.pristine) }">

        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" placeholder="first name" 
               #name="ngModel" name="name" ngModel required>

        <div *ngIf="name.dirty">
          <div *ngIf="f.hasError('required', 'name')" class="help-block">Name is required</div>
        </div>
      </div>


      <div class="form-group" [ngClass]="{ 'has-error' : (email.invalid  && !email.pristine) }">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" placeholder="Your email address" 
               #email="ngModel" name="email" ngModel  
                pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" 

               required>

        <div *ngIf="email.dirty">
          <div *ngIf="f.hasError('required', 'email')" class="help-block">Email is required</div>
          <div *ngIf="f.hasError('pattern', 'email')" class="help-block">Email is invalid</div>

        </div>
      </div>

 
      <div class="form-group" [ngClass]="{ 'has-error' : (phone.invalid  && !phone.pristine) }">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" placeholder="(xxx) xxx-xxxx" name="phone" 
               #phone="ngModel" ngModel 
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$" 
               required>

        <div *ngIf="phone.dirty">
          <div *ngIf="f.hasError('required', 'phone')" class="help-block">Phone is required</div>
          <div *ngIf="f.hasError('pattern', 'phone')" class="help-block">Valid Forma is requiredt</div>

        </div>
      </div>
      

      <button type="submit" class="btn btn-primary">Sign up</button>  

    </form>
  </div>
</div>
```

Angular has a set of built in validators. The most common is _Required_. Simply by adding required to the input, we attach 
a validator to the formControl and it will change the state of the control as the input is changed.  No observing required.

```html
 <input type="text"  id="phone"   name="phone"  ngModel  required>
```

If the input is empty, the formControl.valid will evaluate to false.

Another practically free validator is "pattern". You can add a regex pattern check to an input as follows.

```html
 <input type="text"  id="phone"   name="phone"  ngModel  
  pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
  required>
```

Lets look at all the code in the phone input at once.

```html
      <div class="form-group" [ngClass]="{ 'has-error' : (phone.invalid  && !phone.pristine) }">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" placeholder="(xxx) xxx-xxxx" name="phone" 
               #phone="ngModel" ngModel 
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$" 
               required>

        <div *ngIf="phone.dirty">
          <div *ngIf="f.hasError('required', 'phone')" class="help-block">Phone is required</div>
          <div *ngIf="f.hasError('pattern', 'phone')" class="help-block">Valid Forma is requiredt</div>
        </div>
      </div>
 ```

First, we expose the formControl to a local acess with _#phone=phone_.  You could probably access everything through #f, but this
does make things a little easier.  There are really lots of ways to do this, but this is about as "templatey" as it gets.

Now that we have access to the formControl with #phone, we can use it to decorate the form item with css.
The first class is :

```html
<div class="form-group" [ngClass]="{ 'has-error' : (phone.invalid  && !phone.pristine) }">
```
This is bootstrap specific and adds a wrapper class to the input if there is an error.

```html
        <div *ngIf="phone.dirty">
          <div *ngIf="f.hasError('required', 'phone')" class="help-block">Phone is required</div>
          <div *ngIf="f.hasError('pattern', 'phone')" class="help-block">Valid Forma is requiredt</div>
        </div>
```

This will add the messages below. We do not want a full red form when we start out, so we check "dirty" first.
Once something is in progress, then we can display an error.  It there is "Any" error, phone.valid will evaluate
to false, but we can search for inividual error keys and use messages to associate to them. In this case, Im accessing
the message from the group, but you could get it with the control as well.

Once done, it will look as follows.
![Form](https://github.com/robstave/angular2-training/blob/master/session-form/images/form2.png "Form")

Angular1 had a great package called ng-messages that handled some of this really well. It was kinda like
a wrapper that did the form control stuff and helped in the template code.  This does not exist in angular2, but be
on the lookout for code as it comes up.

## Submit button
Dont forget to disable the submit button.
 
```html
 <button type="submit" class="btn btn-primary" [disabled]="!f.valid" >Sign up</button> 
 
```

## Binding ngModel



Everything up to this point handled all form interactions in the template itself. There was no controller code 
at all until you hit submit.

You can communicate with the controller however with bindings to ngModel.

[ngModel] can be used to initialize the data with a one way binding.



create a file
user.interface.ts in the template folder

```typescript
export interface User {
  name: string;
  phone: string;
  email: string;
}
```

change the component to ues the interface.
Set an initialization value and a setDefault function
on the user property.

```typescript
import { Component, OnInit } from '@angular/core';

import {User} from './user.interface'

@Component({
  selector: 'app-template-fm',
  templateUrl: './template-fm.component.html',
  styleUrls: ['./template-fm.component.css']
})
export class TemplateFmComponent implements OnInit {

  constructor() { }

   user:User = { name:"george",
                 phone:"444-444-4444",
                 email:"sss@ggg.com"};


  setDefault (){
    this.user =  { name:"ted",
                 phone:"333-333-3333",
                 email:"ted@talk.com"};
  }

  onSubmit(x){
    console.log(x)
   
  }
  ngOnInit() {
  }

}
```

now change ngModel to bind to the individual properties

```html
<div class="row">
  <div class="md-col-12">
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)" class="form">
      <div class="form-group" [ngClass]="{ 'has-error' : (name.invalid  && !name.pristine) }">

        <label for="name">Name:</label>
        <input type="text" class="form-control" id="name" placeholder="first name" 
               #name="ngModel" name="name" [ngModel]="user.name" required>

        <div *ngIf="name.dirty">
          <div *ngIf="f.hasError('required', 'name')" class="help-block">Name is required</div>
        </div>
      </div>


      <div class="form-group" [ngClass]="{ 'has-error' : (email.invalid  && !email.pristine) }">
        <label for="email">Email:</label>
        <input type="text" class="form-control" id="email" placeholder="Your email address" 
               #email="ngModel" name="email" [ngModel]="user.email"  
                pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" 

               required>

        <div *ngIf="email.dirty">
          <div *ngIf="f.hasError('required', 'email')" class="help-block">Email is required</div>
          <div *ngIf="f.hasError('pattern', 'email')" class="help-block">Email is invalid</div>

        </div>
      </div>

 
      <div class="form-group" [ngClass]="{ 'has-error' : (phone.invalid  && !phone.pristine) }">
        <label for="phone">Phone:</label>
        <input type="text" class="form-control" id="phone" placeholder="(xxx) xxx-xxxx" name="phone" 
               #phone="ngModel" [ngModel]="user.phone" 
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$" 
               required>

        <div *ngIf="phone.dirty">
          <div *ngIf="f.hasError('required', 'phone')" class="help-block">Phone is required</div>
          <div *ngIf="f.hasError('pattern', 'phone')" class="help-block">Valid Forma is requiredt</div>

        </div>
      </div>
      

      <button type="submit" class="btn btn-primary" [disabled]="!f.valid" >Sign up</button>  

      <br>
      <div>
      Form: {{f.value | json}}
      </div>
      <div>
        {{user | json}}
        </div>
      
        <button class="btn btn-primary" (click)="setDefault()" >fill in defaults</button>  


    </form>
  </div>
</div>
```

note we have a little code at the bottom to inspect both the form model and the component model.

When we start the app we see the defaults are filled from the component user property


![Form](https://github.com/robstave/angular2-training/blob/master/session-form/images/form3.png "Form")

If we change fields, the form changes, but the user does not in the component

![Form](https://github.com/robstave/angular2-training/blob/master/session-form/images/form5.png "Form")

If we click on the default button, the user and the form are set to the new value.

![Form](https://github.com/robstave/angular2-training/blob/master/session-form/images/form6.png "Form"


We could also write onSubmit to take the data as it and put it into user.  Exercise for the user.

The Interface approach is not needed, but seems to be a common pattern and would be super useful in our IDE.

Note: The actual value of this.user is never changed when we interact with the form. This is the one way dataflow!

This is mostly what you want to use.

## Two way binding

You have the option for [(ngModel)] as well.
In this case, changes to the form will make changes in the user property as well.

Not the best idea as you are now managing two sets of data. One in the form and now one in your component.
There are valid uses for this Im sure, but none come to mind immediately. Perhaps to sync things
on the side or sync things that are not really inputs  (like a table in the form with a highlight).

In all of these cases, you should consider an onChange or onClick binding instead




Other links

Here is a good link that goes a little further into the template side.

https://toddmotto.com/angular-2-forms-template-driven


[page 2](page2.md)

