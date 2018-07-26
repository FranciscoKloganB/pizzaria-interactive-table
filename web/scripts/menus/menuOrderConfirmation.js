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
function refreshOrder() {
	$('#order').empty();
	var values = managerGetMetaValues(Number(sessionStorage.orders));
	if (values[0] == '' && values[1] == '') {
		confirmationOrderCancel();
	}
	createOrderItem(); //Creates the HTML structure for the order.
	createOrderElements(values[0], values[1]); //Fills the order item with the chosen pizza and drink.
}

//Creates the HTML structure for the order.
function createOrderItem() {
	$('#order').append($('<div>', { // Creates order content
		'class': 'orderStatusContainer row',
		html: [
			$('<div>', { 'class': 'col-md-5', 'id': 'pizza' }),
			$('<div>', { 'class': 'col-md-4', 'id': 'drink' })
		]
	}).append($('<div>', { 'class': 'col-md-3 buttons', // Creates buttons
		html: [
			$('<button>', { html: 'Cancel', 'class': 'buttonDanger', 'id': 'cancel' }),
			$('<button>', { html: 'Confirm', 'class': 'buttonReward', 'id': 'confirm' })
		]
	}))
	);
}
//Fills the order item with the chosen pizza and drink.
function createOrderElements(pizza, drink) {
	var incButtons = createIncrementButtons(1, 1, sessionStorage.orderNumber);
	setTimeout(function() {
		//Shows the ordered pizza.
		if (pizza != '' ) { $('#pizza').append(createPizzaItemWithSize(pizza), incButtons[0]); }
		//Shows the ordered drink.
		if (drink != '') { $('#drink').append(createDrinkItem(drink), incButtons[1]); }
	}, 100);
}

//When the client clicks the increment or decrement pizza buttons.
function orderIncrementPizza(incValue, button) {
	var number = Number($('.elNumberPizza').text()) + incValue; //Gets the number of current pizzas in the order.
	if (number > 0) { //If the number of pizzas would still be more than 0.
		$('.elNumberPizza').text(number); //Increment or decrements the number of pizzas in the display.
		managerIncrementPizza(sessionStorage.orderNumber, number); //Changes the number in the system.
	}
	else if (number == 0) { //If the number of pizzas would be 0.
		confirmationDeleteElement(deletePizza);
	}
	else if (number < 0) { //Security redundancy.
		//The number won't reach negative values because when it reaches 0, the order is canceled (with the client's permission).
	}
}
//When the client clicks the increment or decrement drink buttons.
function orderIncrementDrink(incValue,button){
	var number = Number($('.elNumberDrink').text()) + incValue; //Gets the number of current drinks in the order.
	if (number > 0) { //If the number of pizzas would still be more than 0.
		$('.elNumberDrink').text(number); //Increment or decrements the number of drinks in the display.
		managerIncrementDrink(sessionStorage.orderNumber, number); //Changes the number in the system.
	}
	else if (number == 0) { //If the number of pizzas would be 0.
		confirmationDeleteElement(deleteDrink);
	}
	else if (number < 0) { //Security redundancy.
		//The number won't reach negative values because when it reaches 0, the order is canceled (with the client's permission).
	}
}


function confirmationDeleteElement(func) {
	confirmationOverlayShow('Do you really wish to remove this item?', {
		'Yes': ['buttonDanger', func],
		'No' : ['buttonNeutral']
	});
}
function deletePizza(arg) {
	managerDeletePizza(sessionStorage.orderNumber);
	refreshOrder();
}
function deleteDrink() {
	managerDeleteDrink(sessionStorage.orderNumber);
	refreshOrder();
}


//When the client clicks the cancel button.
function confirmationOrderCancel() {
	confirmationOverlayShow('Do you really wish to cancel your order?', {
		'Yes': ['buttonDanger', confirmationConfirmCancel],
		'No' : ['buttonNeutral']
	});
}
//When the client clicks the 'Yes' button in the confirmation overlay (callback from confirmationOverlayShow).
function confirmationConfirmCancel() {
	managerDeleteOrder(sessionStorage.orderNumber); //Deletes the ongoing order.
	window.location.href = 'html/table.html';
}
//When the client clicks the confirm button.
function orderConfirm() {
	confirmationOverlayShow('Your order was received.', {
		'OK': ['buttonNeutral', userConfirmation]
	});
}
function userConfirmation() {
	var i = sessionStorage.orders;
	sessionStorage.orders = Number(i) + 1; //Increments the order number.
	managerPizzaRate(i, 0);
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
$('button#cancel').click(function() { confirmationOrderCancel(); });
//The click event for the confirm button changes the page to the main page.
$('button#confirm').click(function() { orderConfirm(); });
