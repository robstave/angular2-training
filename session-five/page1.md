# Observables and Http

Javascript has several ways of handling asynchronous issues.
The basic problem that a web browser is trying to solve is how to 
orchestrate all the data that it polls from the web into a single
presentation that could be as powerful as the answer to the meaning 
of life, or as meaningless as a Monty Python tribute to the movie, 'The Meaning of Life'.

The most common task is handling HTTP requests/responses asynchronously.

You can't just wait for each response one at a time. Its better to have a callback
to handle your processing when things are ready. You also need to correlate the requests and the responses. But what about the cases where you need three calls to the database
so you can build the next two requests and so on.

If you have even tried your hand at node programming,  it becomes apparent by they 
call the usual approach to these problems as [Callback Hell](http://callbackhell.com/).

Good programming practices only do so much and the way you fundamentally approach the problem
sometimes just lends itself to a better way of doing things.

[Promises](https://www.promisejs.org/) are good. They pretty much handle what you
were doing with all those pesky error cases and the like. They were used pretty extensively
in angular1.5 with $q and $http packages.

I started in angular1.2 and had used [ngResource](https://docs.angularjs.org/api/ngResource) which
kinda implemented some of what promises provided, but were really just a wrapper with success and error callbacks. No cancel capability.  It works ok for the straightforward cases.

Observables are the new hotness and is preferred by Angular2 folks.  Things like debounce and filtering out similar requests make it a good choice if you are considering
any kind of ajaxy-responsive coolness like lookahead text boxes.  

## Reactive Programming
So what is reactive programming?

> Reactive programming is programming with asynchronous data streams.

Everything is a stream.  Lots of map, reduce stuff.  Think the Observer pattern, the Iterator pattern and general functional programming
all rolled into one.  

The approach to solving the problem is not so much writing instructions
on how you would tell somebody to run around a workshop and put something together. Instead, think
of it more like a group of workers on an assembly line, each responsible for 
a single task like combining data, transforming it, filtering it and so on.

A great reference is [here](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

Alas, most angular2 tutorials do not dive all that deeply into the details up front.  They pretty much explain how observables work and
then wrap it around some HTTP code and say "See...neat!".  Truth is, 90% of what we do will look like:

```typescript
 getPeople() {
    return http.get('api/people.json')
      .map(response => response.json());
}
```


We will cover the basics, but I will try and leave as many good links as possible for you to dive deeper.

## RxJS

The main library behind all of this is [RxJS](http://reactivex.io/). This stands for Reactive eXetensions for JavaScript.
Specifically, RxJS version 5. So keep that in mind when looking at examples on the web as it is
a bit of a rewrite as well and some examples might be kinda old.

From the [RxJS](http://reactivex.io/) site:
> RxJS is a library for composing asynchronous and event-based programs by using observable sequences. 
> It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators 
> inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.
>
> Think of RxJS as Lodash for events.

> ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of 
> managing sequences of events.

 
With RxJS, you can create streams (which implement Observable) and then subscribe to those streams to react to them.
When you subscribe, you provide three functions: **onNext**, **onError** and **onComplete**.

You are using [pure](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.162sbqdgo)
functions, which means your not changing the data and there are no side effects.  Just like a regular math function.

For example, Y = X + 1 is pure...it does not mess with X.  Z = Y*3 is as well.  If X starts out as 3, then Y=4 and Z=8.  But X is still
3 when we are done.  X++ would not be pure because the value of X has changed.

Finally, streams are lazy.  You can set up a stream, but nothing happens unless you subscribe.
 
Here is a super simple example:
(note, Im using jsBin for this)


```typescript
var source = Rx.Observable.interval(500);

var subscription = source.subscribe(
  x => console.log(`onNext: ${x}`),
  e => console.log(`onError: ${e}`),
  () => console.log('onCompleted'));
```

In addition, we can register a catch callback directly on the observable.

```typescript
observable.catch((error) => {
  // handle error
});
```
 
 see [JSBin](http://jsbin.com/yunoka/edit?html,js,console)

In this example, we create the stream with the Rx.Observable and add the operator [Interval](http://reactivex.io/documentation/operators/interval.html) which emits a number starting at 0 every 500ms.
it just keeps going and going. 

You can see that it does not stop.  You will not see the _onCompleted_ event.  Lets limit the stream with a stopping point.


```typescript
var source = Rx.Observable.interval(500).take(10);

var subscription = source.subscribe(
  x => console.log(`onNext: ${x}`),
  e => console.log(`onError: ${e}`),
  () => console.log('onCompleted'));
```
see [JSBin](http://jsbin.com/tizoduy/edit?html,js,console)

We have added a new operator _Take_.  This limits our stream to x items...then stops the stream

  
```
    "onNext: 0"
    "onNext: 1"
...
...
    "onNext: 8"
    "onNext: 9"
    "onCompleted"
```

Now we see the _onCompleted_ event.

We can do a [map](http://reactivex.io/documentation/operators/map.html) as well. Maps transform data.  Lets transform numbers to words.

```typescript
const source = Rx.Observable
    .interval(500).take(6)
    .map(val => val%3? "Spam":"Beans");

source.subscribe(val => console.log(val),
                 e => console.log("error",e),
                () => console.log("onCompleted"))
```				
		
We see the results:

```		
"Beans"
"Spam"
"Spam"
"Beans"
"Spam"
"Spam"
"onCompleted"
```

See [JSBin](http://jsbin.com/fapamuc/edit?html,js,console,output)

[Here](http://embed.plnkr.co/ZRxNQfB0DEuUNNlhlScU/preview) is another plunker that is done in angular2 that is similar to the above exercise.  Its basically the same exercise, but you can see it in the context of Angular.

## Further Reading

RxJS provides a [very deep toolbox](https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35#file-rxjs_operators_by_example-md) of operations that you can work with.  

Further Reading:

 * [Observables and RXJS](https://codecraft.tv/courses/ng2/reactive-programming-with-rxjs/observables-and-rxjs/)
 * [Angular 2 — Introduction to new HTTP Module](https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.sw9e772vt)
 * [Taking advantage of Observables in Angular2](https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html)

If you have a few evenings to spare, its totally worth it to do this self guided workshop.
 
 * [Learn you node for much win](https://github.com/workshopper/learnyounode) 
 * [Stream Adventure](https://github.com/workshopper/stream-adventure)

Its really a course in node and does not cover observables exactly, but it really puts the problem space into perspective
with coding for streams. And its pretty fun with a kinda "code your adventure" style.

Or just play with RxJS a bit.  

Grok the flat map with [this good example](https://blog.thoughtram.io/rx/2016/08/01/exploring-rx-operators-flatmap.html)
and then perhaps tear [this Plunkr apart](http://jsfiddle.net/staltz/8jFJH/48/) apart.

# Http

Now that we have done the nickle tour of observables and RxJS, lets dive into TWO HTTP examples.

The first is a simple page that gets data from a remote server and the second is a look ahead text box.

## Http module in NG2

The [Http](https://angular.io/docs/ts/latest/guide/server-communication.html) code in angular is split out to a separate module and needs to be imported into your application. It is no
longer a part of the core. All projects generated with angular-cli however still include it, so there is nothing particularly special we need to add here.


## Simple Http Request

This example runs similar to the one in NG book to start with.

It makes use of a fake REST api called [jsonplaceholder](https://jsonplaceholder.typicode.com/). We can use this 
as the rest endpoint for a series of live tests.  You can also download the code and run it locally.
It basically is a simple node server serving up json from a file.

Start out with the usual project and create a component called simpleComponent

```bash
ng new simple 
cd simple

$ ng generate component simpleComponent
installing component
  create src\app\simple-component\simple-component.component.css
  create src\app\simple-component\simple-component.component.html
  create src\app\simple-component\simple-component.component.spec.ts
  create src\app\simple-component\simple-component.component.ts
  update src\app\app.module.ts

ng serve
```

We will start out just laying out the entire code in one swoop.

_app.module.tx_
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimpleComponentComponent } from './simple-component/simple-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

There is nothing that you need to change here, angular-cli took care of that.


Point the _app.component.html_ template to our new component.
```typescript
<h1>
  Simple http
</h1>
<app-simple-component></app-simple-component>
```



In _simple-component.component.html_ we create 3 buttons and display the value of the _data_ property using
the json pipe.

```html
<h2>Basic Request</h2>

<button type="button" (click)="makeRequest(1)">Get user1</button>
<button type="button" (click)="makeRequest(2)">Get user2</button>
<button type="button" (click)="makeRequest()">Get All</button>


<div *ngIf="loading">loading...</div>
<pre *ngIf="data">{{data | json}}</pre>
```


Here is the code for _simple-component.component.ts_


```typescript
import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-simple-component',
  templateUrl: './simple-component.component.html',
  styleUrls: ['./simple-component.component.css']
})
export class SimpleComponentComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private http: Http) {
    this.http = http;
  }
  
  onError = function (e) {
    console.log("error", e);
  }

  //called unconditionally
  onComplete = function (url) {
    console.log("Completed:" + url);
  }

  makeRequest(id: number): void {

    //clear data and loading
    this.data = "";
    this.loading = false;

    let usersUrl = "http://jsonplaceholder.typicode.com/users"
    if (id) {
      usersUrl = usersUrl + "/" + id;
    }

    //start loading
    this.loading = true;

    //build request and subscribe to results.

    this.http.request(usersUrl)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)
      
      );
  }

  ngOnInit() {
  }

}
```

We are just gonna do this all at once.  The main code points to understand are:

  * We import HTTP and Response
  * in the constructor we inject HTTP as http
  * we build the url based on if there is an id or not and use _http.request_ to create the Observable.
  * we subscribe to it and convert the response to json in the _data_ property

![Form](https://github.com/robstave/angular2-training/blob/master/session-five/images/simple1.png "Simple")

If you click on id 1 or 2, it retrieves the data for that particular user, otherwise its all users.

When the result is done, the stream is complete.


Note:
You should be able do either

```typescript
 this.http.request(usersUrl).subscribe((res: Response) => { this.data = res.json() })
```

Or

```typescript
 this.http.request(usersUrl).map(response => response.json()).subscribe(result => { this.data = result })
```

Depending on if you want to subscribe to a stream of responses or a stream of json data.


## Http.request api

The interface for the http.request is explained in the source code.  One thing to get used to in the npm/angular world is browsing the source code.  If you have an ide like Visual code, you should be able to click into the http call directly.

Lets check out the code:

```typescript
  /**
   * Performs any type of http request. First argument is required, and can either be a url or
   * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
   * object can be provided as the 2nd argument. The options object will be merged with the values
   * of {@link BaseRequestOptions} before performing the request.
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    var responseObservable: any;
    if (isString(url)) {
      responseObservable = httpRequest(
          this._backend,
          new Request(mergeOptions(this._defaultOptions, options, RequestMethods.Get, url)));
    } else if (url instanceof Request) {
      responseObservable = httpRequest(this._backend, url);
    } else {
      throw makeTypeError('First argument must be a url string or Request instance.');
    }
    return responseObservable;
}
```

In our case, we just passed the url string, however there are several ways to use this interface.

 * String url
 * Url and options
 * Request

Also, we never really specified "GET", but there it is in the code as a default.


If you wanted a different operation, you would need to pass it in the options. For example if you wanted to specify PUT, you would need 
to add that [RequestMethod](https://angular.io/docs/ts/latest/api/http/index/RequestMethod-enum.html) in the args.

Here is the interface for the RequestOptionsArg.

```typescript
interface RequestOptionsArgs {
  url : string
  method : string|RequestMethod
  search : string|URLSearchParams
  headers : Headers
  body : any
  withCredentials : boolean
  responseType : ResponseContentType
}
```


## request parameters

The Http.request method takes an object that implements [RequestOptionsArgs](https://angular.io/docs/ts/latest/api/http/index/RequestOptionsArgs-interface.html)
as a second parameter.

The search field of that object can be used to set a string or a URLSearchParams object.

```typescript
    let params: URLSearchParams = new URLSearchParams(); //<--- Added
    params.set('food', "spam");//<--- Added
    params.set('bakedBeans', "off");//<--- Added

    //start loading
    this.loading = true;

    //build request and subscribe to results.

    this.http.request(usersUrl, { search: params }) //<--- Added
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)
      );
  }
```

![Simple2](https://github.com/robstave/angular2-training/blob/master/session-five/images/simple2.png "Simple")

So we see that we are adding the parameters to the url just fine.
Of course...we are getting a 304.  

This is not a biggee. It means that the server is telling you, hey its still the same value as last time. Take a picture it will last longer.

Kinda annoying.  Its not a very complicated server and the code is not complicated.

We could create an incr timestamp and that would make the url of every request unique.

Lets see if we can solve it with a header?

(Im making lemonade from lemons with this exercise)
  
  
## Headers

You can build headers into your Request object, or just pass them into that options arguement.

Lets say we wanted to pass a "Session-token" as well.  One way to do this is as follows.

```typescript
    let params: URLSearchParams = new URLSearchParams();
    params.set('food', "spam");
    params.set('bakedBeans', "off");


    let headers: Headers = new Headers(); //<--- Added
    headers.append("Cache-Control", "no-store"); //<--- Added
    headers.append("Access-Control-Allow-Credentials", "true"); //<--- Added
    headers.append("Session-token", "password"); //<--- Added

    //start loading
    this.loading = true;

    //build request and subscribe to results.

    this.http.request(usersUrl, { search: params, headers: headers }) //<--- Added
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      },
      (error) => this.onError(error),
      () => this.onComplete(usersUrl)
      );
  }
```
  
![Simple](https://github.com/robstave/angular2-training/blob/master/session-five/images/simple3.png "Simple")

ok..Im getting 200 now for the  request, but an OPTION.
This is a CORS thing.  When you have cross domain things going, the browser goes into higher alert and
gets a little more verbose when the requests are more than plain text.

Still, we see our headers, so we learned something. Move on.

**Protip:** Do not use _password_ for your _session-token_
 

### Other Header strategies

HTTP is extendible and is certainly a strategy we will be employing.  In any large project you will
find yourself adding things like session tokens to the header on a regular basis.

Angular1 had trick of just setting values in http._default.  Typescript does not really jive with this
so a better strategy will be to extend HTTP in some way.  

Some links that dive deeper are:

 * [Set Headers for every Request in Angular](http://stackoverflow.com/questions/34464108/angular2-set-headers-for-every-request)
 * [Extending http class in angular2](http://stackoverflow.com/questions/39675806/how-to-extend-angular-2-http-class-in-angular-2-final)
  

# Second example

A second example demonstrates a ajax lookahead strategy using Observables and the wikipedia api.

It is included in this session code directory, however, its probibly easier to follow the  
[Plunkr](http://embed.plnkr.co/GNi2FVAofVEzSUQ8kEYY/).


The takeaway code snippets here are: 
 * the service that gets the data and 
 * the input whose action spurs the lookup.

```typescript
  public search(term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
                .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
                .map((request) => request.json()[1]);
  }
```

The service sets the search parms and calls the API.  The response comes back as [JSONP](http://stackoverflow.com/questions/3839966/can-anyone-explain-what-jsonp-is-in-layman-terms) which
means json with padding.  Basically, a way around those pesky cross domain browser checks.

The data returned is an array and we pull out the [1] piece of data with out search results.


```typescript
 ngOnInit() {
    this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.wikiService.search(term));
```

As you can see above, we are using a few more of those tools in the RxJS toolbox.

* Debounce time adds a debounce to the input stream. We do not want to take action until 400 ms after a key is pressed.
* _distinctUntilChanged_ filters out repeats in the input stream
* Switchmap cancels out old calls (short answer). [Long answer is better described here](https://medium.com/@w.dave.w/becoming-more-reactive-with-rxjs-flatmap-and-switchmap-ccd3fb7b67fa)


Finally, notice that there is no subscribe here.  If we do not subscribe, how do we 
get the data?  In this case, the code is doing something a little different, but common
in Angular code.

Notice the async pipe. Thats doing the subscribe for you.

```html
    <div>
      <h2>Wikipedia Search</h2>
      <input type="text" [ngFormControl]="term"/>
      <ul>
        <li *ngFor="#item of items | async">{{item}}</li>
      </ul>
    </div>
```


Related links:

* [Reactive programming, HTTP and Angular 2](https://jaxenter.com/reactive-programming-http-and-angular-2-124560.html)
* [Intro to Http Module](https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.sw9e772vt)
* [HTTP Client in Angular.io](https://angular.io/docs/ts/latest/guide/server-communication.html) 
* [Groking RxJs](http://blog.danlew.net/2014/09/22/grokking-rxjava-part-2/)
* [Learn RxJS - Switchmap](https://www.learnrxjs.io/operators/transformation/switchmap.html)