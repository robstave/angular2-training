# Typescript

What is it?
> A typed superset of Javascript that compiles to plain Javascript.

> TypeScript is a compile-to-JavaScript language that brings compile-time type checks, 
> classical object-oriented programming patterns, and powerful typing features to JavaScript.

https://www.typescriptlang.org/
 


There are actually plenty of languages out there that are supsets of Javascript.  There has got to be something that is missing?

Transpiled Languages Add Features

> One substantial advantage to transpiled languages is that they can add features. 
> This is one of TypeScript's main selling points, as it adds interfaces, abstract classes, algebraic data types, 
> and other features to JavaScript, which we wouldn't be able to use otherwise.

> The transpiled language implements a feature in raw JavaScript, 
> and lets you work with the interface without having to worry about the details. 
> Truth is, we do this even when we write normal JavaScript: We still use ES6-to-ES5 
> transpilers to write to use JavaScript's newest features, since the relatively small number of 
> people using browsers with reliable ES6 support is . . . Well, people like us.

https://scotch.io/tutorials/why-you-shouldnt-be-scared-of-typescript

So we get stronger type checking, which leads to less bugs, and more confidence in our refactorings.

Other Links:

*  https://vsavkin.com/writing-angular-2-in-typescript-1fa77c78d8e8#.ie24yt6w4

So why does angular2 use Typescript?

Google was going to have its own Language "AtScript" to include the features they wanted on top of vanilla js.
But they teamed with Microsoft and got what they wanted in the language.  

A good link for background is here:

https://www.infoq.com/articles/Angular2-TypeScript-High-Level-Overview

 
# Types

From personal experience, I found the lack of type checking in Javascript a bit unsettling at first.  Java has it, and the previous
language I used at Nortel (Protel) was so strongly typed that if you gave three engineers the same task...they would probibly write
the exact same code. It really does help prevent bugs in your code. Both by catching it as you are writing it in you IDE but also just
in general readability.

But, the nice thing is it is like the cub scouts.  
You can dress the full part, but you can also go to meetings in just the shirt and hat, or just the hat.

## Basic types

You can now declare types when you define your variables.

```typescript
var name: string
```

we can use them in functions as well

```typescript
function sayHello(name: string): string {
 return "Hello " + name;
}
```

If you use the results of this function as, say, a number. Typescript has the means to let you know otherwise.

## using TSC
Create a directory.  Lets just make sure that we have what we need.

```bash
$ tsc -v
Version 2.1.5
```

Cooking with gas.

Create the file bad1.ts

```typescript
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

You can also open the folder in visual code and see the errors from your IDE.


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
Enums are kinda more like ordered hashmaps. But for the most part, are numbers.


```typescript
enum Color {Red, Blue, Green, Orange, White, Purple};
var aColor: Color = Color.Green;

```

for example...lets run:
http://jsbin.com/xuyajovade/edit?js,console,output


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

```bash
"you see the color:2"
"They do not match"
```

Lets try another example.

http://jsbin.com/zirokokepe/edit?js,console,output


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




Enums work by naming numeric values. For instance, if we wanted to have a fixed list of roles a
person may have we could write this:
1 enum Role {Employee, Manager, Admin};
2 var role: Role = Role.Employee;
The default initial value for an enum is 0. You can tweak either the start of the range:
1 enum Role {Employee = 3, Manager, Admin};
2 var role: Role = Role.Employee;
In the code above, instead of Employee being 0, Employee is 3. The value of the enum increments
from there, which means Manager is 4 and Admin is 5, and we can even set individual values:
1 enum Role {Employee = 3, Manager = 5, Admin = 7};
2 var role: Role = Role.Employee;
You can also look up the name of a given enum by using its value:
1 enum Role {Employee, Manager, Admin};
2 console.log('Roles: ', Role[0], ',', Role[1], 'and', Role[2]);
Any
any is the default type if we omit typing for a given variable. Having a variable of type any allows
it to receive any kind of value:
TypeScript 64
1 var something: any = 'as string';
2 something = 1;
3 something = [1, 2, 3];
Void
Using void means there’s no type expected. This is usually in functions with no return value:
1 function setName(name: string): void {
2 this.name















Excellent Links

https://www.gitbook.com/book/basarat/typescript/details
