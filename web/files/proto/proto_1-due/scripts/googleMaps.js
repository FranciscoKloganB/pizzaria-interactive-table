var googleMapsKey = "?key=AIzaSyB1UiEgTrMu4oUPFCxorbwhTBMbX19RVGo";
var googleMapsOrigin = "&origin=taguspark";
var googleMapsMode = "driving";
var googleMapsUnits = "&units=metric";

/****** Google Maps code *******/
function searchMap(keyWords) {
	var url = "https://www.google.com/maps/embed/v1/search"+googleMapsKey+"&q="+keyWords;
	$("#iframeMap").attr("src", url);
}
function directionsMap(destination, travelMode) {
	if (destination == "") {
		var inputBar = $("#mapsDestinationInput")
		inputBar.css("background-color", "red");
		setTimeout(function() { inputBar.css("background-color", "white"); }, 1250);
		for (var i = 1; i <= 20; i++) inputBar.fadeOut(30).fadeIn(30);
		return;
	}
	var url = "https://www.google.com/maps/embed/v1/directions"+googleMapsKey+googleMapsOrigin+"&destination="+destination+"&mode="+travelMode;
	$("#iframeMap").attr("src", url);
}
