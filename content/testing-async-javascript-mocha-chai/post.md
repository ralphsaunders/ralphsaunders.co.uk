Title: Testing Async JavaScript with Mocha & Chai
Date: 2017-03-01 20:02
Modified: 2017-03-05 00:21
Category: FED
Tags: javascript
Slug: testing-asynchronous-javascript-with-mocha-chai
Authors: Ralph Saunders
Featured_Image: ./images/dist/async-javascript-mocha-chai/opengraph.png
Summary:

Writing unit tests for asynchronous JavaScript can present issues. Unit testing
frameworks that are around now can handle Promises, allowing us to write unit
tests that asynchronously fetch data. Async DOM manipulation however is often
not explicitly discussed – perhaps unit testing DOM manipulation is a fools
errand? Nonetheless I spent some time figuring out how to write a unit test for
a piece of JavaScript that used RequestAnimationFrame when doing DOM
manipulation.

A few years ago I wrote about [managing unit testing workflow using
Karma](./karma-unit-testing.html), using Jasmine as my go-to framework. I went
on a bit of a journey and it turns out that [Jasmine does have asynchronous
support](https://jasmine.github.io/2.5/introduction#section-Asynchronous_Support),
but the examples below were achieved with [Mocha](https://mochajs.org/) and
[Chai](http://chaijs.com/) (although they basically read pretty much exactly the
same).

Mocha makes writing asynchronous unit tests [really
easy](https://mochajs.org/#asynchronous-code) by adding callback support. It
also has [great Promise support](https://mochajs.org/#working-with-promises),
and if that's not enough you can get an even nicer syntax using Chai and the
[Chai as Promised](https://www.npmjs.com/package/chai-as-promised) package.

After finding out about all of that, it turned out that I just needed to use
callbacks when writing async DOM manipulation unit tests. Here's an example test
for my "bleepBloop" module, which outputs passed strings into the DOM
asynchronously using RequestAnimationFrame.

	describe('bleep bloop', function() {
	    beforeEach(function() {
	        // Mock DOM here
	    });

	    it('should async DOM manipulate', function(done) {
	        bleepBloop.asyncBleep('Hello');

	        setTimeout(function() {
	            expect($('.bleep-bloop').html()).to.be.('Hello');
	            done();
	        }, 10);
	    });

	    afterEach(function(){
	        // Clean up DOM here
	    });
	});

- Before and after each test the DOM is mocked an cleaned.
- In the *'bleep bloop should async DOM manipulate'* test, the asyncBleep
  function will output 'Hello' to the DOM in the next animation frame.
- A function is available in the first argument (called 'done' in the above
  example) as a callback.
- When this argument is used, Mocha knows to wait until the callback is called
  before resolving the test.
- It's that argument that allows this unit test to run without errors.

The pattern in the above example is simple, easy to write and remember, and
should suffice in even the most complex DOM manipulation scenarios.
