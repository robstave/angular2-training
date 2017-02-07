
# Session one

Into to Angular2, Angular cli, node and npm

# Node

Before doing much of anything, you will need to get Node.

https://nodejs.org/en/

From nodejs.org:

'''
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. The Node.js package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
'''

Basically, your running a headless browser that you can use as an javascript engine. 
It has its strengths and weaknesses. 
It is not good for intensely computational math type work and blocking operations.  
It is excellent for routing, http processing, proxies, serving up data and the like.  

Since angular runs on a browser, it makes sense that node is used to drive all sorts of things like tests, build scripts, web servers and tools while
using a common language to tie it all together.

Node includes NPM (NodeJS package manager). This is used to manage the packages needed to put together angular 2 projects.
Npm uses a command line interface that is best done through bash. I have had the best success with GIT bash on windows. If you are using 
a regular shell for your command line, and not getting anywhere, try launching Git bash as admin. 

https://git-for-windows.github.io/

## Small npm project

Lets start out with a super  small npm project to demonstrate how they are created and managed.


Create a directory navigate there with your bash shell.


'''
npm init
'''

Npm will now walk you through a series of steps to create a package.json file. Just set the defaults for now.

'''javscript
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
'''

This is the basic configutation file for your NPM project.  It will be used to track package dependancies, scripts, versions and the like.
Other tools tend to build upon this concept and might add additional *.json files to your directory.

'''javscript
{
  "name": "hellotest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "sayit": "ok, I am it"
  },
  "author": "",
  "license": "ISC"
}
'''















https://cli.angular.io/
