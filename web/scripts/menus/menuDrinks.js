/*------------------------------------------------------------------------------

			VARIABLES

------------------------------------------------------------------------------*/
var drinkName = '';


/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
$('#menubar').menubar(); //Adds the menu bar..
$('#navbar').navbar({selected: 'Drinks'}); //Adds top navigation bar.
populateDrinksMenu($('.menuItems')); //Populates the drink's menu dynamically.


/*------------------------------------------------------------------------------

			AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
function continueOrder() { window.location.href = 'html/menus/menuOrderConfirmation.html'; }
function continueEdit() {
	sessionStorage.editing = 'false'; //Sets the editing flag to false.
	window.location.href = 'html/table.html';
}

//When the client clicks in the order button.
function setGlobalDrink() {
	managerAddDrink(drinkName); //Adds the drink to the system.
	if (sessionStorage.editing == 'true') { continueEdit(); } //If the client is editing a previous order.
	else { continueOrder(); } //If the client is NOT editing a previous order.
}

//When the client clicks the back button.
function backDrink() { window.location.href = 'html/menus/menuPizzaList.html'; }
//When the client clicks the skip button.
function skipDrink() {
	if (managerCheckOrderNotEmpty(sessionStorage.orderNumber)) { window.location.href = 'html/menus/menuOrderConfirmation.html' } //If the client ordered a pizza.
	else { continueOrder(); } //If the client also skipped the pizza.
}

//When the client clicks the cancel button.
function drinksOrderCancel(index) {
	confirmationOverlayShow('Do you really wish to cancel your order?', {
		'Yes': ['buttonDanger', drinksConfirmCancel],
		'No' : ['buttonNeutral']
	});
}
//When the client clicks the "Yes" button in the confirmation overlay (callback from confirmationOverlayShow).
function drinksConfirmCancel() {
	managerDeleteOrder(sessionStorage.orderNumber); //Deletes the ongoing order.
	window.location.href = 'html/table.html';
}


/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
//The click event of #drinksInformationClose is defined in the spawning (in showExtensiveInformation()).
//The click event of #drinkOrderButton is defined in the spawning (in createDrinkOrderButton()).
//The click event for the drink items opens the extensive information bar.
$('.menuDrinkItem').click(function() {
	drinkName = $(this).find('.mPITitle').text(); //Gets the chosen pizza's name.
	$('.menuDrinkItem').removeClass('active'); //Clears the previously chosen drink.
	$(this).toggleClass('active');
	showExtensiveInformation(drinkName); //Shows the extensive information bar.
});
//The click event for the cancel button changes the page to the main page.
$('#cancelButton').click(function() { drinksOrderCancel(); }); //Changes the page to the main page.
//The click event for the back button changes the page to the pizza menu.
$('#backButton').click(function() { backDrink(); });
//The click event for the skip button changes the page to the confirmation page or the main page.
$('#skipButton').click(function() { skipDrink(); });
