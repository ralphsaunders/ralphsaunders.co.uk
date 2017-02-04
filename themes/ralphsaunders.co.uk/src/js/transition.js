import Barba from 'barba.js';
import TweenLite from '../../bower_components/crowd-licensed-gsap/src/uncompressed/TweenMax.js';

(function() {
    'use strict';

    var view,
        HideShowTransition;

    function play(container, callback) {
        TweenMax.to(container, 1, {
            opacity: 0,
            onComplete: function() {
                callback();
            }
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
                    play(_this.oldContainer, resolve);
                }
            );
        },
        finish: function() {
            document.body.scrollTop = 0;

            this.done();
            TweenMax.set(this.newContainer, {
                visibility: 'visible',
                opacity: 0
            });

            var _this = this;
            TweenMax.to(_this.newContainer, 1, {
                opacity: 1,
                onComplete: function() {
                }
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
