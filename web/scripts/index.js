/****** Code execution *******/
$(document).ready(function() {
	/* Animating title */
	setTimeout(function() {
		$(".titleSubtitle").fadeIn(2500);
	}, 500);

	/* Scroll automatically to main upon detecting down-scroll
	FIXME: Use "The Outline"'s snap feature
	var scroll_time = 800;
	$("header").on({
		"DOMMouseScroll" : function(e) { // Firefox
			if (e.originalEvent.detail > 0) {
				$('body').animate({
					scrollTop : $("main").offset().top
				}, scroll_time);
			}
		},
		"mousewheel" : function(e) { // IE, Opera, Safari, Chrome
			if (e.originalEvent.wheelDelta < 0) {
				$('body').animate({
					scrollTop : $("main").offset().top
				}, scroll_time);
			}
		}
	});
	*/
});

// Sliding logo along its parent's height
$('#logoIST').followAlong();

// Arranging subsections, considering what's hidden
$("section").each(
	function() {
		var len = $("div", $(this)).length - $("div.hidden", $(this)).length;
		var num = Math.floor(12 / len);
		$("div", $(this)).addClass("col-md-" + num)
	}
);
