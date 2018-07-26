/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
$('#menubar').menubar(); //Adds the menu bar..
$('#navbar').navbar(); //Adds top navigation bar.
populateSuggestions($('#suggestions')); //Populates the suggested pizza's menu dynamically.
populatePremadeMenu($('#premade')); //Populates the premade pizza's menu dynamically.


/*------------------------------------------------------------------------------

			AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
//TODO - @RafaelRibeiro - Move this to menuGenerate.js
function createPizzaPrice(pizzaSize) {
	var prices = {
		'Small'  : 8,
		'Medium' : 10,
		'Large'  : 12,
	}
	var pizzaPrice = (pizzaSize in prices) ? prices[pizzaSize] : 0;
	var d = $('<div>').addClass('priceContainer')
	.append($('<label>', { html: pizzaSize + ' : ' + pizzaPrice + '€' }))
	.append($('<button>', {
		html: 'Order!',
		'click': function() { setGlobalPizza(pizzaSize); },
		'id': 'pizzaOrderButton',
	}));
	return d;
}
//TODO - @RafaelRibeiro - Move this to menuGenerate.js
function createSizeButtons() {
	var d = $('<div>', { 'class': 'buttonContainer' });
	['Small', 'Medium', 'Large'].forEach(function(size) {
		d.append($('<button>', {
			html: size[0], // Get first character from size
			'class': 'mPIISizeButton',
			'id': size
		}));
	});
	return d;
}

//When the client clicks in the order button.
function setGlobalPizza(pizzaSize) {
	var pizzaName = $('#extensiveInfoBar').children('#infoContents').children('.mPITitle').text(); //Gets the chosen pizza's name.
	if (sessionStorage.getItem("editing") == "true") { //If the client is editing a previous order.
		sessionStorage.setItem("editing", "false"); //Sets the editing flag to false.
		managerEditPizza(pizzaName, pizzaSize); //Adds the pizza to the system.
		window.location.href = 'html/table.html';
		//TODO - @FranciscoKloganB - Show the confirmation popup.
	}
	else { //If the client is NOT editing a previous order.
		managerAddNewPizza(pizzaName, pizzaSize); //Adds the pizza to the system.
		window.location.href = 'html/menus/menuDrinks.html'; //Continues with the order.
	}
}

//When the client clicks the cancel button.
function pizzaOrderCancel(index) { confirmationOverlayShow(pizzaConfirmCancel, []); }
//When the client clicks the "Yes" button in the confirmation overlay (callback from confirmationOverlayShow).
function pizzaConfirmCancel(args) { window.location.href = 'html/table.html'; }


/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
//The click event of #pizzaInformationClose is defined in the spawning (in showExtensiveInformation()).
//The click event of #pizzaOrderButton is defined in the spawning (in createPizzaPrice()).
//The click event for the size buttons opens the extensive information bar.
$('.mPIISizeButton').click(function(){
	var pizzaName = ($(this).parent().parent()).children('.mPITitle').text(); //Gets the chosen pizza's name.
	var pizzaSize = $(this).attr("id"); //Gets the chosen pizza's size.
	showExtensiveInformation(pizzaName, pizzaSize); //Shows the lateral pizza information bar.
});
//The click event for the Customize Your Own Pizza page changes the page to that.
$('#customizationShortcut').click(function() { window.location.href = 'html/menus/menuCustomizePizza.html'; });
//The click event for the cancel button changes the page to the main page.
$('#cancelButton').click(function() { pizzaOrderCancel(); });
//The click event for the skip button changes the page to the drinks menu.
$('#skipButton').click(function() { window.location.href = 'html/menus/menuDrinks.html'; });
