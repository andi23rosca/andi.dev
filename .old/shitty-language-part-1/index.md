---
title: Making a shitty programming language from scratch. Part 1
description: I believe the best way to learn how things work is to make your own shitty version of them from scratch. Does creating a programming language feel like some forbidden knowledge that only the top geniuses have access to? It shouldn't.
date: 2023-11-22
tags:
  - the-shitty-series
  - make-a-language
  - javascript
---

## Intro
I believe the best way to learn how things work is to make your own shitty version of them from scratch.

Does creating a programming language feel like some forbidden knowledge that only the top geniuses have access to? It shouldn't.

Welcome to what I call _the shitty series_, where we'll be reinventing all kinds of wheels, but badly.

<div>
{% image "./wobbly_wheel.png", "A badly drawn sketch of a wobbly bike wheel" %}
<sub>Wobbly Wheel, by me. NFT available for 500k</sub>
</div>

First installment: **Making a shitty programming language**.

## Getting started

First of all, some constraints for the language:
- Interpreter is implemented in JS.
- The programs should be parsable by `JSON.parse`. We don't want to waste time writing a parser.
- Minimum of features. It should barely pass as a programming language if you squint hard enough.
- Parentheses everywhere (((((yes we're making a lisp inspired language))))).

It's ok if some of the bullet points don't make sense. Here's some extra context about language development terms.

Feel free to skip to [here](#part-1) if you already know them.

### Syntax
The structure of a program. How the instructions look.

In JS, the syntax for defining a variable is `let name = value;` for example.

### Interpreter
**An interpreter** is a program that takes the text input of a program and executes the instructions. The interpreter can be implemented in any existing programming language, in our case JavaScript.

An interpreter for math would take this text input
```txt
2 + 5 - 3
```
and execute it so that it results in `4`.

### Parser
**A parser** is the part of the interpreter that takes the text input and translates it into a format the the implementation language can understand.

In our case, since we're using JS, instructions would be in a JSON format.

So the parser could take the text
```txt
2 + 5 - 3
```
and translate it to a list that the interpreter can then go over and execute
```js
[2, "+", 5, "-", 3]
```

Most literature online for making languages spends a lot of time focusing on parsers. That's the first step that needs to happen before you can implement the execution of instructions.

I want this series to be focused on what makes programs tick and how a language runs code internally. That's why one of our constraints is that the syntax for our program should already be a valid JSON. That way JS can understand it without extra parsing.

Taking the math example, we'd define the program directly as a JS list, instead of a string input:
```js
const program = [2, "+", 5, "-", 3];
```

### Lisp
Lisp is a family of languages known for their weird syntax with a lot of parentheses.

They're a good place to draw inspiration from for toy languages because the syntax is very minimal. But you don't need to know anything about them to follow along.

## Part 1

In Part 1 we'll focus on a small slice of what could be considered a programming language.

We'll define some of the syntax of the programs, and implement a simple interpreter that can perform math operations.
A calculator with extra steps.

## Math, all languages can do math
We're used to the standard notation of math being chained with operators like so:
```
12 + 3 + 5 - 8 * 12
```

But remember we're trying to define our syntax in a way that we can store it in a JS object.

So let's take it step by step:

What if we considered a math operation to be a function that can be called with multiple arguments.

From
```js
12 + 5 + 3
```
To
```js
addition(12, 5, 3)
```
Pretty verbose, so let's use the operator sign instead:
```js
+(12, 5, 3)
```
That's still not valid. We can't store the `+` in a JSON, better make it a string.
```js
"+"(12, 5, 3)
```
Ok, that's closer, but the parentheses don't mean anything to JSON either, let's make the arguments a list:
```js
"+"[12, 5, 3]
```
It's almost parsable now. The missing piece is the `+` being outside of the list and screwing things up.

We could move it into the list:
```js
["+", 12, 5, 3]
```
We now have perfectly valid JSON syntax, but the function is in the same list as the arguments.

That's not an issue though, we can just decide that in our language's syntax, the first item in a list is a function to be called, and the rest of the items are it's arguments.

It's like going from `addition(12, 5, 3)` in JS to `(addition, 12, 5, 3)` and then converting that to a JSON list.

One more thing to figure out. How should multiple operations like `25 - 4 + 6` be defined?

We can just nest multiple lists:
```js
["-", 25, ["+", 4, 6]]
```
Or with slightly better formatting
```js
["-", 25,
      ["+", 4, 6]]
```

Yes it's ugly, but remember we're making the language version of a brutalist building:

<div>
{% image "./brutalist_building.jpg", "An ugly building facade made out of concrete" %}
<sub>Photo by <a href="https://unsplash.com/@jensaber?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jens Aber</a> on <a href="https://unsplash.com/photos/a-very-tall-building-with-lots-of-windows-dAJaJIGw9iI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></sub>
</div>



## Baby steps
We have our basic syntax, let's throw some code together to make it work.

We should start small, with the simplest program we can make. An interpreter that takes a single addition operation, adds up all the numbers, and returns the sum.

No nesting, no other math.

We'll call the main interpreter function `EVALUATE` and calling it like so
```js
EVALUATE(["+", 4, 6, 23])
```
Should return `33`.

Here is the code to make that happen
```js
const EVALUATE = (input) => {
	// first we destructure the input,
	// getting the first argument as the function to call
	// and the rest of the items as the arguments of the function
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
// Extracted the sum to a function
const sum = (numbers) =>
	numbers.reduce((sum, n) => sum + n, 0);

const EVALUATE = (input) => {
	const [fn, ...arguments] = input;

	if(fn === "+") {
		return sum(arguments);
	}
	if(fn === "-") {
		const [first, ...rest] = arguments;
		// we subtract all other numbers from the first one
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

If we looked at the execution of `["-", 25, ["+", 4, 6]]` step by step, this is what would happen now:
1. Program is on `"-"`, enters the relevant if statement
2. Program gets the first argument, the number `25` and wants to subtract the rest from it
3. Program encounters the list `["+", 4, 6]`, can't subtract it, throws error

At step 3, what we want the program to actually do, is see that there is a list there, and run `EVALUATE` on it.

The evaluate call will spit back out a number, in this case `10`, and then we can continue the subtraction to get `25 - 10`.

But a list can appear as any of the arguments, and lists can be nested infinitely inside each other.

```js
const program = ["-", ["+", 10, 5],
                      ["+", 3,
                            ["-", 12, 6]]];
// translates as (10 + 5) - 3 + (12 - 6)
```

Our program should be able to handle more complicated cases like these.

That means that we should be calling `EVALUATE` on all of the arguments of a list, just in case any of them are lists themselves.

```js
// in the EVALUATE function
const [fn, ...rawArguments] = input;
const arguments = rawArguments.map(arg => EVALUATE(arg));
```

But what about when an argument is a number?

Calling `EVALUATE` on a number will throw an error, since the first line is us destructuring the input:
```js
const [fn, ...arguments] = 6; // JS doesn't like that
```

A simple and elegant solution for that, is to add an extra case at the top of the evaluator where if the input is not a list, it should spit it back out and not try to evaluate it.
```js
const EVALUATE = (input) => {
	if(!Array.isArray(input)) {
		return input;
	}
```

Now when some of the arguments are numbers and the evaluator runs this:
```js
const arguments = rawArguments.map(arg => EVALUATE(arg));
```
The arguments that are not arrays will just be returned back immediately.

A nice side-effect of handling it this way is that now, a single number is also a valid program.

```js
const result = EVALUATE(3); // works and returns 3
```

## Full code

```js
const sum = (numbers) =>
	numbers.reduce((sum, n) => sum + n, 0);

const EVALUATE = (input) => {
	// Handling base case of numbers being evaluated
	if(!Array.isArray(input)) {
		return input;
	}

	const [fn, ...rawArguments] = input;
	// evaluating all arguments to handle nested lists
	const arguments = rawArguments.map(arg => EVALUATE(arg));


	// handling supported functions
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

> Bonus: Our code above will actually also work with infinite nesting situations.

Since we're always calling evaluate on arguments, we're also calling evaluate on arguments of arguments, and arguments of arguments of arguments, etc.

Whenever there's a list inside a list, we call evaluate on the nested list's arguments as well, and so on.

The complicated example we had above:

```js
["-", ["+", 10, 5],
      ["+", 3,
            ["-", 12, 6]]];
```

Will return `6` when evaluated.

We just accomplished recursion and we didn't even need to think about things recursively.

<aside>

	Recursion is hard to wrap your head around if you're not familiar with it already, I recommend placing a `debugger;` statement at the top of the evaluator and going step by step through it in developer console of a browser to get a more intuitive understanding of what's going on.

	It's an important concept to grasp for language development, since most useful languages have syntax that is recursive in nature, i.e. you can nest things inside of things infinitely.

</aside>

## Part 2 coming soon

Stay tuned for Part 2, we'll implement defining variables next.
