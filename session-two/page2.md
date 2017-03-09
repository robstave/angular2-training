# Classes

Javascript itself does not support directly a class object. There is an existing prototype- based inheritance strategy that works 
with the language. Its still all basically functions. Typescript does a good job however wrapping this up so that it 
acts like an object.

 

You can create a class and even add fields, properties, constructors, and functions (static, prototype, instance based). The basic syntax for a class is as follows:

  
```typescript
class Car {  
    // Property (public by default)
    engine: string;

    // Constructor 
    // (accepts a value so you can initialize engine)
    constructor(engine: string) {
        this.engine = engine;
    }
}  
```
  
This code creates a Car class that has a constructor that accepts a single parameter 
engine that initializes the instance property with the same name. 

Now we can write:

```typescript
var hondaAccord = new Car('V6');  
```

The constructor method is created when the class is created and does the initial setup for the object.
Special note for Angular2. There is a difference between the constructor and in the onInit lifecycle
function. Save things that are truely just initializing the class for the constructor.
 
There can only be one constructor per class.

You can create functions in the class as well.  Behind they scenes, you are using the prototype

```typescript
class Car {  
    engine: string;
    constructor (engine: string) {
        this.engine = engine;
    } 

    start() {
        return "Started " + this.engine;
    }
} 
```

Go to https://www.typescriptlang.org/play/ and paste in the code to see the emitted code in Javascript.


You can create static functions as well.  These are functions that are NOT available in the instantiated class.


```typescript
class Person {
  name:string;
  age:number;

  constructor (name:string, age:number){
    this.name = name;
    this.age = age;
    
  }

  static canLegallyVote (p:Person){
    return p.age >= 18;
  }
}


var sam:Person = new Person("Sam", 21);

console.log(Person.canLegallyVote(sam))
```


[JSBin](http://jsbin.com/sididis/edit?js,console,output)

Note: you may need to edit the code to get it to recompile.

 
Other good links:
  * [Mozilla docs on Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
  * [Classes](http://www.typescriptlang.org/docs/handbook/classes.html)
  * [Typescript Classes and Interfaces](https://johnpapa.net/typescriptpost3/)

## Inheritance
Classes can implement Inheritance as well. 
Check this out on https://www.typescriptlang.org/play/ It certainly is not something you want to try in javascript.

```typescript
class Auto {  
    engine: string;
    constructor(engine: string) {
        this.engine = engine;
    }
} 

class ManlyTruck extends Auto {  
    bigTires: bool;
    constructor(engine: string, bigTires: bool) {
        super(engine);
        this.bigTires = bigTires;
    }
}
```

# Interfaces

Interfaces allow us to define complex type definitions.

  
```typescript
interface IPerson{  
    name: string;
    age: number;
}

class Person implements IPerson {  
    constructor (public name: string, public age: number) {
    }
} 
```

# Generics
Typescript allows for Generics as well. This is a way that you can reuse code and enforce it for specified types what would 
be defined a little later down the line.  Rather than have to specify a type like _String_ or _number_ , you could get the flexibility.
of _any_ yet have your type checked by using a _type variable_.

The simplest example you will run across is Array<Person>  which really is the same as Array[].  You could however extend this 
concept to functions to call hello<string>("bob")  or hello<number>(22) without having to create functions with any in the interface or
other harder to implement logic.


Im gonna just say read this:
https://www.typescriptlang.org/docs/handbook/generics.html


# Template Strings
These are certainly things that you will need to use in Angular2.
Template strings are used in the component and you can leverage some of the new features 
that basically eliminate the need for all those +'s.

## Variables in Strings
```typescript
var firstName = "Bob";
var lastName = "Smith";

// interpolate a string
var greeting = `My name is  ${firstName} ${lastName}`;
console.log(greeting);
```
Note these are backticks and not a single qoute.

## Multilines
With the back tick, you do not need to join the lines with all those +'s.

```typescript
`
<div>
  <p>
    Hello there
  </p>
 </div>
`
```


# Decorators

 From [Typescript.org](https://www.typescriptlang.org/docs/handbook/decorators.html)

> With the introduction of Classes in TypeScript and ES6, there now exist certain scenarios that require additional features to support annotating or modifying classes and class members. Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members. Decorators are a stage 1 proposal for JavaScript and are available as an experimental feature of TypeScript.
> To enable experimental support for decorators, you must enable the experimentalDecorators compiler option either on the command line or in your tsconfig.json:


Angular2 uses these features a lot.  Just think about all the @component and @Input things we saw earlier.

Lets look back at a tsconfig.json file that was created a while back in our angular cli session.

```typescript
{
  "compilerOptions": {
    "baseUrl": "",
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es6", "dom"],
    "mapRoot": "./",
    "module": "es6",
    "moduleResolution": "node",
    "outDir": "../dist/out-tsc",
    "sourceMap": true,
    "target": "es5",
    "typeRoots": [
      "../node_modules/@types"
    ]
  }
}
```

There it is. ` "experimentalDecorators": true`. We do not really need to dig any deeper than that.
Angular2 has added it for their tools and we just use the ones they have defined.




# Modules

Angular2 makes extensive use of the _import_ and _export_ statements.  

They are used to import functions, objects and other primitives that have been exported by other modules.

Applications are a collection of modules. Each module containing a cohesive collection of functionality.

Angular2 builds on top of that with @NgModule annotation to specify specific behaviors that relate to angular on top of that.

A general link is here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export



Here is a small example:
In it..we will export a function and a constant.

So we have chong.js that exports (makes public a knock funciton and a const.)

```typescript
//chong.js
function knock() {
  return "Its Dave!  I got the stuff";
}

const dave = "Dave is not here.";
export { knock, dave };
```

and cheech.js, that imports that data.

```typescript
//cheech.js
import { knock, dave } from './chong';

console.log(knock()); 
console.log(dave);   
```

Now lets compile and run it.

```bash
$ tsc *.ts
$ node cheech.js
Its Dave!  I got the stuff
Dave is not here.
```


-------------
Excellent followup reading:

* [TypeScript Deep Diveh](ttps://www.gitbook.com/book/basarat/typescript/details)
* [Learn Typescript in 30 minutes](http://tutorialzine.com/2016/07/learn-typescript-in-30-minutes/)
