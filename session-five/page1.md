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


```typescript
  var subscription = source.subscribe(
     function(x){/*do onNext Stuff*/}),
     function(e){/*do onError Stuff*/}),
     function(){/*do onCompleted Stuff*/}) );
```

You can then chain all sorts of operations within the stream to do things like create observables, filter, transform, combine and so on. There is a [pretty big list](http://reactivex.io/documentation/operators.html) of operators to choose from.


You are using [pure](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.162sbqdgo)
functions, which means your not changing the data and there are no side effects.  Just like a regular math function.

For example, `Y=X+1` is pure...it does not mess with X.  `Z=Y*3` is as well.  

If X starts out as 3, then Y=4 and Z=8.  But X is still 3 when we are done.  

A function like `X=X+1` would not be pure because the value of X has changed.

Finally, streams are lazy.  You can set up a stream, but nothing happens unless you subscribe.

### Example with Interval
 
Here is a super simple example:
(note, Im using jsBin for this)


```typescript
var source = Rx.Observable.interval(500);

var subscription = source.subscribe(
  x => console.log(`onNext: ${x}`),
  e => console.log(`onError: ${e}`),
  () => console.log('onCompleted'));
```

 
 see [JSBin for above example](http://jsbin.com/yunoka/edit?html,js,console)

In this example, we create the stream with the Rx.Observable and add the operator [Interval](http://reactivex.io/documentation/operators/interval.html) which emits a number starting at 0 every 500ms.  Its the hello world of Observables.

It just keeps going and going. 


### RxJs Take

You can see that it does not stop.  You will not see the _onCompleted_ event.  Lets limit the stream with a stopping point.  We will use [take](http://reactivex.io/documentation/operators/take.html).


```typescript
var source = Rx.Observable.interval(500).take(10);

var subscription = source.subscribe(
  x => console.log(`onNext: ${x}`),
  e => console.log(`onError: ${e}`),
  () => console.log('onCompleted'));
```
see [JSBin](http://jsbin.com/tizoduy/edit?html,js,console)

We have added a new operator _Take_.  This limits our stream to x items...then stops the stream.

  
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

### Map

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

###  Zip

Here is an operation that makes total sense for anybody that has done async programming.
You have to wait for the results of a pair of calls....and they can really come in any order.

You need to match them up and output the results together.

You can use [zip](http://reactivex.io/documentation/operators/zip.html) for this.

```typescript
var sourceOne = Rx.Observable.fromArray([1,2,3]);
var sourceTwo = Rx.Observable.fromArray([10,20,30]);

const example = Rx.Observable
  .zip(
    sourceOne,
    sourceTwo 
  );
const subscribe = example.subscribe(val => console.log(val));
```

In this case we have two observables.  One is outputing `1 -> 2 -> 3` and the other is outputing `10 -> 20 -> 30`

Zip subscribes to both the streams and outputs and array of the values the moment they
all match up.

```
[1, 10]
[2, 20]
[3, 30]
```
The [JSBin is here](http://jsbin.com/vusocuy/edit?html,js,console)



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

