import Barba from 'barba.js';
import TweenLite from 'crowd-licensed-gsap/src/uncompressed/TweenLite.js';
import CSSPlugin from 'crowd-licensed-gsap/src/uncompressed/plugins/CSSPlugin.js';
import ScrollToPlugin from 'crowd-licensed-gsap/src/uncompressed/plugins/ScrollToPlugin.js';

(function() {
    'use strict';

    var view,
        HideShowTransition;

    function play(callback) {
        requestAnimationFrame(function() {
            document.body.classList.add('play-out');

            setTimeout(function() {
                callback();
            }, 100);
        });
    }

    HideShowTransition = Barba.BaseTransition.extend({
        start: function() {
            Promise.all(
                [
                    this.newContainerLoading,
                    this.animationController()
                ]
            ).then(this.finish.bind(this));
        },
        animationController: function() {
            var _this = this;
            return new Promise(
                function(resolve) {
                    play(resolve);
                }
            );
        },
        finish: function() {
            document.body.scrollTop = 0;
            this.done();
            TweenLite.set(this.newContainer, {
                visibility: 'visible',
            });

            requestAnimationFrame(function() {
                document.body.classList.remove('play-out');
                document.body.classList.add('play-in');

                setTimeout(function() {
                    document.body.classList.remove('play-in');
                }, 100);
            });
        }
    });

    function setupViews() {
        view = Barba.BaseView.extend({
            namespace: 'barba-view',
            onEnterCompleted: function() {
                // Init any javascript here

                ga('send', 'pageview', location.pathname, {
                    'title': document.title
                });
            }
        });
        view.init();
    }

    function init() {
        setupViews();

        Barba.Pjax.start();
        Barba.Pjax.getTransition = function() {
            return HideShowTransition;
        };
        Barba.Prefetch.init();
        Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
        Barba.Pjax.preventCheck = function(evt, element) {
            if (!Barba.Pjax.originalPreventCheck(evt, element)) {
                return false;
            }
            return true;
        };

    }

    init();
})();
