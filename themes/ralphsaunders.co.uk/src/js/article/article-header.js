import 'waypoints/lib/noframework.waypoints.js';

var headerTitle = document.querySelector('.header-title');
var waypoint = new Waypoint({
    element: headerTitle,
    handler: function(dir) {
        if(!waypoint) {
            return;
        }

        requestAnimationFrame(function() {
            headerTitle.classList.add('activate');
        });

        waypoint.destroy();
    },
    offset: '100%'
});
