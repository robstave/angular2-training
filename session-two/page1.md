# Typescript

What is it?
> A typed superset of Javascript that compiles to plain Javascript.

> TypeScript is a compile-to-JavaScript language that brings compile-time type checks, 
> classical object-oriented programming patterns, and powerful typing features to JavaScript.

From: [typescriptlang.org](https://www.typescriptlang.org/)
 


There are actually plenty of languages out there that are supersets of Javascript.  There has got to be something that is missing?

[Transpiled Languages Add Features](https://scotch.io/tutorials/why-you-shouldnt-be-scared-of-typescript):

> One substantial advantage to transpiled languages is that they can add features. 
> This is one of TypeScript's main selling points, as it adds interfaces, abstract classes, algebraic data types, 
> and other features to JavaScript, which we wouldn't be able to use otherwise.

> The transpiled language implements a feature in raw JavaScript, 
> and lets you work with the interface without having to worry about the details. 
> Truth is, we do this even when we write normal JavaScript: We still use ES6-to-ES5 
> transpilers to write to use JavaScript's newest features, since the relatively small number of 
> people using browsers with reliable ES6 support is . . . Well, people like us.


So we get stronger type checking, which leads to less bugs, and more confidence in our refactoring process.

So why does angular2 use Typescript?

Google was going to have its own Language "AtScript" to include the features they wanted on top of vanilla js.
But they teamed with Microsoft and got what they wanted in the language.  One of these would be the 
decorators such as @Component that are extremely helpful for Angular.

Some good links for further reading:

 * [Why Typescript?](https://vsavkin.com/writing-angular-2-in-typescript-1fa77c78d8e8#.ie24yt6w4) - Victor Savkin was a member of the Angular Core team at Google and explains the background.
 * [High level Overview from InfoQ](https://www.infoq.com/articles/Angular2-TypeScript-High-Level-Overview)

# Types

From personal experience, I found the lack of type checking in Javascript a bit unsettling at first.  Java has it, and the previous
language I used at Nortel (Protel) was so strongly typed that if you gave three engineers the same task...they would probably write
the exact same code. Strong typing (enforced by a capable IDE) really does help prevent bugs in your code by enforcing interfaces/types.


## Basic types

You can now declare types when you define your variables.

```typescript
var name: string
```

We can use them in functions as well

```typescript
function sayHello(name: string): string {
 return "Hello " + name;
}
```

If you use the results of this function as, say, a number. Typescript has the means to let you know otherwise.

## using TSC
TSC is our [typescript](http://www.typescriptlang.org/) compiler.  It was installed when we installed typescript in session one.

Create a directory in bash to work in.  First, lets just make sure that we have what we need.

```bash
$ tsc -v
Version 3.1.4
```
Ok...Looks good.

Create the file _bad1.ts_.

```typescript
// bad1.ts
function sayHello(name: string): string {
 return "Hello " + name;
}

var result:number = sayHello("Cat");
```
As you can see, the result is expected to be a number, but the function returns a string.

Now compile it.
```bash
$ tsc *.ts
bad1.ts(5,5): error TS2322: Type 'string' is not assignable to type 'number'.
```

As you can see, typescript failed as it was expecting a string.

Fix it and run again
You will notice that there is now a Javascript file.
TSC has transpiled to Javascript.

You can also open the folder in [Visual Studio Code](https://code.visualstudio.com/) and see the errors from your IDE.

We will  not be using TSC....but this illustrates the relationship between Javascript and typescript.





## Built in Types

### String
Your basic String.
  
```typescript
var name: string = 'Rob';
```

### Number

Any type of numeric value. In TypeScript, all numbers are represented as floating point.

```typescript
var answer: number = 52;
```

### Boolean

```typescript
var married: boolean = true;
```

### Array

You can use either  Array<type> or type[]

 
```typescript
var music: Array<string> = ['Country', 'Western'];
var team: string[] = ['Cowboys', 'Rams', 'Eagles'];
var scores:  number[] = [18, 21];
```

### Enums
Enums are more like ordered hashmaps. But for the most part, are numbers.


```typescript
enum Color {Red, Blue, Green, Orange, White, Purple};
var aColor: Color = Color.Green;

```

For example...lets run this [plnkr](http://jsbin.com/tazufo/2/edit?js,console,output)
(note..you may need to edit the text a bit to force the Typescript to work)

```typescript
enum Color {Red, Blue, Green, Orange, White, Purple};

var aColor : Color = Color.Green;

console.log("you see the color:"+aColor);

var bColor: Color = Color.Red;

if (aColor == bColor){
  console.log("They match");
} else {
  console.log("They do not match");
}
```

Results:

```bash
"you see the color:2"
"They do not match"
```

Lets try another [example](http://jsbin.com/nusowut/edit?js,console,output)


```typescript
enum Color {Red =1 , Blue = 3, Green = 5, Orange = 7, White = 8, Purple};

for (i = 0; i < 11; i++) {
    console.log(i+" is:"+Color[i]);
}
```

gets

```bash
"0 is:undefined"
"1 is:Red"
"2 is:undefined"
"3 is:Blue"
"4 is:undefined"
"5 is:Green"
"6 is:undefined"
"7 is:Orange"
"8 is:White"
"9 is:Purple"
"10 is:undefined"
```

Try this:  Paste the code into the TYpescript playground and see how it transpiles
then see if this makes sense

https://jsbin.com/qijelic/1/edit?html,js,output


 
### Any
This Type can be any value. It is the default type if not specified.

```typescript
 var stuff: any = 33;
 stuff = 'Bananas';
``` 

### Void
Using void means there is no type expected. This is usually in functions with no return value:

```typescript
 function doIt(name: string): void {
   console.log("Doing nothing");
  }
```

# let and const

Typescript has two new varible types. _Let_ and _const_.

Let gives us a block scoped variable. Javascript never had this. You might not have even known this unless you ran jslint on 
some code that might have reused a variable in a loop. 

> var Variables in JavaScript are function scoped. 
> This is different from many other languages (C# / Java etc.) where the variables are block scoped. 
> If you bring a block scoped mindset to JavaScript, you would expect the following to print 123, instead it will print 456:

```typescript
var foo = 123;
if (true) {
    var foo = 456;
}
console.log(foo); // 456
```


> This is because { does not create a new variable scope. The variable foo is the same inside the if block as it is outside the if block. This is a common source of errors in JavaScript programming. This is why TypeScript (and ES6) introduces the let keyword to allow you to define variables with true block scope. That is if you use let instead of var you get a true unique element disconnected from what you might have defined outside the scope. 
> The same example is demonstrated with let:

```typescript
let foo = 123;
if (true) {
    let foo = 456;
}
console.log(foo); // 123
```

Taken from [Typescript Deep Dive - Let](https://basarat.gitbooks.io/typescript/content/docs/let.html)

 
[Const](https://basarat.gitbooks.io/typescript/content/docs/const.html) is similar to let in that its block scoped.  
It also prevents re-assignment.

```typescript
const x2 : number = 34;
x2 = 44;
```

```bash
bad2.ts(2,1): error TS2540: Cannot assign to 'x2' because it is a constant or a read-only property.
```



 
## A Revealing Example (pulled from stack exchange)

Here is a final example from Mozilla Developer Network that gives an example where var does not work as intended. 
 
```typescript
var a = [];
(function () {
   'use strict';
   for (let i = 0; i < 5; ++i) { // *** `let` works as expected ***
     a.push( function() {return i;} );
   }
} ());
console.log(a.map( function(f) {return f();} ));
// prints [0, 1, 2, 3, 4]

// Start over, but change `let` in the for loop to `var`.
// prints [5, 5, 5, 5, 5]
```

Try it yourself on [Plnkr](http://jsbin.com/gipadom/edit?js,console)


`var` fails us because all loop iterations share the same function-scoped i variable, which has the value 5 after the loop finishes.
 
	
 
Further Reading:
* [Variable Declarations in Typescripting Lang.org](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)


# Functions


They can be declared as named or anonymous

```typescript
// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x+y; };
```

Function parameters can be annotated just like variables.  We saw a little of this earlier.
In this case we are specifying that the input is a string and that it returns a number.

```typescript
function  sayHello(name:string) :number{
    return 2
 }
```

You can specify void as well.
```typescript
function  dontSayHello(name:string) :void{
    //do nothing
 }
```

If the return type is not specified, it in interpolated

```typescript
function doit (name:string, age:number) {
    return age;
}
var name2:string = doit("fred",32)
```

Even though the return type is not specified, it is determined from the code.

```bash
$ tsc *.ts
bad2.ts(7,5): error TS2322: Type 'number' is not assignable to type 'string'.
```



You can additionally compound annotations, sort of like an interface.

```typescript
//single type passed in 
function greet(name: string) {
   console.log("Hello :"+name);
}

greet("Bob");

//Object passed in.
function greet2(person: {name:string, age:number}) {
   console.log("Hello :"+person.name+" age:"+person.age);
}

greet2({name:"Bob", age:23});
```


## Fat Arrow

Better known as arrow functions, they are basically a shorthand for writing functions.

They utilize a => token  and are used mostly in anonymous functions to make things
more concise. They work like lambdas in other languages. 
It does take a little getting used to.  



### Examples
```typescript
var multiply = function(x,y) {
  return x * y;
}
```

can be written as

```typescript
var multiply = (x, y) => x*y;
```
We have lost the _return_ keyword because when omitting {}, single line arrow functions perform an implicit return.

Single parameters do not even require the parentheses. 

```typescript
var embiggen = x => x*2;
```

But zero parameters do, for obvious reasons.

```typescript
var highFive = () => 5;
```


They can be used to create Object Literals as well.
Recall an object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces {}. 

```typescript
var makeThing2 =  (id,name) => ({id:id, name:name });

console.log(makeThing2(3,"abc"))
```
The body needs to be wrapped in a () however in this case.

They come in handy with map/reduce functions and forEach situations.

```typescript
var users = [
    { name: 'Tom', age: 43 },
    { name: 'Dick', age: 22 },
    { name: 'Harry', age: 31 }
];

console.log(users.map(function(user) { return user.age; }));
//vs
console.log(users.map( user => user.age));
```

Here is a [JSBin](https://jsbin.com/xafufay/edit?html,js,console,output) to play with that has all the examples.

Note: If the JSBin seems hung, edit the code a bit. 


In addition, fat arrows to make use of _this_ better.  Javascript has some gotchas with _this_ 
that are managed better with arrows.  I will defer to this article to explain it better.

Take [this example from Freecodecamp](https://medium.freecodecamp.com/learn-es6-the-dope-way-part-ii-arrow-functions-and-the-this-keyword-381ac7a32881#.dzodrmkm6):


```javascript
var bunny = {
  name: 'Usagi',
  showName: function() {
    alert(this.name);
  }
};

bunny.showName(); // Usagi
```
[JSFiddle is here](https://jsfiddle.net/maasha/x7wz1686/)

In this case...the alert says "bunny".

What if we were to put access to this in its own function?

```javascript

// Test it here: https://jsfiddle.net/maasha/z65c1znn/
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks: function() {
    this.tasks.forEach(function(task) {
      alert(this.name + " wants to " + task);
    });
  }
};

bunny.showTasks();
// [object Window] wants to transform
// [object Window] wants to eat cake
// [object Window] wants to blow kisses

// please note, in jsfiddle the [object Window] is named 'result' within inner functions of methods.
```

In [this](https://jsfiddle.net/maasha/z65c1znn/) case, the value of this is...well...the window.

> Why does ‘this’ bind to the window object? Because ‘this’, always references the owner of the function it is in, for this case — since it is now out of scope — the window/global object.

If you have seen enough javascript code, you will have come across a snippet like:

```
var that = this;
```

It looks like a hack...[it is](http://stackoverflow.com/questions/4886632/what-does-var-that-this-mean-in-javascript)...and that is the work around that gets around this.  Literally.
 
Arrow functions (in ES6) get around the problem. _This_ refers to its current surrounding scope.

```javascript
var bunny = {
  name: 'Usagi',
  tasks: ['transform', 'eat cake', 'blow kisses'],
  showTasks() {
    this.tasks.forEach((task) => {
      alert(this.name + " wants to " + task);
    });  
  }
};

bunny.showTasks();
// Usagi wants to transform
// Usagi wants to eat cake
// Usagi wants to blow kisses
```

Test it [here](https://jsfiddle.net/maasha/che8m4c1/): 

> While in ES5 ‘this’ referred to the parent of the function, in ES6, arrow functions use lexical scoping — ‘this’ refers to it’s current surrounding scope and no further. Thus the inner function knew to bind to the inner function only, and not to the object’s method or the object itself.


That was a pretty complicated concept.  Fear not, with Angular2, you will get used to the arrow functions real quick.

Useful links:

 * [Deep Dive arrow functions](https://basarat.gitbooks.io/typescript/content/docs/arrow-functions.html)
 * [Arrow Function Examples](http://javascriptplayground.com/blog/2014/04/real-life-es6-arrow-fn/)
 * [ES6 Arrow Functions: The New Fat & Concise Syntax in JavaScript](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)
 * [Javascript is Sexy - Understand this](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)
 * [Arrow Functions and This](https://medium.freecodecamp.com/learn-es6-the-dope-way-part-ii-arrow-functions-and-the-this-keyword-381ac7a32881#.dzodrmkm6)


## Optional and default parameters

Functions can have optional parameters. This is similar in a way to how javascript works.  In javascript, nothing really stopped you from adding
more of less parameters to a function call. You just had to deal with a lot of undefined values. 
The optional parameters are indicated with a ? and should follow required parameters.



```typescript
enum Color { Red, Blue, Green };

function buildCar(make: string, color: Color, year: number, option1?: string, option2?: string): string {
    let str = "You have a " + year + " " + Color[color] + " " + make;
    if (option1) {
        str = str + " with " + option1;

    }
    if (option2) {
        str = str + " and " + option2;
    }
    return str;
}


var s1 = buildCar("Ford", Color.Red, 1994)
console.log(s1);

var s2 = buildCar("Ford", Color.Red, 1994, "leather seats")
console.log(s2);

var s3 = buildCar("Ford", Color.Red, 1994, "leather seats", "cup holder")
console.log(s3);
```

```bash
"You have a 1994 Red Ford"
"You have a 1994 Red Ford with leather seats"
"You have a 1994 Red Ford with leather seats and cup holder"
```
Play with it [here in JSBin:](http://jsbin.com/zalobe/edit?js,console,output)


Default parameters can be declared as well in the signature.  If so, they are optional.

 
```typescript
function orderCoffee(regular: boolean, withCream:boolean = false) {
	return 'I want a ' + (regular ? 'regular coffee ' : 'decaf coffee ') + (withCream ? 'with cream ' : 'no cream');
}
console.log(orderCoffee(true))
console.log(orderCoffee(true, true))
```

```bash
"I want a regular coffee no cream"
"I want a regular coffee with cream "
```

[JSBin](http://jsbin.com/neciwe/edit?js,console,output)



Typescript has [rest parameters](https://basarat.gitbooks.io/typescript/content/docs/rest-parameters.html) as well. 
These are similar to how they are used in Java with the `...arguementName` notation.


You can pass as many of the same type as you would like, or none at all. 
The compiler will build an array of the arguments passed in with the name given after the ellipsis (...).

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let hisName = buildName("John", " Jacob", "Jingleheimer", "Schmidt");
```
Try parsing this with the [Typescript playground](https://www.typescriptlang.org/play/)

Just paste the above into the playground or use tsc to transpile it.


For reference...this is the old way!

```typescript
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var hisName = buildName("John", " Jacob", "Jingleheimer", "Schmidt");
```

 [Page 2](page2.md)
 
 

  
