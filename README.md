# wen

You're waiting for some arbitrary thing to load in your browser, or for something to happen, but that thing doesn't have an evented interface. What a pain in the butt.

**`wen` to the rescue!**

## Usage

```
var wen = require('wen');
var truth = wen();
var somePredicate; // Currently falsy

truth.on('the-thing-happened', function () {
	console.log('React to the thing that happened here!');
});

truth.add(function () {
	// At some point, some external force made somePredicate truthy
	return somePredicate;
}, 'the-thing-happened');
```

## Install

### NodeJS, Browserify, etc. (CommonJS)

```
npm install wen --save
```

### Good ol' fashioned Browser

Copy this into your HTML somewhere.

```
<script src="https://raw.githubusercontent.com/basicallydan/wen/master/dist/wen.1.0.1.min.js"></script>
<!-- If I want to do this properly I will download it and place it in my source code somewhere -->
```

Simple.

## How does it work?

Easy: you give it a predicate and some event name (whatever you want!), it checks every 1000ms (or less, or more, if you specify) if that predicate is truthy. When it finally is truthy, it'll trigger that event name. It extends an [Event Emitter](https://github.com/Wolfy87/EventEmitter), so in fact it will also have [all of the methods of the event emitter](https://github.com/Wolfy87/EventEmitter/blob/master/docs/api.md), such as `.once` and `.trigger`.

## Dependencies

There are only two direct dependencies. For the compiled `.min.js` version they are bundled so don't worry about it. They are:

* Wolfy87's Event Emitter, a lightweight event emitter which works well in browsers as well as in NodeJS.
  * ✓ Has no dependencies.
* vmattos's JS Extend, inspired by the Underscore _.extend method.
  * ✓ Also has no dependencies.

This makes for a total of two dependencies. You could probably read the entire source in about half an hour. I dare you.

## Changes

* 1.0.1: I forgot to make it browser friendly and didn't account for a dev error which I should've done. Now I have.
* 1.0.0: First.

## "FAQ"

### I cloned your repo what are those `makefile` files for?

Contributors who want to bundle the JS into the minified form (for the spec, too). Don't touch 'em unless you know what you're doing!

### Can I contribute?

Sure you can! If you have a suggestion, make an issue. If you've fixed something, open a pull request. This is a very simple module.

### Who made this, and when?!

Dan Hough ([@basicallydan](https://twitter.com/basicallydan) on Twitter and everywhere) did, while he was working as a contractor for [upmysport](https://upmysport.com).