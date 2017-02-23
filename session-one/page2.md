
# Installing tools for Angular CLI

 
## Typescript

First lets install typescript. Since we will be using this all over, and certainly be using the lastest and greatest version we can install as follows.

```bash
npm install -g typescript
```
Yes we used -g in the case :+1:

if you had it installed and want to update it:
```bash
npm update -g typescript
```
 
 
## Angular CLI
 
This is a tool that is used to manage Angular2 projects. You can create your projects on the command line as well as do repetitive tasks
like add components, pipes, servies and the like.  A tool like this is generally preferred to start out with.  It will also
add test shells on the fly.

Other tools like this are Yeoman, webpack, and any number of "seed" projects.  

Ultimately, its all [webpack](https://web-design-weekly.com/2014/09/24/diving-webpack/) to some degree in the end.
Its a bit similar to NPM in that it also manages dependancies and has a json configuration file.  But it also
manages CSS files and assets, pre and post processes and runs tasks like grunt, or Ant.

Webpack will be explored in depth later.  For now, lets just say we have a cli to build our project.

The website makes it look so easy.   

See [cli.angular.io](https://cli.angular.io/)
or [github.com/angular/angular-cli](https://github.com/angular/angular-cli)
 

```bash
npm install -g angular-cli
```

Again, this is global.

Now we have the _NG_ cli command.

Again, if you were so inclined, you could install this locally to lock into a particular version...but you probibly want this global.

Use the cli to create the project.
Create a new directory to work in.  It will create a subdirectory with your project.

```bash
ng new my-project
```

This will run for a bit while all those dependences are added.

```
$ tree -F -L 1
 .
├── README.md // an useful README
├── angular-cli.json // angular-cli configuration file
├── e2e/ // end to end tests
├── karma.conf.js // unit test configuration
├── node_modules/ // installed dependencies
├── package.json // npm configuration
├── protractor.conf.js // e2e test configuration
├── src/ // application source
└── tslint.json // linter config file
```

We see our old friends _package.json_ and _/node_modules_ as well as some new configuration files for Typescript, testing, and angular-cli

If we go into /src, we will see the code that the project has created an _index.html_ file.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>MyProject</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root>Loading...</app-root>
</body>
</html>
```

Two things to point out.  The "base".  Thats new...and for now, lets just call that our starting point url route.

There is also the _app-root_. This is the component that is the entry point into our project.  If we were to just load this 
file in a browser, it would say "Loading..." and thats about it. With angular running, we will inject our application here.
However, you cant just drop index.html on a browser and expect it to work.  You need an http server running and you
point your browser to the appropriate port.  Luckily, that is all included.


## Start the server

The angular-cli commmand is used to kick off a server and watcher as well.



```bash
$ ng serve
** NG Live Development Server is running on http://localhost:4200. **
Build successful - 1342ms.
```

The application is now running on localhost port 4200.
http://localhost:4200

And there you have it.

*App works!*

-----
[Next page](page3.md)
 