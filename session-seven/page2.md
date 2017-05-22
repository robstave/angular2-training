# Creating and  Mocking a Service

 Lets create a super simple service to see how the angular cli framework creates the blank testcase for us.


 ```
$ ng generate service cluck
installing service
  create src\app\cluck.service.spec.ts
  create src\app\cluck.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

It creates a simple service.  We will add a function that says something.

```javascript
 import { Injectable } from '@angular/core';

@Injectable()
export class CluckService {

  constructor() { }

  doCluck(){
    return "Cluck Cluck Cluck"
  }

}
```


Add the service to app.modules as a Provider

_app.module.ts_
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
 

 import { CluckService } from './cluck.service';     //<------ new

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CluckService],           //<------ new
  bootstrap: [AppComponent]
})
export class AppModule { }
```



Add it into the app service

```javascript
import { Component } from '@angular/core';
import { CluckService } from './cluck.service';  //<------ new

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  isTrue: boolean = false;

  constructor(private cluckService: CluckService) { //<------ new

  }

  doClick() {
    this.isTrue = !this.isTrue;
  }

  getChickenSound() {                    //<------ new
    return this.cluckService.doCluck();     //<------ new
  }                                          //<------ new
}
```

And display it!!


app.component.html

```javascript
<h1>
  {{title}}
</h1>

<div id="myParentDiv">
  <button (click)="doClick()"> Click Me </button>
  <div *ngIf="isTrue" id="myMessageDiv">
    The button was clicked
  </div>
</div>


<div id="chicken">
  {{getChickenSound()}}
</div>
```

## Running the Service

Run the service...it should work.

![Cluck](https://github.com/robstave/angular2-training/blob/master/session-seven/images/cluck.png)

## Running the test

But when we run the test...all kinds of messages come up!!

```
Failed: No provider for CluckService!
Error: No provider for CluckService!
    at injectionError (http://localhost:9876/base/src/test.ts?580832b2cc815e212dda2d1369db413a2d470760:1538:86)
    at noProviderError (http://localhost:9876/base/src/test.ts?580832b2cc815e212dda2d1369db413a2d470760:1576:12)
```

What happened?

First off, just like app.module, we need to set a provider.

Sadly, this is probibly the hardest part of writing a testcase.
Wiring up all the dependancies. Every time you add a dependancy to the 
component, you need to add it to the testcase.  This can get pretty
aweful.  

Lets add the dependancy first to see how to resolve the problem.



### Add provider to the testcase


_app.component.spec_

```javascript

//Add the import
import { CluckService } from './cluck.service';   //<----added

describe('AppComponent', () => {

//Add the service as provider
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
       providers: [CluckService],   ////<----- Added
    }).compileComponents();
  }));

  .....

//Add a testcase
  it('should find the chicken message', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#chicken')).toBeTruthy();
    expect(compiled.querySelector('#chicken').textContent)
     .toContain('Cluck Cluck Cluck'); 
  }));

});

```



So this passes and is all good.



## Mocking out the service.

Lets say the **Cluck** service was a bit more complicated.  It relied on OMcDTP (Old McDonald Tranport Protocol) to get the message across or had a ton of dependancies that really did not add value to the fact that we are trying to test the component as a unit testcase.  We can mock it out.


We will point out the highlights then just reiterate the whole testcase at once.

- Add the class MockCluckService with its own _doCluck_ method.
- In the providers, tell angular to inject the mock service in place of the real service.

And thats it.  Run the test.


```javascript
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { CluckService } from './cluck.service'; 

class MockCluckService {
  public doCluck(): String {
    return   "Cluck Cluck Cluck";
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
       providers: [ { provide: CluckService, useClass: MockCluckService } ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));

  it('should find the message after clicking the button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#myParentDiv')).toBeTruthy();
    expect(compiled.querySelector('#myMessageDiv')).toBeNull();

    //Get the button and click it
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();

    expect(compiled.querySelector('#myParentDiv')).toBeTruthy();
    expect(compiled.querySelector('#myMessageDiv')).toBeTruthy();

    expect(compiled.querySelector('#myMessageDiv').textContent)
     .toContain('The button was clicked'); 
  }));

  it('should find the chicken message', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('#chicken')).toBeTruthy();
    expect(compiled.querySelector('#chicken').textContent)
     .toContain('Cluck Cluck Cluck'); 

  }));

});
```






