
# Session one

Into to Angular2, Angular cli, node and npm.

# Node and NPM

Before doing much of anything, you will need to get [Node](https://nodejs.org/en/).

It is an executable, so install as instructed.

From [nodejs.org](https://nodejs.org/en/):

> Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. The Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

Basically, your running a headless browser that you can use as an javascript engine. 
It has its strengths and weaknesses. 
It is not good for intensely computational math type work and blocking operations.  
It is excellent for routing, http processing, proxies, serving up data and the like.  

Since angular runs as javascript on a browser, it makes sense that node is used to drive all sorts of things like tests, build scripts, web servers and tools while
using a common language (javascript) to tie it all together. Javascript is either becoming a real good language or is following the [law of least power](https://www.w3.org/2001/tag/doc/leastPower.html).


Node includes [NPM](https://docs.npmjs.com/cli/) (NodeJS package manager). This is used to manage the various pieces of code needed to put together angular 2 projects.
These are called packages, and there are a lot of javascript packages out there. Some are very simple, many are on Github, and all written by random folks.
Even a small project can end up with megabytes of script in its repository with dependencies upon dependencies.  Don't worry
about it much for now...but be aware that its there.

Think of npm as Maven for Javascript.

Npm uses a command line interface that is best done through bash. If you want, a tool like cygwin will work. Macs and unix just do what they do.

I have had the best success with GIT bash on windows. If you are using a regular shell for your command line, and not getting anywhere, try launching Git bash as admin. 

[Git for windows](https://git-for-windows.github.io/)


## Small NPM project

Lets start out with a super small npm project to demonstrate how they are created and managed.  

You have Node installed right?  Npm comes with it.

Create a directory and navigate to it from your bash shell. Run the [npm init](https://docs.npmjs.com/cli/init) command

```bash
npm init
```

Npm will now walk you through a series of steps to create a _package.json_ file. Just set the defaults for now.

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

This is the basic configuration file for your NPM project.  It will be used to track package dependancies, scripts, versions and the like.
Other tools tend to build upon this concept and might add additional *.json files to your directory.

Edit the _scripts_ property in package.json entry as so.


```javascript
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

And it says what we expect. Hello world if you will. We got the echo to work and have demonstrated that we are set up and running.

NPM manages a whole repository of tools that are used either in your projects or can be installed as command line tools. Lets install
a package and explore it a bit.

Check out 
https://www.npmjs.com/package/hello-world-server

This is a little http server that returns _hello world_ if you navigate to localhost:3000.

On the website, the project says to run: 

```bash
[sudo] npm install -g hello-world-server
```

Lets not do that right away and take that apart a bit first.

The SUDO is needed if you are running from a regular bash. (In windows you might need to launch GIT bash as admin).

The -g flag means to install globally.  When this happens, you will install the package somewhere
on your machine and a path is added to your environment to point to it.

Do we really want that? No.
Why? Well, there are plenty of things that you just want to run in a local directory.
For example, if you want to lock in a particular tool version across all users of a project. If everybody
installed their own version globally, there would be no consensus (particularlly if two projects on the same machine
used different versions).  

So, sometimes you install globally, sometimes locally.

Without the -g is local. 
```bash
[sudo] npm install hello-world-server --save-dev
```

The --save-dev install the software and adds it as a project dependency in your _package.json_.

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

Notice there is now a new directory as well. */node_modules*.  This is where a the dependancies are stored.  Its HUGE.

Now, think back on the -g command. If we installed the command as global, all of these would be in the global repo as well.
At some point, there would be perhaps conflicts.  At best, if you had a lot of global commands, they might force each other to the update each other.

So we installed the package, lets see it run.
If you run the command:

```bash
hello-world-server
```

Nothing happens...you prob will get an error. Since it was not installed globally, it was not added to 
the global path. So really, most readme packages will tell you to install globally so it can easily be
run from the command line.

(note: it might work just fine in unix...dunno)

There is a bin there somewhere...you do not need to pollute your paths.

Run the [bin](https://docs.npmjs.com/cli/bin) command.

```bash
npm bin
```

This is where the bin files are.  If you navigate to that directory, you will see the cmd files.

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

## Npm Update

Kill the server and delete the _/node_modules_ directory.  Gone. (keep the project.json though)

now run:

```bash
npm install
```

Boom, your project is back. You should always be able recover this way. This is because the versions of all
the packages are in the package.json file.  If you look at the file, you see

```
  "hello-world-server": "^1.1.3"
```
There are versioning rules.  Generally, you will not have to mess with this much, but you can use things like ^, * and ~ 
to say you only want major updates, minor updates or lock the version.  It is called [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning).

You always check in your code without the node_modules directory and you should always be able to get the state of your
project back with _npm update_ or _npm install_.  Both work, but its [good to know the difference](http://stackoverflow.com/questions/12478679/npm-install-vs-update-whats-the-difference)

Note...a side effect of this that you only specifiy a few dependencies and NPM figures out the rest.  Sometimes you will need to
run update a few times.

## Refs and links

[Running locally installed npm executables](http://www.2ality.com/2016/01/locally-installed-npm-executables.html)


[Next page](page2.md)









 