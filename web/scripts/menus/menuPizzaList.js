/*------------------------------------------------------------------------------

			VARIABLES

------------------------------------------------------------------------------*/
var pizzaName = '';
var pizzaSize = 'Small';


/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
$('#menubar').menubar(); //Adds the menu bar..
$('#navbar').navbar(); //Adds top navigation bar.
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
function createPizzaPrice(size){ return $('<label>', { html: getPizzaPrice(size) }); }
function createPizzaOrderButton() {
	return $('<button>', {
		html: 'Order!',
		'id': 'pizzaOrderButton',
		'class': 'buttonNeutral',
		'click': function() { setGlobalPizza(pizzaSize); }
	});
}
function createSizeButtons() {
	var d = $('<div>', { 'class': 'buttonContainer' });
	['Small', 'Medium', 'Large'].forEach(function(size) {
		d.append($('<button>', {
			html: size[0], // Get first character from size
			'id': size,
			'class': 'mPIISizeButton buttonWhite',
			'click': function() {
				pizzaSize = $(this).attr('id');
				$('.mPIISizeButton').addClass('buttonWhite').removeClass('buttonReward');
				$(this).removeClass('buttonWhite').addClass('buttonReward');
				$('.priceContainer label').text(getPizzaPrice(size));
			}
		}));
	});
	return d;
}

function createSize_Price_Order() {
	return $('<div>').addClass('priceContainer')
			.append(createSizeButtons())
			.append(createPizzaPrice('Small'))
			.append(createPizzaOrderButton());
}

function continueOrder() { window.location.href = 'html/menus/menuDrinks.html'; }
function continueEdit() {
	sessionStorage.editing = 'false'; //Sets the editing flag to false.
	window.location.href = 'html/table.html';
}

//When the client clicks in the order button.
function setGlobalPizza(pizzaSize) {
	managerAddPizza(pizzaName, pizzaSize); // Adds the pizza to the system.
	if (sessionStorage.editing == 'true') { continueEdit(); } //If the client is editing a previous order.
	else { continueOrder() } //If the client is NOT editing a previous order.
}

//When the client clicks the skip button.
function skipPizza() {
	pizzaName = '';
	setGlobalPizza('Small');
}
//When the client clicks the cancel button.
function pizzaOrderCancel(index) {
	confirmationOverlayShow('Do you really wish to cancel your order?', {
		'Yes': ['buttonDanger', pizzaConfirmCancel],
		'No' : ['buttonNeutral']
	});
}
//When the client clicks the 'Yes' button in the confirmation overlay (callback from confirmationOverlayShow).
function pizzaConfirmCancel() { window.location.href = 'html/table.html'; }


/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
//The click event for the size buttons opens the extensive information bar.
//The click event of #pizzaInformationClose is defined in the spawning (in showExtensiveInformation()).
//The click event of #pizzaOrderButton is defined in the spawning (in createPizzaOrderButton()).
$('.menuPizzaItem, .menuPizzaSuggestion').click(function(){
	pizzaName = $(this).find('.mPITitle').text(); //Gets the chosen pizza's name.
	showExtensiveInformation(pizzaName, 'Small'); //Shows the lateral pizza information bar.
	$('#Small').removeClass('buttonWhite').addClass('buttonReward'); //Shows the predefined selected size 'Small'.
});
//The click event for the Customize Your Own Pizza page changes the page to that.
$('#buttonsPizza #customize').click(function() {
	window.location.href = 'html/menus/menuCustomizePizza.html';
});
//The click event for the cancel button changes the page to the main page.
$('#cancelButton').click(function() { pizzaOrderCancel(); });
//The click event for the skip button changes the page to the drinks menu.
$('#skipButton').click(function() { skipPizza(); });
