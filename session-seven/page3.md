# End to End testing

Angular CLI provides the scaffolding needed for us to do integration testcases with a testing library called [Protractor](http://www.protractortest.org/#/).

Protractor is a test runner that allows us to run the testcases in the browser.  The testcode itself is still Jasmine, so for the most part, most of the work in finding and checking something on the page is same.

Luckily, the scaffolding puts all the libraries and scripts for us together in our project. It also builds out our first case!


## Example

Lets check out the workspace we have been already working on.

Angular CLI created the e2e directory and in it is our _Page Object_ class and a test class.  

First, lets look at `app.po.ts`

```typescript
import { browser, element, by } from 'protractor';

export class TestingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
```

This is our page object class for the app page. This is 
what we use to find things on that page and how to navigate to it. Since this is the one that was created by the angular cli, its pretty small.  It just navigates to home and finds the "app Works" string


Next, lets look at the testcase
_app.e2e-spec.ts_
```javascript
import { TestingPage } from './app.po';

describe('testing App', () => {
  let page: TestingPage;

  beforeEach(() => {
    page = new TestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
```

As you can see, we are still using the Jasmine syntax here.  It looks pretty much like the unit testcases like we had done earlier.


* First we do the `beforeEach` and set up a testing page to run in.
* We enter the `it` where we start the testcase.
* Next we navigate to the page.
* Finally we use the page object to find the paragraph text.


## Running the testcases

Running the end to end testcases is basically the same as the unit ones.

```
ng e2e

[00:18:51] I/file_manager - creating folder C:\Users\Stave\interlegis\ang2\session7\e2e\e2e1\node_modules\protractor\node_modules\webdriver-manager\selenium
[00:18:52] I/update - chromedriver: unzipping chromedriver_2.29.zip
[00:18:53] I/launcher - Running 1 instances of WebDriver
[00:18:53] I/direct - Using ChromeDriver directly...
Spec started

  e2e1 App
    √ should display message saying app works

Executed 1 of 1 spec SUCCESS in 1 sec.
[00:18:59] I/launcher - 0 instance(s) of WebDriver still running
[00:18:59] I/launcher - chrome #01 passed

```

And we should pass.  In this case you see the browser fire up and everything.


## Adding stuff
Lets add some methods to our page object and get more from it.

_app.po.ts_
```javascript
import { browser, element, by } from 'protractor';

export class TestingPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getButton() {
    return element(by.css('button'));
  }

  getChickenDivText() {
    return element(by.id('chicken')).getText();
  }

  getParentDiv() {
    return element(by.id('myParentDiv'));
  }

  getMessageDiv() {
    return element(by.id('myMessageDiv'));
  }

  getMessageDivText() {
    return element(by.id('myMessageDiv')).getText();
  }


}

```


We have added just a few functions to either get an
element or the text in one. Note that in some cases we are using `by.id()` and others `by.css()`.  There are [plenty of other ways](http://www.protractortest.org/#/api?view=ProtractorBy) as well to find things.

Again, this is the page object, so really all we should be doing is writing access type stuff and not test code.

Lets play with the code we have.  Recall that we had a service that we called to produce a 'Cluck Cluck Cluck' string.

Add to _app.e2e-spec.ts_
```typescript
  it('find the service cluck message', () => {
    page.navigateTo();
    expect(page.getChickenDivText()).toEqual('Cluck Cluck Cluck');
  });

```

So we are using the page object to get the element text and checking that it is correct.  

Notice that we did not have to wait for anything to render. It just worked.  


Lets do that again, but with the button.  We already have written everything we need the page object.  Lets click the button and see that it happened.

Add to _app.e2e-spec.ts_
```typescript
  it('clicks the button', () => {
    page.navigateTo();
    expect(page.getParentDiv()).toBeTruthy();

    page.getButton().click();
    expect(page.getParentDiv()).toBeTruthy();
    expect(page.getMessageDiv()).toBeTruthy();
    expect(page.getMessageDivText()).toEqual('The button was clicked');


  });
```

Again, we did not have to work to hard or really even wait for anything like we did for the karma testcases. Neat huh?




### Some limitations

I am used to finding elements by id. They are exactly what you way they are.  However you will see that `by.css()` is pretty common.  As it turns out, its probably the most dependable.  There is a lot of magic and moving parts going on behind the scenes there some selector types like `by.binding()` and `by.model` just do not seem to always work like you would be.   If you write a test and it works, great.  

So if you can not seem to find an element that you are looking for, switch strategies.





## One more example

Lets do one more to drive the ideas a little bit more in our heads.

Add the following to _app.component.html_. We are just adding two
inputs to add.

```html
<div id="calc">
  <input id="aValue" [(ngModel)]="aValue" >
  +
  <input id="bValue" [(ngModel)]="bValue" >
   <div id="results">
    ={{aValue + bValue}}
  </div>
</div>
```

Add the properties as well to the _app.component.ts_

```typescript
  public aValue = '';
  public bValue = '';
```

Now run the project and see that is works.
Good.

Lets add another test that sets two values and gets the results.


First add some access functions again to the page object.

```typescript
   getInputA() {
    return element(by.id('aValue'));
  }

  getInputB() {
    return element(by.id('bValue'));
  }
  getResults() {
    return element(by.id('results')).getText();
  }
```

And add the testcase that grabs the fields, sets some text and
see where it goes.


```typescript
  it('I have an applepen', () => {
    page.navigateTo();

    const inputA = page.getInputA();
    const inputB = page.getInputB();

    expect(inputA.isEnabled()).toBe(true);
    expect(inputA.getAttribute('value')).toBe('');

    expect(inputB.isEnabled()).toBe(true);
    expect(inputB.getAttribute('value')).toBe('');

    inputA.sendKeys('Apple');
    inputB.sendKeys('Pen');
    expect(inputA.getAttribute('value')).toBe('Apple')
    expect(inputB.getAttribute('value')).toBe('Pen');
    expect(page.getResults()).toEqual('=ApplePen');
  });
```

Run the test!


Again, unlike the karma testcases, everything is pretty instant here.
This is as simple as it gets however, so there will be more complex situations
and async waits.


The take away here is that you most certainly can do mouseclicks and 
actions in karma testcase. However, they are easier to do in protractor.
Perhaps you should concentrate your efforts on components and checking that
functions are called with Karma and page interactions with Protractor.


 
