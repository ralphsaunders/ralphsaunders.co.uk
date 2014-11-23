Title: Automate sprites with css-sprite &amp; stylus
Date: 2014-11-23 16:01
Modified: 2014-11-23 16:01
Category: FED
Tags: npm, fed-tooling
Slug: automatic-css-sprites
Authors: Ralph Saunders
Summary: ## Using css-sprite and stylus to Automate CSS Sprite Sheets

We all know about the benefits of using CSS sprites right? They've [been around for ages](http://alistapart.com/article/sprites), are generally seen as a good thing to do, and should be considered a standard practice.

They're also a pain in the arse. CSS sprites are time consuming to create, harder to maintain, and you have to go through all that pain again to create retina assets.

This is a conversation you don't want to have when you're manually maintaining CSS sprites:

> - *designer* &mdash; "Hey, I've updated this icon. It looks so much better now!"

> - *front-end developer* &mdash; "Oh nice! I'll just put it in the sprite sheet an- ... Hey, *designer*, it's 2px wider and 1px shorter now... I'm going to have to adjust styles for most of the icons in the sprite sheet :("

> - *evil\* designer* &mdash; "HA HA HA! Foiled again, young front-end developer!"

Yeah, there are techniques to lessen the amount of styles that would need to be adjusted in the &mdash; almost inevitable &mdash; event of this occurring, but the fundamental problem remains.

## npm install *

At some point between 2004 and now we developed this concept of front-end tooling.

We now have task runners, package managers, CSS frameworks, boilerplates, DOM manipulation libraries, JS helper libraries, event libraries, CSS helpers, dependency managers, template languages, testing frameworks, test runners, code coverage tools, [and so much more](https://github.com/codylindley/frontend-tools)!

Front-end tooling is awesome and automates away the pain.

## npm install css-sprite

There's this node package called [css-sprite](https://www.npmjs.org/package/css-sprite/). It generates CSS sprites. You give it a bunch of images and it gives you one image and a file formatted for the CSS pre-processor of your choice (including vanilla CSS). Check out the [Github repo](https://github.com/aslansky/css-sprite).


### css-sprite + stylus = awesome

So I've got this directory of Christmas icons because I have no taste or self-restraint when it comes to festive activities... here's what it looks like:

![Source images](./images/dist/automatic-css-sprites/src-images.png)

I ran css-sprite with these configuration options (I'm using gulp as my task runner):

    var gulp = require('gulp');
    var stylus = require('gulp-stylus');
    var gulpif = require('gulp-if');
    var sprite = require('css-sprite').stream;

    gulp.task('sprites', function() {
        return gulp.src('./public/img/src/sprites/*.png')
            .pipe(sprite({
                name: '_sprites',
                style: '_sprites.styl',
                cssPath: '../../../../img/build',
                processor: 'stylus',
                orientation: 'bindary-tree'
            }))
            .pipe(gulpif('*.png', gulp.dest('./public/img/build/'), gulp.dest('./public/css/src/components/')))
    });

Those config options say we want to create an image with the name `_sprites`, a stylus stylesheet with the name `_sprites.styl`, the image paths in the eventual compiled CSS file to reference the directory `../../../../img/build`, to use the `stylus` pre-processor, and to layout the icons in the generated sprite in a binary tree fashion.

Here's the generated output:

![Build Images + .styl file](./images/dist/automatic-css-sprites/build.png)

And the contents of that `_sprites.styl` file that's ready to be compiled by stylus at a later time:

    $light93 = -5px -5px 512px 512px
    $alarm55 = -527px -5px 512px 512px
    $bag40 = -5px -527px 512px 512px
    $balloon9 = -527px -527px 512px 512px
    $bell47 = -1049px -5px 512px 512px
    $bell48 = -1049px -527px 512px 512px
    $bell49 = -5px -1049px 512px 512px
    $bell50 = -527px -1049px 512px 512px
    $bible4 = -1049px -1049px 512px 512px
    $cake17 = -1571px -5px 512px 512px
    $calendar167 = -1571px -527px 512px 512px
    $candle11 = -1571px -1049px 512px 512px
    $candle12 = -5px -1571px 512px 512px
    $candle13 = -527px -1571px 512px 512px
    $candy18 = -1049px -1571px 512px 512px
    $candy19 = -1571px -1571px 512px 512px
    $candy20 = -2093px -5px 512px 512px
    $candy21 = -2093px -527px 512px 512px
    $champagne6 = -2093px -1049px 512px 512px
    $chimney3 = -2093px -1571px 512px 512px
    $christmas289 = -5px -2093px 512px 512px
    $christmas290 = -527px -2093px 512px 512px
    $christmas291 = -1049px -2093px 512px 512px
    $christmas292 = -1571px -2093px 512px 512px
    $christmas293 = -2093px -2093px 512px 512px
    $coffee114 = -2615px -5px 512px 512px
    $cookie1 = -2615px -527px 512px 512px
    $document173 = -2615px -1049px 512px 512px
    $donut7 = -2615px -1571px 512px 512px
    $drum23 = -2615px -2093px 512px 512px
    $eighth4 = -5px -2615px 512px 512px
    $fireplace3 = -527px -2615px 512px 512px
    $forest6 = -1049px -2615px 512px 512px
    $gift67 = -1571px -2615px 512px 512px
    $gift68 = -2093px -2615px 512px 512px
    $gingerbread3 = -2615px -2615px 512px 512px
    $glove7 = -3137px -5px 512px 512px
    $glove8 = -3137px -527px 512px 512px
    $grater1 = -3137px -1049px 512px 512px
    $hat19 = -3137px -1571px 512px 512px
    $heart302 = -3137px -2093px 512px 512px
    $horseshoe20 = -3137px -2615px 512px 512px
    $house159 = -5px -3137px 512px 512px
    $ice-skate = -527px -3137px 512px 512px
    $leave1 = -1049px -3137px 512px 512px
    $angel7 = -1571px -3137px 512px 512px
    $light94 = -2093px -3137px 512px 512px
    $lollipop6 = -2615px -3137px 512px 512px
    $ornament3 = -3137px -3137px 512px 512px
    $ornament4 = -3659px -5px 512px 512px
    $ornament5 = -3659px -527px 512px 512px
    $pen71 = -3659px -1049px 512px 512px
    $penguin4 = -3659px -1571px 512px 512px
    $present20 = -3659px -2093px 512px 512px
    $reindeer3 = -3659px -2615px 512px 512px
    $reindeer4 = -3659px -3137px 512px 512px
    $ribbon53 = -5px -3659px 512px 512px
    $ribbon54 = -527px -3659px 512px 512px
    $ribbon55 = -1049px -3659px 512px 512px
    $rocking3 = -1571px -3659px 512px 512px
    $sack1 = -2093px -3659px 512px 512px
    $santa-claus = -2615px -3659px 512px 512px
    $shooting-star = -3137px -3659px 512px 512px
    $sign16 = -3659px -3659px 512px 512px
    $sled = -4181px -5px 512px 512px
    $snow-globe = -4181px -527px 512px 512px
    $snowflake146 = -4181px -1049px 512px 512px
    $snowflake147 = -4181px -1571px 512px 512px
    $snowing10 = -4181px -2093px 512px 512px
    $snowman18 = -4181px -2615px 512px 512px
    $snowman19 = -4181px -3137px 512px 512px
    $snowman20 = -4181px -3659px 512px 512px
    $sparkler = -5px -4181px 512px 512px
    $stamp12 = -527px -4181px 512px 512px
    $star179 = -1049px -4181px 512px 512px
    $star180 = -1571px -4181px 512px 512px
    $star181 = -2093px -4181px 512px 512px
    $star182 = -2615px -4181px 512px 512px
    $star183 = -3137px -4181px 512px 512px
    $star184 = -3659px -4181px 512px 512px
    $star185 = -4181px -4181px 512px 512px
    $stocking1 = -4703px -5px 512px 512px
    $teddy = -4703px -527px 512px 512px
    $thermometer57 = -4703px -1049px 512px 512px
    $toast = -4703px -1571px 512px 512px
    $tree113 = -4703px -2093px 512px 512px
    $tree114 = -4703px -2615px 512px 512px
    $tree115 = -4703px -3137px 512px 512px
    $turkey7 = -4703px -3659px 512px 512px
    $twig = -4703px -4181px 512px 512px
    $wine63 = -5px -4703px 512px 512px

    sprite-width($sprite)
      width $sprite[2]

    sprite-height($sprite)
      height $sprite[3]

    sprite-position($sprite)
      background-position $sprite[0]  $sprite[1]

    sprite($sprite)
      sprite-position($sprite)
      background-repeat no-repeat
      overflow hidden
      display block
      sprite-width($sprite)
      sprite-height($sprite)

    .icon
      background-image url('../../../../img/build/_sprites.png')

This `_sprites.styl` file can then be referenced by other .styl files in the build...

__compile.styl:__

    primary-color = rgb(185, 5, 230)
    primary-color-50 = rgba(185, 5, 230, .5)

    @import "components/_sprites.styl"
    @import "components/modular"
    @import "components/main"

__components/modular.styl:__

    .constrained {
        max-width:1180px;
        margin:0 auto;
    }

    .candy-20 {
        sprite($candy20)
    }

Then when compiled by stylus we get this output:

__compiled.css:__

    .icon {
      background-image: url("../../../../img/build/_sprites.png");
    }
    .constrained {
      max-width: 1180px;
      margin: 0 auto;
    }
    .candy-20 {
      background-position: -2093px -5px;
      background-repeat: no-repeat;
      overflow: hidden;
      display: block;
      width: 512px;
      height: 512px;
    }
    .primary {
      background-color: #b905e6;
      color: #fff;
    }
    .secondary {
      background-color: rgba(185,5,230,0.5);
      color: #fff;
    }

That's it&hellip; CSS sprites without the hassle.
