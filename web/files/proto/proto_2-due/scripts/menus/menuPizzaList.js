/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
$('#menubar').menubar(); //Adds the menu bar..
$('#navbar').navbar(); //Adds top navigation bar.
//populateSuggestions($('#suggestions')); //Populates the suggested pizza's menu dynamically.
populatePremadeMenu($('#premade')); //Populates the premade pizza's menu dynamically.


/*------------------------------------------------------------------------------

			AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
function getPizzaPrice(pizzaSize) {
	var prices = {
		'Small'  : 8,
		'Medium' : 10,
		'Large'  : 12,
	}
	var pizzaPrice = (pizzaSize in prices) ? prices[pizzaSize] : 0;
	return pizzaSize + ' : ' + pizzaPrice + '€';
}

function createPizzaPrice(pizzaSize) {
	var d = $('<div>').addClass('priceContainer')
	.append(createSizeButtons())
	.append($('<label>', { html: getPizzaPrice(pizzaSize) }))
	.append($('<button>', {
		html: 'Order!',
		'click': function() { setGlobalPizza(pizzaSize); },
		'id': 'pizzaOrderButton',
		'class': 'buttonNeutral'
	}));
	return d;
}

function createSizeButtons() {
	var d = $('<div>', { 'class': 'buttonContainer' });
	['Small', 'Medium', 'Large'].forEach(function(size) {
		d.append($('<button>', {
			html: size[0], // Get first character from size
			'class': 'mPIISizeButton buttonWhite',
			'click': function() {
				$('.mPIISizeButton').addClass('buttonWhite').removeClass('buttonReward');
				$(this).removeClass('buttonWhite').addClass('buttonReward');
				var pizzaSize = $(this).attr('id');
				$('.priceContainer label').text(getPizzaPrice(pizzaSize));
				$('#pizzaOrderButton').click(function() { setGlobalPizza(pizzaSize); });
			},
			'id': size
		}));
	});
	return d;
}

//When the client clicks in the order button.
function setGlobalPizza(pizzaSize) {
	var pizzaName = $('#extensiveInfoBar').children('#infoContents').children('.mPITitle').text(); //Gets the chosen pizza's name.
	if (sessionStorage.editing == "true") { // If the client is editing a previous order.
		sessionStorage.editing = false; // Sets the editing flag to false.
		managerEditPizza(pizzaName, pizzaSize); // Adds the pizza to the system.
		window.location.href = 'html/table.html';
		//TODO - @FranciscoKloganB - Show the confirmation popup.
	}
	else { //If the client is NOT editing a previous order.
		managerAddNewPizza(pizzaName, pizzaSize); //Adds the pizza to the system.
		window.location.href = 'html/menus/menuDrinks.html'; //Continues with the order.
	}
}

//When the client clicks the cancel button.
function pizzaOrderCancel(index) { confirmationOverlayShow('Do you really wish to cancel your order?', pizzaConfirmCancel); }
//When the client clicks the "Yes" button in the confirmation overlay (callback from confirmationOverlayShow).
function pizzaConfirmCancel(args) { window.location.href = 'html/table.html'; }


/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
//The click event of #pizzaInformationClose is defined in the spawning (in showExtensiveInformation()).
//The click event of #pizzaOrderButton is defined in the spawning (in createPizzaPrice()).
//The click event for the size buttons opens the extensive information bar.
$('.menuPizzaItem, .menuPizzaSuggestion').click(function(){
	var pizzaName = $(this).find('.mPITitle').text(); //Gets the chosen pizza's name.
	showExtensiveInformation(pizzaName, 'Small'); //Shows the lateral pizza information bar.
});
//The click event for the Customize Your Own Pizza page changes the page to that.
$('#customizationShortcut').click(function() { window.location.href = 'html/menus/menuCustomizePizza.html'; });
//The click event for the cancel button changes the page to the main page.
$('#cancelButton').click(function() { pizzaOrderCancel(); });
//The click event for the skip button changes the page to the drinks menu.
$('#skipButton').click(function() {
	if (sessionStorage.editing == "true") { //If the client is editing a previous order.
		sessionStorage.editing = false; //Sets the editing flag to false.
		managerEditPizza('', 'Small'); //Adds the pizza to the system.
		window.location.href = 'html/table.html';
	}
	else { //If the client is NOT editing a previous order.
		managerAddNewPizza('', 'Small'); //Adds the pizza to the system.
		window.location.href = 'html/menus/menuDrinks.html'; //Continues with the order.
	}
	window.location.href = 'html/menus/menuDrinks.html';
});
