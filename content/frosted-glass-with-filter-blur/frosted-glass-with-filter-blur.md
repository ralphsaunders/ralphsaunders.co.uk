Title: Frosted Glass With filter:blur()
Date: 2014-12-17 13:05
Modified: 2014-12-17 13:05
Category: FED
Tags: CSS
Slug: frosted-glass-with-filter-blur
Authors: Ralph Saunders
Summary: ## Getting Blurry with CSS

`filter: blur()` is an awesome part of the new-ish [filter effects module in the
W3 CSS spec](http://www.w3.org/TR/filter-effects/). In short, the filter module
allows you to apply filters &mdash; like grayscale, sepia, blur, and so on
&mdash; to DOM elements. It's made its way into
[-webkit-](http://caniuse.com/#search=filter), and will be in Firefox's next
release!

Really, there's no excuse for not playing with it. Infact, provided you fallback
sensibly, why not use it in production?

## Basic usage

Basic usage of `filter:blur()` is very straight forward:

    .my-element {
        -webkit-filter: blur(5px);
        filter: blur(5px);
    }

Will blur the contents of `.my-elment`. Here's what it looks like:


<style type="text/css">
    .blur-me {
        -webkit-filter: blur(5px);
        filter: blur(5px);
    }
</style>

Unblurred:

<blockquote>
    Here's my amazing quote
</blockquote>

Blurred:

<blockquote class="blur-me">
    Here's my amazing quote
</blockquote>

Note how the filter is applied to everything inside the element. Not only did it
blur the DOM content, it also blurred content specified via CSS and also the
properties themselves &mdash; like the `border-left` property.

This is both amazing but also sort of a pain at the same time. It means you can
apply it to images, videos, and even canvas elements! But we don't usually want
to blur absolutely everything, so there's a bit of leg work involved in
obtaining something like a frosted glass effect.

## Frosted Glass with Video

<style type="text/css">

    .sandbox {
        position:relative;
        clear:both;
        width: 100%;
        padding-bottom: 56.25%;
        margin-right: 0;
        height: 0;
        overflow:hidden;
        margin-bottom:20px;
    }

    .sandbox video {
        margin-right: 0;
        float: none;
        width: 100%;
    }

    .demo-video {
        position:absolute;
        z-index: -1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .blurred {
        -webkit-filter: blur(20px);
        filter: blur(20px);
        z-index: -2;
    }

    .sharp {
        -webkit-clip-path: polygon(0 0, 0 100%, 40% 100%, 40% 0, 80% 0, 80% 100%, 100% 100%, 100% 0);
        clip-path: polygon(0 0, 0 100%, 40% 100%, 40% 0, 80% 0, 80% 100%, 100% 100%, 100% 0);
    }

    .article .blurred-position {
        position: absolute;
        left: 40%;
        width: 40%;
        height:100%;
        box-sizing: border-box;
        padding:40px;
    }

    .article .blurred-position * {
        margin: 0;
        float: none;
        width: 100%;
        color: #fff;
    }

    .sandbox.transform {
        -webkit-perspective: 1500px;
        -webkit-transform: scale(.5);
        perspective: 1500px;
        transform: scale(.5);
        overflow:visible;
    }

    .sandbox.transform .demo-video {
        -webkit-transform: rotateY(40deg);
    }

    .sandbox.transform .sharp {
        -webkit-transform: rotateY(40deg) translate(10%, 10%);
    }

    .sandbox.transform .blurred-position {
        -webkit-transform: rotateY(40deg) translate(30%, 30%);
    }


</style>

<div class="sandbox constrain">
    <video class="demo-video blurred" loop autoplay>
        <source src="./videos/frosted-glass-with-filter-blur/example.ogv" type="video/ogg" codecs="theora,vorbis">
    </video>
    <video class="demo-video sharp" loop autoplay>
        <source src="./videos/frosted-glass-with-filter-blur/example.ogv" type="video/ogg" codecs="theora,vorbis">
    </video>
    <div class="blurred-position">
        <h2>Bacon ipsum dolor amet</h2>

        <p>Bacon ipsum dolor amet bacon tenderloin bresaola turducken meatball,
        beef short ribs sirloin. Pork loin prosciutto ribeye, sirloin short ribs
        hamburger pork chop tongue. Ham short loin corned beef meatball beef ribs.
        Sirloin chicken jowl pig pork loin meatball, salami spare ribs.</p>
    </div>
</div>

Pretty impressive right? To think how long we've dreamed for this to be possible
on images, only to find out we can do it on videos!

It's a bit difficult to figure the above example works when you see it flat like
that, so here it is transformed a bit&hellip;

<div class="sandbox transform">
    <video class="demo-video blurred" loop autoplay>
        <source src="./videos/frosted-glass-with-filter-blur/example.ogv" type="video/ogg" codecs="theora,vorbis">
    </video>
    <video class="demo-video sharp" loop autoplay>
        <source src="./videos/frosted-glass-with-filter-blur/example.ogv" type="video/ogg" codecs="theora,vorbis">
    </video>
    <div class="blurred-position">
        <h2>Bacon ipsum dolor amet</h2>

        <p>Bacon ipsum dolor amet bacon tenderloin bresaola turducken meatball,
        beef short ribs sirloin. Pork loin prosciutto ribeye, sirloin short ribs
        hamburger pork chop tongue. Ham short loin corned beef meatball beef ribs.
        Sirloin chicken jowl pig pork loin meatball, salami spare ribs.</p>
    </div>
</div>

We've got two `<video>` elements that are playing the same video, both
positioned `absolute` with different a `z-index` each &mdash; so they sit ontop
of one another.  I'm combining the `clip-path` property with a CSS shape defined
with `polygon` to clip a hole in the sharp `video` so the blurred `video` shows
through.

There's also a `<div>` element that is sitting ontop of both of the videos that
matches the position of the hole in the `clip-path`. This is just a standard
element, so we can do things like add transparent backgrounds with `rgba()` for
'tinted glass' effects.

Here's some code for you to try:

    <div class="container">
        <video class="demo-video blurred" loop autoplay>
            <source src="path/to/video" type="video/ogg" codecs="theora,vorbis">
        </video>
        <video class="demo-video sharp" loop autoplay>
            <source src="path/to/video" type="video/ogg" codecs="theora,vorbis">
        </video>
        <div class="blurred-position">
            <h2>Here's some text too</h2>
        </div>
    </div>

    <style type="text/css">
        .container {
            position: relative;
            height: 0;
            padding-bottom: 56.25%; /* (16:9 aspect ratio) */
            width:100%;
        }

        .demo-video {
            position:absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            z-index: -1;
        }

        .blurred {
            z-index: -2;
            -webkit-filter: blur(20px);
            filter: blur(20px);
        }

        .blurred-position {
            position: absolute;
            left: 40%;
            width: 40%;
            height: 100%;
            box-sizing: border-box;
            padding: 40px;
            color: #fff;
        }


        /* Use percentages so it's responsive! */
        .sharp {
            -webkit-clip-path: polygon(0 0, 0 100%, 40% 100%, 40% 0, 80% 0, 80% 100%, 100% 100%, 100% 0);
            clip-path: polygon(0 0, 0 100%, 40% 100%, 40% 0, 80% 0, 80% 100%, 100% 100%, 100% 0);
        }
    </style>
