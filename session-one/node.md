
# Session one

Into to Angular2, Angular cli, node and npm

# Node and NPM

Before doing much of anything, you will need to get Node.

https://nodejs.org/en/

From nodejs.org:

_Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. The Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world._

Basically, your running a headless browser that you can use as an javascript engine. 
It has its strengths and weaknesses. 
It is not good for intensely computational math type work and blocking operations.  
It is excellent for routing, http processing, proxies, serving up data and the like.  

Since angular runs on a browser, it makes sense that node is used to drive all sorts of things like tests, build scripts, web servers and tools while
using a common language to tie it all together.

Node includes NPM (NodeJS package manager). This is used to manage the packages needed to put together angular 2 projects.
Npm uses a command line interface that is best done through bash. If you want, a tool like cygwin will work.

I have had the best success with GIT bash on windows. If you are using a regular shell for your command line, and not getting anywhere, try launching Git bash as admin. 

https://git-for-windows.github.io/

## Small NPM project

Lets start out with a super small npm project to demonstrate how they are created and managed.  

Create a directory and navigate there with your bash shell.

```bash
npm init
```

Npm will now walk you through a series of steps to create a package.json file. Just set the defaults for now.

```javascript
{
  "name": "hellotest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

This is the basic configutation file for your NPM project.  It will be used to track package dependancies, scripts, versions and the like.
Other tools tend to build upon this concept and might add additional *.json files to your directory.

Edit the scripts entry as so.


```javscript
{
  "name": "hellotest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "sayit":  "echo \"I am it\""
  },
  "author": "",
  "license": "ISC"
}
```

now run the package command.

```bash
npm run sayit
```

Ok...now we are cooking with gas.
We get the echo to work and have demonstrated that we are working pretty well.

NPM manages a whole repository of tools that are used either in your projects or can be installed as command line tools.

Check out 
https://www.npmjs.com/package/hello-world-server

This is a little http server that returns hello world if you navigate to localhost:3000.

On the website, the project says to run: 

```bash
[sudo] npm install -g hello-world-server
```

Lets not do that right away and take that apart a bit first.

The SUDO is needed if you are running from a regular bash.

The -g flag means to install globally.  When this happens, you will install the package somewhere
on your machine an a path is added to point to it.

Do we really want that? No.
Why? Well, there are plenty of things that you just want to run in a local directory.
For example, if you want to lock in a particular tool version across all users of a project.

Lets install this locally.

```bash
[sudo] npm install hello-world-server --save-dev
```

The --save-dev install the software and adds it as a project dependency.


```js
{
  "name": "hellotest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "sayit": "echo \"I am it\""
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "hello-world-server": "^1.1.3"
  }
}
```

Notice there is now a new directory as well. *Node_modules*.  This is where a the dependancies are stored.  Its HUGE.

Now, think back on the -g command. If we installed the command as global, all of these would be in the global repo as well.
At some point, there would be perhaps conflicts.  At best, if you had a lot of global commands, they might force each other to the update each other.

So we installed the package, lets see it run.
If you run the command:

```bash
hello-world-server
```

Nothing happens...you prob will get an error. It was not added to the global path. There is a bin there somewhere

```bash
npm bin
```

This is where the bin files are.  If you search in there, you will see the cmd files.

Lets do one more edit to our package.json file. We will edit the scripts to add the command.

```js
{
  "name": "hellotest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "runserver": "hello-world-server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "hello-world-server": "^1.1.3"
  }
}
```

Now run the file from the project

```bash
npm run runserver
```

And now the file runs. You will find that pointing your browser to localhost:3000 says hello world.


Looks great.  One last trick.

Delete the node_modules directory.  Gone. (keep the project.json though)

now run:

```bash
npm update
```

Boom, your project is back. You should always be able recover this way. You always check in without the node_modules directory and you should be able to get back with nom update.



### Refs and links

http://www.2ality.com/2016/01/locally-installed-npm-executables.html



























https://cli.angular.io/
