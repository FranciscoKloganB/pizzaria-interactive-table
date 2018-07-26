/*------------------------------------------------------------------------------

			REUSED VARIABLES

------------------------------------------------------------------------------*/
const ButtonLevels = [
	$('#mapsMainButtonContainer > section:nth-child(1) > *'),
	$('#mapsMainButtonContainer > section:nth-child(2) > *'),
];

/*------------------------------------------------------------------------------

			EXECUTION AT LOAD

------------------------------------------------------------------------------*/
$('#menubar').menubar(); //Adds the menu bar.
$('#mapsCloseShare').hide();
ButtonLevels[1].hide();
$('#directionInput').hide();
$('#taxiTime').hide();
mapInit();

//Default map variables
var googleMapsKey = '?key=AIzaSyB1UiEgTrMu4oUPFCxorbwhTBMbX19RVGo';
var googleMapsOrigin = '&origin=taguspark';
var googleMapsMode = 'driving';
var googleMapsUnits = '&units=metric';

var preliminarTaxiNumber = 0;
var taxiETA = 0;

/*------------------------------------------------------------------------------

			EXECUTION WHEN READY

------------------------------------------------------------------------------*/
$(document).ready(function() {
	/*** Generating Share menu ***/
	let container_share = $('#shareButtonContainer');
	$('.shareButton').click(function() { toggleButton($(this)); });
	var num_users = $('.shareButton').length;
	// Randomly select ONE (or none) user to disable
	var disabled_user = parseInt(Math.random() * (num_users+1));
	(container_share.children('.shareButton').eq(disabled_user)).removeClass('buttonWhite').addClass('buttonNeutral').prop('disabled', true);
});


/*------------------------------------------------------------------------------

			AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
function mapInit() {
	var url ='https://www.google.com/maps/embed/v1/place?key=AIzaSyB1UiEgTrMu4oUPFCxorbwhTBMbX19RVGo&q=taguspark';
	mapSaveMapState(url);
	mapQuery(url);
}
function mapQuery(url) {
	$('#iframeMap').attr('src', url);
}

function toggleButton(button) { button.toggleClass('buttonWhite').toggleClass('buttonReward'); }

//Saves the state of the map.
function mapSaveMapState(url) { sessionStorage.mapSavedQuery = JSON.stringify(url); }
//Reverts to the previously saved state (before the received shared map).
function mapRevertState() {
	$('#mapsCloseShare').hide();
	var url = JSON.parse(sessionStorage.mapSavedQuery);
	mapQuery(url);
}

//Confirms if the user allows another user to share the map.
function mapShareWithMeAllow() {
	confirmationOverlayShow('Do you allow user 1 to share the map with you?', {
		'Yes': ['buttonDanger', mapSharedWithMe],
		'No' : ['buttonNeutral']
	});
}
//Simulates the other user's map.
function mapSharedWithMe() {
	$('#mapsCloseShare').show();
	destination = 'alameda lisboa';
	travelMode = 'driving';
	var url = 'https://www.google.com/maps/embed/v1/directions'+googleMapsKey+googleMapsOrigin+'&destination='+destination+'&mode='+travelMode;
	mapQuery(url)
}
//Simulates sharing the map with another user.
function mapShare() {
	confirmationOverlayShow('Do you really wish to share your map?', {
		'Yes': ['buttonDanger', shared],
		'No' : ['buttonNeutral']
	});
}
//Feedback for the user.
function shared() {
	modalClose();
	confirmationOverlayShow('Your map was shared.');
}

function mapGetPointsOfInterest(button) {
	$('.interestsButton').removeClass('buttonReward').addClass('buttonWhite');
	button.toggleClass('buttonWhite').toggleClass('buttonReward');
	var pointType = button.attr('id');
	var keyWords = '';
	switch(pointType) {
		case 'bars': keyWords = 'bars+oeiras';
			break;
		case 'landscapes': keyWords = 'parks+oeiras';
			break;
		case 'mall': keyWords = 'malls+oeiras';
			break;
		case 'monuments': keyWords = 'monuments+oeiras';
			break;
		case 'museums':	keyWords = 'museums+oeiras';
			break;
	}
	var url = 'https://www.google.com/maps/embed/v1/search'+googleMapsKey+'&q='+keyWords;
	mapSaveMapState(url);
	mapQuery(url)
}

function mapDirectionsChooseMode(button) {
	const MODES_GO = ['on foot', 'car', 'public transport'];
	const MODES_ORDER = ['taxi', 'uber'];
	var transport = button.text().toLowerCase();
	$('.directionsButton').removeClass('buttonReward').addClass('buttonWhite');
	button.toggleClass('buttonWhite').toggleClass('buttonReward');
	$('#directionInput').show();
	googleMapsMode = (button.attr('id')).toLowerCase();
	if (MODES_GO.includes(transport)) {
		$('#go').text('Go!');
		$('#taxiTime').hide();
		$('#mic').removeClass('taxi');
	}
	else if (MODES_ORDER.includes(transport)) {
		$('#go').text('Verify');
	}
}

function mapGetDirections(destination, travelMode) {
	if (travelMode == '') { travelMode = 'driving'; }
	var url = 'https://www.google.com/maps/embed/v1/directions'+googleMapsKey+googleMapsOrigin+'&destination='+destination+'&mode='+travelMode;
	mapSaveMapState(url);
	mapQuery(url);
}
function go() {
	var input = $('#mapsDestinationInput');
	var destination = input.val();
	if (destination.empty()) { //If the destination input bar is empty.
		input.effect('shake', {times:2}, 350)
			.css({'background-color':'rgb(0, 0, 0)'})
			.animate({'background-color':'rgb(255, 255, 255)'}, 550); //Shakes the input bar.
	}
	else { //If the destination input bar is NOT empty.
		// FIXME: Too specific and fragile
		if ($('#go').text() == 'Verify') {  taxiShowInformation(destination); }
		//If the user has verified the cab information and clicked the order button.
		else if ($('#go').text() == 'Order!') {
			confirmationOverlayShow('Are you sure you want to call a cab?', {
				'Yes': ['buttonDanger', taxiCall],
				'No' : ['buttonNeutral']
			});
	}
		//If the user selected any other method (not Uber or Taxi) shows the route.
		else { mapGetDirections(destination, googleMapsMode); }
	}
}

//Shows the taxi information and prepares the screen for ordering a taxi.
function getTaxiNumber() {
	return parseInt($('#taxiNumberLabel').text());
}

function taxiShowInformation(destination) {
	mapGetDirections(destination, googleMapsMode); //Shows the taxi route.
	$('#taxiTime').show(); //Shows the taxi information (ETAs).
	$('#mic').addClass('taxi'); //Changes the styling of the mic borders.
	$('#go').text('Order!'); //Changes the button text to 'Order!' so the user can order the taxi.
	preliminarTaxiNumber = 1;
	taxiETA = parseInt(Math.random() * 10 + 7); //Gets a random number between 7 and 17.
	$('#taxiETA').text('ETA: ' + taxiETA + 'MIN');
}
//Increments/Decrements the number of taxis to order.
//Orders the taxi(s)
function taxiCall(args) {
	var details = {
		'type': $('.directionsButton.active').text(),
		'number': getTaxiNumber(),
		'ETA': taxiETA,
		'destinationETA': 23,
	};
	sessionStorage.myTransportation = JSON.stringify(details);
	confirmationOverlayShow('Your taxi has been called.'); //Feedback for the user.

	/*** Cooperating with sessionStorage ***/
	var transport = $('#menubar').find('#taxiNavBarDiv');
	transport.attr('title', details.type);
	transport.find('#MBtaxiETALabel').text('ETA: ' + details['ETA'] + 'MIN');
	transport.find('#MBtaxiNumberLabel').text(details['number']);
	transport.show();
}
//Cancels the ordered taxi.
function taxiCancel() {
	sessionStorage.myTransportation = JSON.stringify({});
	$('#menubar').find('#taxiNavBarDiv').hide();
}


/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
$('.mapsMainButton').click(function() {
	// Highlighting button
	$('.mapsMainButton').not(this).removeClass('buttonReward').addClass('buttonWhite');
	toggleButton($(this));

	// Opening proper section
	var id = $(this).attr('id') + 'ButtonContainer';
	ButtonLevels[1].not('#' + id).hide();
	ButtonLevels[1].siblings('#' + id).toggle();
});

$('#shareConfirm').click(function() { mapShare(); });
$('#mapsCloseShare').click(function() { mapRevertState()});

$('.interestsButton').click(function() { mapGetPointsOfInterest($(this)); });

$('.directionsButton').click(function() { mapDirectionsChooseMode($(this)); });
$('.taxiIncrementButton').click(function() {
	var numberLabel = $('#taxiNumberLabel');
	var val = parseInt(numberLabel.text());
	val = $(this).text() == '+' ? val+1 : val-1;
	if (0 < val /*&& val < 6*/) { // Update val if it's between 1 and 5 taxis
		numberLabel.text(val);
	}
});
$('#mic').click(function() {
	//confirmationOverlayShow('Speak your destination.', );
});
$('#go').click(function() { go(); });
$('#mapsDestinationInput').keypress(function(e) {
	switch (e.which) {
		case 13: // Enter/Return: Runs 'Go' button
			$('#go').click();
			break;
	}
	// Stops the keypress from propagating for the document while typing the destination
	e.stopPropagation();
});
$(document).keypress(function(e){
	switch(e.which) {
		case 114: // 'R'
			mapRevertState();
			break;
		case 115: // 'S'
			mapShareWithMeAllow();
			break;
	}
});

$('#mapsDestinationInput').focusin(function(){
	for (var i = 0; i < 1000; i++)
		$('#mic').animate({'background-color':'#2ecc31'}, 55).animate({'background-color':'rgb(255, 255, 255)'}, 55);

});
$('#mapsDestinationInput').focusout(function() {
	$('#mic').stop(true, true);
	$('#mic').animate({'background-color':'rgb(255, 255, 255)'}, 55);
})
