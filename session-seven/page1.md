
# Testing

Angular CLI provides a framework for testing your code as part of the initial project.  Right out of the box, you have the tools you need to create Jasmine/Karma testcase and run End to End (e2e) testcases with protractor.


* [Karma](https://karma-runner.github.io/1.0/index.html) is the testcase runner. This is the framework that builds and runs tests within your project. It allows you to run the code against a real browser from a CLI.

* [Jasmine](https://jasmine.github.io/) is the library that you use to write your testcases.  It is really just javascript and is set up so you can write testcases pretty naturally. This goes hand in hand with Karma. For refernce, an [excellent reference](https://jasmine.github.io/2.0/introduction.html) is the jasmine intro on github.

* [Protractor](http://www.protractortest.org/#/) is the framework that allows us to write end to end testcases for our angular app. It takes care of what is needed to automate testcases in an actual browser. This is where we do the integration testcases.

 
Testing is usually a two pronged approach with Karma/Jasmine doing the unit testcases and Protractor handling the integration parts of the application.  

In both cases, the testing is done against a live browser.

An [Excellent Resource](https://angular.io/docs/ts/latest/testing/) are the angular.io docs.  We will be doing a fast overview.

## Example

Lets start our look into Karma with a small example.

First, kick off an angular project like we always do.

`ng new myProject`

Browse the project.  By default, we already have an e2e directory and some files floating around that have "spec" in the name.

Nagivate to the root of project and kick off the testcases with:

`ng test`

You will see.
```
Stave@St-PC MINGW64 ~/interlegis/ang2/session7/testing/testing (master)
$ ng test
18 05 2017 13:47:01.041:WARN [karma]: No captured browser, open http://localhost:9876/
18 05 2017 13:47:01.054:INFO [karma]: Karma v1.4.1 server started at http://0.0.0.0:9876/
18 05 2017 13:47:01.055:INFO [launcher]: Launching browser Chrome with unlimited concurrency
18 05 2017 13:47:01.069:INFO [launcher]: Starting browser Chrome
18 05 2017 13:47:04.975:INFO [Chrome 58.0.3029 (Windows 10 0.0.0)]: Connected on socket y3mEpSHtXexGk_oUA
Chrome 58.0.3029 (Windows 10 0.0.0): Executed 3 of 3 SUCCESS (0.193 secs / 0.183 secs)
```


![Simple](https://github.com/robstave/angular2-training/blob/master/session-seven/images/firstRun.png)


Sucess, we have already run and passed three testcases.  These were generated on the fly and are basically shells at the moment.  The testcases executed were in  `/app/app.component.spec.ts`.

```javascript
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
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
});
```

If you look at it a bit, you can start to see the Jasmine syntax.

Basically a lot of callbacks really.

Jasmine testcases start with something like:

 `describe( "do something", {//your test})`

Where we name the test and define the code that will be executed.

In this case, the callback starts with a 

`beforeEach({your setup code})`.

This specifies the setup that needs to run before each case.

Next are the testcases with start with an 

`it("what it should do', { your test code})` 

and inside that is our testing code where we might do something like:

`expect(x).toBe("4")`


You can combine and nest things as well.  You can next Describes as much as you want and use them
to group tests so you can do something like:


```javascript
describe('My Testing Group', () => {
    beforeEach(async(() => {
      //Do some common before stuff
    }));

    it('should initialize', async(() => {
      //check initial stuff
    }));

    describe('Sub Group 1', () => {
        beforeEach(async(() => {
          //Do some common before sub group 1
        }));

       it(`test1'`, async(() => {
         //test
       }));

       it(`test2'`, async(() => {
         //test
       }));
    });

    describe('Sub Group 2', () => {
        beforeEach(async(() => {
          //Do some common before sub group 2
        }));

       it(`test3'`, async(() => {
         //test
       }));

       it(`test4'`, async(() => {
         //test
       }));
    });

}});
});

```


## Available Asserts

There are a ton of asserts available for your testcases. And if they are not there, you can always write your own!

Some examples are [In a file called asserts.spec.ts](./asserts.spec.ts)

However, the best resource that can not be beat is the [Jasmine introduction page](https://jasmine.github.io/2.0/introduction.html)

## Deeper Dive

In this case, we are using Angular, so there are few more steps 
that we are dealing with.   Lets dive a little deeper in the test.



```javascript

// Here we are importing what we need to run the test
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
```

First we have the beforeEach.  This is code that would be run before each testcase.
This is basically setting up the component so that it can 
be created.

Note the "async".  This makes sure that all async calls are done before moving on.

```javascript
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
```
 

For the first testcase, we create the component in our testbed
and verify that it exists.
```javascript
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
```

Next lets look for the Property title in the component.  Properties on the component are just 
properties like any other Javascript object.

```javascript
  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));
```

Finally, lets dig around the dom and see that `{{title}}` was compiled correctly.  
Note that the template needs to be compiled first so we transform `<h1>{{title}}</h1>` to `<h1>App Works!</h1>`

```javascript
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
```


## Add a button

Lets add a button that toggles a field.

First lets add a `isTrue` property and a function that toggles it.

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  isTrue:boolean = false;

  constructor() { }
  
  doClick() {
    this.isTrue = !this.isTrue;
  }

}


```
The template is changed to 

```javascript
<h1>
  {{title}}
</h1>

<div id="myParentDiv">
  <button (click)='doClick()'> Click Me </button>
  <div *ngIf='isTrue' id='myMessageDiv'>
    The button was clicked
  </div>
</div>
```


![Simple](https://github.com/robstave/angular2-training/blob/master/session-seven/images/appWorks.png)

One example of a testcase could be:

```javascript
  it('should find the message after clicking the button', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    //find the compiled elements.  One should be there and one should not
    expect(compiled.querySelector('#myParentDiv')).toBeTruthy();
    expect(compiled.querySelector('#myMessageDiv')).toBeNull();

    //Get the button and click it
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    //let things settle
    fixture.detectChanges();

    //now both elements should be there
    expect(compiled.querySelector('#myParentDiv')).toBeTruthy();
    expect(compiled.querySelector('#myMessageDiv')).toBeTruthy();
    expect(compiled.querySelector('#myMessageDiv').textContent)
     .toContain('The button was clicked');

  }));

```


## Simple testcase

```javascript

export class MyUtils {

    public isChicken(string: String): boolean {

        string = string.toLowerCase();
        if (string.indexOf('chicken') >= 0) {
            return true;
        }

        return false;
    }

    public sortNames(names: String[]): String[] {
        return names.sort();
    }

    public isEven(aNumber: number): boolean {
        return (aNumber % 2) === 0;
    }
}

```



```javascript
import { MyUtils } from './utils';


describe('TestService', () => {
    describe('Test if chicken', () => {

        const myUtils = new MyUtils();

        it('should find a chicken if its in a string', () => {
            expect(myUtils.isChicken('chicken')).toBe(true);
            expect(myUtils.isChicken('Chicken')).toBe(true);
            expect(myUtils.isChicken('duck')).toBe(false);
            expect(myUtils.isChicken('superChicken')).toBe(true);
        });

        it('should sort', () => {

            const names = ['psycho', 'alpha', 'disco', 'beta', 'bio', 'aqua', 'do', 'loop']

            const results = myUtils.sortNames(names);

            expect(results.length).toBe(8);
            expect(results[0]).toBe('alpha');
            expect(results[1]).toBe('aqua');
            expect(results[2]).toBe('beta');
            expect(results[3]).toBe('bio');
        });

        it('should check even', () => {

            expect(myUtils.isEven(22)).toBe(true);
            expect(myUtils.isEven(23)).toBe(false)

        });

    });
});

```

 
 Just rerun the testcases and now we have learned to test a simple class.


 Next we will add a service and mock it out.


[Page2](page2.md)