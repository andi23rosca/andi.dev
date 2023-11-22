---
title: Let's make a programming language. A shitty one. Part 1
description: Does creating a programming language seems like magic. Like it's only reserved for the top 0.1% genius programmers? Well it shouldn't. Hopefully this article demystifies some of that.
date: 2023-11-22
draft: true
tags:
  - shitty-language-series
  - lang-dev
---
Does creating a programming language seems like magic. Like it's only reserved for the top 0.1% genius programmers?

Well it shouldn't. Hopefully this article demystifies some of that.

## Getting started

First of all, some constraints for the language:
- Implemented in JS.
- The programs should be parsable by `JSON.parse`. We don't want to waste time writing a parser (plenty of other articles online for that).
- Minimum of features. It should barely pass as a programming language if you squint hard enough.
- Parentheses everywhere (((((yes we're making a lisp inspired language))))).

You can follow along in a browser console or just read the article.

In this Part 1 we'll focus on a small slice of what could be considered a programming language.

We'll define some of the syntax of the programs, and implement a simple interpreter that can perform math operations.
A calculator with extra steps.

## Math, all languages can do math
We're used to the standard notation of math being chained with operators like so: `12 + 3 + 5 - 8 * 12`.

But that's not very easy to represent in a JSON object.

What if we considered a math operation to be a function that can be called with multiple arguments.
Something along the lines of:
```js
addition(12, 5)
```
Pretty verbose, so let's use the operator sign instead:
```js
+(12, 5)
```
That's still not JSON. The `+` is not a symbol we should be passing around, so let's make it a string:
```js
"+"(12, 5)
```
Ok, that's closer, but the parentheses don't mean anything to JSONs either, let's make the arguments a list:
```js
"+"[12, 5]
```
It's almost parsable now. The missing piece is the `+` being outside of the list and screwing things up. What if when we define a list, the first item is the function to be called, and the rest are the arguments?

The initial `addition(12, 5)` syntax, would turn into `(addition, 12, 5)`.

And our modified syntax would turn into:
```js
["+", 12, 5]
```

Look at that, we can definitely pass that text to a JSON parser and get back a list of 3 elements.

How do multiple operations like `25 - 4 + 6` work? <br />
We can just nest multiple lists:
```js
["-", 25, ["+", 4, 6]]
```
Or with slightly better formatting
```js
["-", 25,
      ["+", 4, 6]]
```

Yes it's ugly, but we're making the programming language version of:

<div>
{% image "./brutalist_building.jpg", "An ugly building facade made out of concrete" %}
<sub>Photo by <a href="https://unsplash.com/@jensaber?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jens Aber</a> on <a href="https://unsplash.com/photos/a-very-tall-building-with-lots-of-windows-dAJaJIGw9iI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></sub>
</div>



## Baby steps
We have some basic syntax, let's throw some code together to make it work.

The simplest form of program we can first tackle is running a single addition operation, with as many numbers as the user wants.

No nesting, no other math:
```js
const EVALUATE = (input) => {
	// first we destructure the program,
	// getting the function name and a list of arguments
	const [fn, ...arguments] = input;


	// Then we handle our addition operator
	// When the function is +, we sum up all the arguments
	if(fn === "+") {
		return arguments.reduce((sum, n) => sum + n, 0);
	}

	// And finally we can throw an error
	// If we don't recognize the function
	throw Error("Function not supported:", fn);
}

console.log(EVALUATE(["+", 4, 6, 23])) // should log 33
console.log(EVALUATE(["-", 10, 12])) // will throw an error
```

Nice, and now for handling subtraction:

```js
const sum = (numbers) =>
	numbers.reduce((sum, n) => sum + n, 0);

const EVALUATE = (input) => {
	const [fn, ...arguments] = input;

	if(fn === "+") {
		return sum(arguments);
	}
	if(fn === "-") {
		const [first, ...rest] = arguments;
		return first - sum(rest);
	}

	throw Error("Function not supported:", fn);
}

console.log(EVALUATE(["+", 4, 6, 23])) // should log 33
console.log(EVALUATE(["-", 10, 4, 6])) // should log 0
```

## Nesting
As mentioned before, if we want to do multiple operations, we need to nest lists within lists:
```js
["-", 25, ["+", 4, 6]]
```

How will our program know how to handle a list inside a list?
If we looked at the execution step by step, this is what would happen now:
1. Program is on `"-"`, enters the relevant if statement
2. Program gets first argument, the number `25` and wants to subtract the rest from it
3. Program encounters the list `["+", 4, 6]`, can't subtract it, throws error

At step 3, what we want the program to actually do, is see that there is a list there, and run `EVALUATE` on it.

The evaluate call with spit back out a number, in this case `10`, and then we can continue the subtraction to get `25 - 10`.

But a list can appear as any of the arguments, and lists can be nested infinitely inside each other.

```js
["-", ["+", 10, 5],
      ["+", 3,
            ["-", 12, 6]]];
// translates as (10 + 5) - 3 + (12 - 6)
```

Our program should be able to handle more complicated cases like these.


Going back to the code, what we want our program to do now, is to call `EVALUATE` on all of the arguments.
If one of the arguments is a list then it will get evaluated and turned into a resulting number.

```js
// in the EVALUATE function
const [fn, ...rawArguments] = input;
const arguments = rawArguments.map(arg => EVALUATE(arg));
```

But what about when an argument is a number?

The evaluator will try to destructure it on the first line, and throw an error.

A simple and elegant solution for that, is to add an extra case at the top of the evaluator where if the input is not a list, it should spit it back out and not try to evaluate it.
```js
const EVALUATE = (input) => {
	if(!Array.isArray(input)) {
		return input;
	}
```

Now when some of the arguments are numbers and the evaluator run this:
```js
const arguments = rawArguments.map(arg => EVALUATE(arg));
```
The arguments that are not arrays will just be returned back immediately.


## Full code

```js
const sum = (numbers) =>
	numbers.reduce((sum, n) => sum + n, 0);

const EVALUATE = (input) => {
	if(!Array.isArray(input)) {
		return input;
	}

	const [fn, ...rawArguments] = input;
	const arguments = rawArguments.map(arg => EVALUATE(arg));

	if(fn === "+") {
		return sum(arguments);
	}
	if(fn === "-") {
		const [first, ...rest] = arguments;
		return first - sum(rest);
	}

	throw Error("Function not supported:", fn);
}

console.log(EVALUATE(["+", 4, ["-", 3, 10]])) // should log -3
```

Bonus: Our code above will actually also work with infinite nesting situations.

Since we're always calling evaluate on arguments, we're also calling evaluate on arguments of arguments.

The complicated example we had above:

```js
["-", ["+", 10, 5],
      ["+", 3,
            ["-", 12, 6]]];
```

Will return `6` when evaluated.

We just did recursion and we didn't even need to think about things recursively.

Recursion is hard to wrap your head around if you're not familiar with it already, I recommend placing a `debugger;` statement at the top of the evaluator and going step by step through it in developer console of a browser.


## Part 2 coming soon

