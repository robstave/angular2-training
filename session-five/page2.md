# Http

Now that we have done the nickle tour of observables and RxJS, lets dive into two HTTP examples.

The first is a simple page that gets data from a remote server and the second is a look ahead text box.

## Http module in NG2

The [Http](https://angular.io/docs/ts/latest/guide/server-communication.html) code in Angular is now split out to a separate module and needs to be imported into your application. It is no longer a part of the core. 

All projects generated with _angular-cli_ however still include it, so there is nothing particularly special we need to add here.

## Simple Http Request

This example is somewhat similar to the one in NG book to start with.

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

_app.module.ts_
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
```html
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