# <p align="center">Learning to Unit Test</p>

<p align="center">
    I haven't been as excited for coding again since boot camp
</p>

<p align="center">
    <img alt="GIF of cannonball pool scene from film The Sandlot" src="https://media.giphy.com/media/3ohzdLFxnwyFeNhtTO/giphy.gif" />
</p>


---

> *tl;dr*

> *learn to cook an egg properly, love your unit tests, and in the process find your voice*

---

## Backstory

That might sounds like a whole load of click-chum, but the elation is real ladies and gentlemen of social media.

As soon as I got laid off from Boeing when Coronavirus hit, I set out to improve my resume site and online presence.  It has been quite a journey of discovery, both of self and code. That code started as a [simple design](https://codeburst.io/how-i-created-seo-friendly-portfolio-cv-website-and-hosted-it-on-github-d5c4da43cf2f). As developers are wont to do, [features](https://dev.to/amruthpillai/ever-dreamed-of-a-free-and-open-source-resume-builder-that-doesn-t-store-your-data-meet-reactive-resume-1dpl) were added and even design elements found from looking at the [docs](https://html2canvas.hertzen.com/) of said features.

Eventually it was hosted on Azure. In order to stick within the limits of my budget (hosting is expensive!), I had to be creative in order to able to have both [testing](https://https://shortpoet-test.azurewebsites.net/) and [production](https://shortpoet.azurewebsites.net/) environments, as well as [my URL](https://shortpoet.com) which is actually hosted on GitHub pages and simply points to the data API endpoint served up by the azure app.

Hundreds of [commits](https://github.com/shortpoet/Shortpoet/commits/dev) later, it was live.  A simple app, yet many points of possible failure, and I had only experienced a few. So enter testing. I finally started to get a grasp on things after rolling up my sleeves and writing some of my very first unit test factory functions.

Realizing that I have written code that prevents me from arbitrarily changing method names makes the kid that liked to play count the lines skipped with each foot come right out to play again.

And it's at this moment that I was inspired to put thoughts to keyboard and cobbled together the framework for this article.

I am writing for 3 reasons:

- [LinkedIn](https://www.linkedin.com/in/carlos-soriano/) [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization)

- So I remember how happy success makes me feel next time I'm ready to give up when learning something new

- To offer a nugget or two of wisdom to future Carlos or other seekers of information

---

As I was staring blankly at the bare bones of an outline, lost in despair, thinking

> This is why I started disliking school, grrr, I HATE TO WRITE!!!

Argh, and also, kinda pathetic lol.  I'm sure we all suffer from writers block. It's a form of stage fright really. Another feeling with which, as a former "actor," I am not unfamiliar. We've all heard the advice - imagine your audience in their underwear.  I'm not sure how that's less intimidating - but there is some wisdom to be teased out. As usual, it's all a matter of perspective.

Well, that's easier if you:

1) have an audience
2) can address them directly at will

Luckily, in this situation, I realized in the shower, I have both.  Oh wait, I forgot to mention...

So I did what one should when suffering from writer's block - took a shower and got ready for a date at a supermarket - love in times of corona eh. And then it dawned on me...

I just need to decide who my audience is, duh! 🙄 Right. Now who are you, again?

- Are you my close friends and family who will (one can only hope) read this out of support?

- Another random recruiter who sends specific job requirements that totally don't match my skill-set, asking if I have the time to connect?

- Are you someone who is actively pursuing [LinkedIn](https://www.linkedin.com/in/carlos-soriano/) SEO for themselves, and so here you are?

- Who knows really. Maybe you googled unit tests and were hoping to find the holy grail that makes your code an [adamantium](https://en.wikipedia.org/wiki/Adamantium)-framed beast.

In any case, if one things seems most certain, is that it would be a fool's errand to try and please all of you.

So here I am, finding that, I guess I'm writing for myself:

- The past me that didn't do it
- The now me that wants to get this done
- And the future me that will undoubtedly cringe yet realize that the journey was all worth it

Well since I'm actually gonna post this, the hope is to inspire fellow knowledge nodes who wish to expand their reach.

---

## Unit Testing

Right, down to business. So, what are unit tests and why do I love them?

1) You write code that does a thing. 

2) You write other code that does another thing. 

3) You keep doing this until there are so many things, often depending on each other, that eventually a new thing breaks everything.

Think house of cards. Yes, more software than you would like to know resembles a house of cards. Well, unit tests are checks, think of it as glue, that hold things together. A contract you make with your future self (or collaborators) that this UNIT of code does a thing and only that thing.

The unit thing is the tricky part and also the beauty. I had to refactor much of my code into more defined units to be easily testable. This made me learn so much, that as a largely self-taught dev, I had missed along the way.

Most could boil an egg. The day you're bored and decide to get out the stopwatch (the one on your phone will do in a pinch if you happen to have the time on your hands 😉). You learn exactly what a difference a minute can make, or perhaps starting with cold or boiling water. The variations could be endless, much like with code. So you test, find your preference, and set a contract with your future self to do it right. Eventually, it becomes like second nature. Memory, as we know, is both physical as well as metaphysical.

---

One anecdote - in one version of my methods, code that was causing the browser to hang was due to not having caught a difference in file extensions. Logically, the PNG was taking up far more compute that the JPEG and hence the hang. I had figured it was because of the dependencies, or maybe some misconfiguration on my part. Nope. Just a file extension. Well, in the future, that test will keep me sane.

---

For the [future](https://www.shortpoet.com) (because this is finally looking like a solid post!)...

That file extension is a great opportunity to practice what is known as [TDD](https://en.wikipedia.org/wiki/Test-driven_development) or test driven development.  Basically, one would write a test that would check a method enabling the API to switch between file extensions - such feature! And the way that will work (future Carlos!) is that you will write the test case that should pass (egg boils at perfect temperature) and then write that code that ensures that action (the test passes - a perfect egg).

So in conclusion, learn to cook an egg properly, love your unit tests, and in the process find your [voice](https://www.shortpoet.com/articles).

--- 

Originally published at: 
https://www.shortpoet.com/articles/learning-to-unit-test-en

---

[Spanish translation](https://www.shortpoet.com/articles/learning-to-unit-test-es)