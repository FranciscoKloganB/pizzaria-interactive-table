/******* (Re)defining Prototypes *******/
// Array
Array.prototype.first = function() { return this[0]; };
Array.prototype.last  = function() { return this[this.length - 1]; };
// String
String.prototype.empty = function() { return !this.trim(); };

/****** Code execution *******/
$(document).ready(function(){
	// Starting svg4everybody
	svg4everybody({polyfill:true});
});

/****** Stuff *******/
$(":header").css({cursor: "default"});

function setTimer(div, time=0, callback=function(){}) {
	if (time != 0) {
		div.countdown360({
			radius: 65,                           // radius of arc
			strokeStyle: 'rgb(46, 204, 29)',      // the color of the stroke
			strokeWidth: 5,                       // border radius
			fillStyle: 'rgba(46, 204, 29, 0)',    // the fill color
			fontColor: 'rgb(255, 255, 255)',      // the font color
			fontWeight: 700,                      // the font weight
			autostart: true,                      // start the countdown automatically
			seconds: time,                        // the number of seconds to count down
			label: ['second', 'minute'],          // the label to use or false if none
			smooth: true,                         // should the timer be smooth or stepping
			onComplete: callback
		});
	}

}

function randomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Functions to attach to elements */
$.fn.followAlong = function() {
    var container = $(this);
    var minTop = container.parent().top;
    var maxTop = container.parent().height() - container.outerHeight(true);

    $(document).scroll(function() {
        if ($(window).scrollTop() > maxTop) {
			container.css({
                position: 'absolute',
                top: maxTop
            });
        } else {
			container.css({
                position: 'fixed',
                top: 0
            });
		}
    });
};
