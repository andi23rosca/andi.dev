---
title: There's no magic under the hood
description: No matter what technical challenge you are working on, or what stack you're using, never assume that the inner workings of your tools are magic.
date: 2023-12-10
featuredImage: ./magic.jpeg
featuredImageDesc: A wizard inspecting computer code
tags:
  - opinions
---

If anyone were to ask me what's the number 1 thing they could do to improve their technical skills, I would say to adopt the mindset that **there's no magic under the hood**.

## What does that mean?

It means everything you're working on is made out of code.

There's no magic incantation happening inside React that makes your variables reactive.

There's no spells powering the JS event loop in the browser.

No matter what stack you're using and what you're trying to implement, all the layers you depend on have been thought out and implemented by people.

And that means that they are comprehensible by humans, there's no magic to them. From top to bottom, it's _all_ code.

{% image "./all_code.jpeg", "Meme: It's all code? Always has been."%}

## How does adopting the mindset look like?

Understanding that everything is code and therefore comprehensible doesn't mean you should go out and learn how every single thing in your stack works, from the logic gates all the way to JS.

There's _thousands_ of man-hours that have gone into improving and refining each of these layers. So while they are understandable, there's definitely a time/effort concern that should be taken into account.

---

But, next time you run into an issue with a particular library and googling (or ChatGPTing) didn't offer any working solutions...

Think to yourself: _"What's this library made out of? **Code!**"_.

And if it's a JS library chances are you can easily find its github repository and start reading the source code.

Maybe you find out the function you're using is actually doing something different than what you thought it was. Maybe there's a bug, or the documentation is slightly wrong.

Either way, now you have the ability fix your issue and contribute to an open source project!

All because you didn't just assume that whatever your tool does is magic and there's no point to look at it more closely.

---

Repeat this for 50 issues you run into in the course of an year, and you'll naturally pick up on new coding patterns and ideas.

Next time there's an interesting challenge at your job, you'll be able to draw from all the breadth of knowledge you've accumulated and apply those patterns to novel issues.
