Title: jQuery is dead
Date: 2015-05-26 14:56
Modified: 2015-05-26 14:57
Category: FED
Tags: javascript
Slug: jquery-is-dead
Authors: Ralph Saunders
Summary: **Perhaps dead is a little hyperbolic, but ‘withering’, ‘on its last legs’, or simply ‘looking a bit rubbish now days’ wouldn’t have been as attention grabbing as I think this topic deserves.**

Over the past twelve months it seems there’s been a surge in the usage of javascript frameworks. Everyone and their mother seems to be rolling out one of the many choices in their web builds. Whether it’s [AngularJS](https://angularjs.org/), [React](https://facebook.github.io/react/), or [Ember.js](http://emberjs.com/); every front-end developer seems to be hot under the collar about feature X in framework Y. 

And why wouldn’t they be? Frameworks are a wonderful paradise of structured code, proven abstractions, and community support. No longer will the front-end developer have to trawl through some imposter’s jQuery DOM-bound spaghetti searching for that illusive function that sets the entire page in motion  &mdash; yes page, not component.

Or so I thought.

Then I picked through an implementation of a multi-faceted search written by an Angular newbie and begrudgingly noted that bad code can happen anywhere. It seems that in actuality, tools that require more upfront knowledge do more harm than good in the hands of the inexperienced. 

On the face of it the code was somewhat more structured than any given piece of jQuery you may come across. It used some of the proven abstractions like controllers and models. It even had a service! Unfortunately it used most of the abstractions poorly. The controller was many hundreds of lines long and did everything on the page. The models did more than hold state and data. In essence, the tools the framework provided were missused because the developer didn’t know what they were for.

Frameworks are a wonderful paradise if you have experience of the concepts they implement; they aren’t a magical replacement for good practice and discipline. That said, jQuery is definitely still dead. Here’s why.

In jQuery we often see some code like this:

    $(‘.dom-element’).on(‘click’, function() {
        $(‘.lightbox’).addClass(‘showing’);
        $(‘.lightbox’).innerHTML($(‘.dom-element’).data(‘lightboxContent’);
    });

> Here we’ve got a lightbox showing the contents of a ‘lightboxContent’ data attribute when said element with data attribute is clicked.

This example encapsulates the approach of jQuery, where the DOM has some information and we write javascript to expose it. You can contrast this to Angular where the javascript has some information and we write a template to expose it.

Here’s a similar example in Angular:

    // The parent controller
    (function() {
        ‘use strict’;

        angular.module(‘demo.controller’, [‘lightbox.module’])
            .controller([‘$scope’, function($scope) {
                $scope.lightboxShowing = false;
            }])
    })();

    // The view
    <div data-ng-controller=“demoController”>
        <button class=“dom-element” data-ng-click=“lightboxShowing = true”>Clicky</button>

        <div data-lightbox-directive data-showing=“lightboxShowing”>
            <h2>My lightbox content</h2>
            <p>Woo lightbox</p>
        </div>
    </div>

    // Angular directive
    (function() {
        ‘use strict’;

        angular.module(‘lightbox.module’, [])
            .directive(‘lightboxDirective’, function() {
                return {
                    transclude: true,
                    scope: {
                        ‘showing’: ‘=‘
                    },
                    templateUrl: ‘path/to/template.html’
                }
            })
    })();

    // path/to/template.html
    <div data-ng-class=“{showing: showing}” data-ng-if=“showing” class=“lightbox-wrap”>
        <div data-ng-transclude></div>
    </div>

There’s way more code here than the jQuery example. Why is it better? Perhaps this will help…

    // Angular directive
    (function() {
        ‘use strict’;

        angular.module(‘lightbox.module’, [])
            .directive(‘lightboxDirective’, function() {
                return {
                    transclude: true,
                    scope: {
                        ‘showing’: ‘=‘
                    },
                    controller: function($scope) {
                        $scope.hide = function() {
                            $scope.showing = false;
                        }
                    },
                    templateUrl: ‘path/to/template.html’
                }
            })
    })();

    // path/to/template.html
    <div data-ng-class=“{showing: showing}” data-ng-if=“showing” class=“lightbox-wrap”>
        <button data-ng-click=“hide()”>Hide!</button>
        <div data-ng-transclude></div>
    </div>

We just added a feature to our lightbox directive without modifying any code in the view and without doing any DOM manipulation. This is the power of the template.

## DOM manipulation sucks and you know it does

Have you ever looked at the source of a jQuery slider, accordion, or lightbox and seen hundreds of lines of code that are there just to manipulate how the DOM is displaying a particular state? 

I have - usually to fix some obscure bug that only happens after a particular sequence of things. Only moments after reading the bug report you’ve broken a sweat because you just know this bug is going to be in DOM manipulation soup. You’re going to wade through a few lines of state and many lines of addClass() and appendTo() until you reside on the floor, weeping, waiting for the misery to end.

Is it any wonder why when you look at how most jQuery is written? See, when you write some jQuery you end up:

1. Writing javascript to find elements to bind events.
2. Writing javascript to find elements to extract data from.
3. Writing javascript to find elements to display that data in.
4. Writing javascript to modify state of elements.

Compare that with Angular, where you end up:

1. Extending HMTL with data attributes to bind events.
2. Crafting a template that will display data.
3. Writing javascript to modify state of modular components.

Yeah, jQuery is dead not because frameworks make you write better code - we know they don’t - but because your framework does DOM manipulation better than you ever could.

Please learn a framework properly and then come join me in my paradise.