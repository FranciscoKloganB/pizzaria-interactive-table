/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
$('#menubar').menubar(); //Adds the menu bar..
$('#navbar').navbar({selected: 'Confirm'}); //Adds top navigation bar.

var values = managerGetMetaValues(Number(sessionStorage.orders));
createOrderItem(); //Creates the HTML structure for the order.
createOrderElements(values[0], values[1]); //Fills the order item with the chosen pizza and drink.


/*------------------------------------------------------------------------------

			AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
//Creates the HTML structure for the order.
function createOrderItem() {
	var div = $('<div>').addClass('orderStatusContainer'); //Creates the div for the order.
	var a = $('<div>').addClass('col').attr('id', 'pizza'); //Creates the div for the ordered pizza.
	var b = $('<div>').addClass('col').attr('id', 'drink'); //Creates the div for the ordered drink.
	//Creates the buttons.
	var c = $('<div>').addClass('col buttons')
			.append($('<button>', { html: 'Cancel' }).addClass('editcancel buttonCancel').attr('id', 'cancel'))
			.append($('<button>', { html: 'Confirm' }).addClass('editcancel buttonConfirm').attr('id', 'confirm'));
	div.append(a, b, c);
	$('#order').append(div);
}
//Fills the order item with the chosen pizza and drink.
function createOrderElements(pizza, drink) {
	var orderedPizza = pizza; //Gets the ordered pizza.
	var orderedDrink = drink; //Gets the ordered drink.
	var incButtons = createIncrementButtons();
	setTimeout(function() {
		$('#pizza').append(createPizzaItemWithSize(orderedPizza), incButtons[0]); //Shows the ordered pizza.
		$('#drink').append(createDrinkItem(orderedDrink), incButtons[1]); //Shows the ordered drink.
	}, 100);
}

//When the client clicks the increment or decrement pizza buttons.
function orderIncrementPizza(incValue) {
	var number = Number($('.elNumberPizza').text()) + incValue; //Gets the number of current pizzas in the order.
	if (number > 0) { //If the number of pizzas would still be more than 0.
		$('.elNumberPizza').text(number); //Increment or decrements the number of pizzas in the display.
		managerIncrementPizza(sessionStorage.orderNumber, number); //Changes the number in the system.
	}
	else if (number == 0) { //If the number of pizzas would be 0.
		//TODO - @RafaelRibeiro - asks the client to cancel the order.
	}
	else if (number < 0) { //Security redundancy.
		//The number won't reach negative values because when it reaches 0, the order is canceled (with the client's permission).
	}
}
//When the client clicks the increment or decrement drink buttons.
function orderIncrementDrink(incValue){
	var number = Number($('.elNumberDrink').text()) + incValue; //Gets the number of current drinks in the order.
	if (number > 0) { //If the number of pizzas would still be more than 0.
		$('.elNumberDrink').text(number); //Increment or decrements the number of drinks in the display.
		managerIncrementDrink(sessionStorage.orderNumber, number); //Changes the number in the system.
	}
	else if (number == 0) { //If the number of pizzas would be 0.
		//TODO - @RafaelRibeiro - asks the client to cancel the order.
	}
	else if (number < 0) { //Security redundancy.
		//The number won't reach negative values because when it reaches 0, the order is canceled (with the client's permission).
	}
}
//When the client clicks the cancel button.
function confirmationOrderCancel() { confirmationOverlayShow(confirmationConfirmCancel, []); }
//When the client clicks the 'Yes' button in the confirmation overlay (callback from confirmationOverlayShow).
function confirmationConfirmCancel() {
	managerDeleteOrder(sessionStorage.orderNumber); //Deletes the ongoing order.
	window.location.href = 'html/table.html';
}
//When the client clicks the confirm button.
function orderConfirm() {
	sessionStorage.orders = Number(sessionStorage.orders) + 1; //Increments the order number.
	window.location.href = 'html/table.html';
}

/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
//The click event for the increment pizza button increments the number of pizzas of the order.
//The click event for the decrement pizza button decrements the number of pizzas of the order.
//The click event for the increment drink button increments the number of drinks of the order.
//The click event for the decrement drink button decrements the number of drink of the order.
//The click event for the cancel button changes the page to the main page.
$('.buttonCancel').click(function() { confirmationOrderCancel(); });
//The click event for the confirm button changes the page to the main page.
$('.buttonConfirm').click(function() { orderConfirm(); });
