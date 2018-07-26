/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
$('#menubar').menubar(); //Adds the menu bar.
//Shows the orders.
for (var i = 0; i < sessionStorage.orders; i++) {
	var values = managerGetMetaValues(i.toString()); //Gets the ordered pizza and drink.
	if (values != null && values[0] != null && values[1] != null && (values[0] != '' || values[1] != '')) { //If the order wasn't deleted.
		createOrderItem(i); //Creates the HTML structure for the order.
		createOrderElements(values[0], values[1], i); //Fills the order item with the chosen pizza and drink.
	}
}

var removeEdit = function(i) {
	$('#edit' + i).hide();
}
var mealReady = function(i) {
	$('#cancel' + i).hide();
	managerSetOrderArrived(i);
	reloadMenuBar();
}
var reloadMenuBar = function() {
	if (sessionStorage.rate == 'false') {
		sessionStorage.rate = 'true';
		$('#menubar').menubar(); //Adds the menu bar.
	}
}

$(document).ready(function() {
	let all_timers = JSON.parse(sessionStorage.timer_orders);
	for (var i = 0; i < sessionStorage.orders; i++) {
		var timer = 'timer_order' + i;
		var time_val;

		if (!(timer in all_timers)) {
			// Create random time if it's non-existing
			time_val = randomInt(10, 40);
			var time_due = new Date(Date.now() + time_val * 1000);
			all_timers[timer] = time_due;
		} else {
			// Do math to calculate the moment it started vs. now
			var now = new Date();
			var ending = new Date(all_timers[timer]);
			time_val = parseInt((ending.getTime() - now.getTime()) / 1000);
		}
		setTimeout(mealReady, time_val * 1000, i);
		setTimeout(removeEdit, time_val / 2 * 1000, i);
		setTimer($('#' + timer), time_val);
	}
	sessionStorage.timer_orders = JSON.stringify(all_timers);
});

$(document).keypress(function(e){
	var first_timer = $($('.timer_order')[0])
	switch(e.which) {
		case 114: // 'R'
			var time_left = first_timer.countdown360().getTimeRemaining();
			first_timer.countdown360().addSeconds(5 - time_left);
			break;
	}
});


/*------------------------------------------------------------------------------

			AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
//Creates the HTML structure for the order.
function createOrderItem(ind) {
	$('#orders').append($('<div>', { // Creates order content
		'class': 'orderStatusContainer',
		'id': 'order' + ind,
		html: [
			$('<div>', { 'class': 'col', 'id': 'pizza' + ind }),
			$('<div>', { 'class': 'col', 'id': 'drink' + ind })
		]
	}).append($('<div>', { 'class': 'col buttons', // Creates buttons
		html: [
			$('<button>', { html: 'Edit', 'class': 'buttonEdit buttonNeutral', 'id':'edit' + ind }),
			$('<button>', { html: 'Pizza', 'class': 'buttonEditPizza buttonNeutral', 'id':'editPizza' + ind }),
			$('<button>', { html: 'Drink', 'class': 'buttonEditDrink buttonNeutral', 'id':'editDrink' + ind }),
			$('<button>', { html: 'Cancel', 'class': 'buttonCancel buttonDanger', 'id':'cancel' + ind }),
		]
	})).append($('<div>', { 'class': 'timer_order', 'id': 'timer_order' + ind }))
	);
}
//Fills the order item with the chosen pizza and drink.
function createOrderElements(pizza, drink, index) {
	var pizzaNumber = Number(pizza['pizzaNumber']);
	var drinkNumber = Number(drink['drinkNumber']);
	var incButtons = createIncrementButtons(pizzaNumber, drinkNumber, index);
	setTimeout(function() {
		if (pizza != '') { $('#pizza' + index).append(createPizzaItemWithSize(pizza), incButtons[0]); }//Shows the ordered pizza.
		if (drink != '') { $('#drink' + index).append(createDrinkItem(drink), incButtons[1]); }//Shows the ordered drink.
	}, 100);
}

//When the client clicks the edit button.
function orderEdit(index) {
	$('#editPizza' + index).toggle(); //Shows/hides the edit pizza button.
	$('#editDrink' + index).toggle(); //Shows/hides the edit drink button.
}
//When the client clicks the edit pizza button.
function orderEditPizza(index) {
	sessionStorage.editing = true; //Sets the editing flag to false.
	sessionStorage.orderNumber = index; //Sets the number of the current order.
	window.location.href = 'html/menus/menuPizzaList.html';
}
//When the client clicks the edit drink button.
function orderEditDrink(index) {
	sessionStorage.orderNumber = index; //Sets the number of the current order.
	sessionStorage.editing = true; //Sets the editing flag to false.
	window.location.href = 'html/menus/menuDrinks.html';
}

//When the client clicks the increment or decrement pizza buttons.
function orderIncrementPizza(incValue, button, orderNumber) {
	var numberLabel = $('#elNumberPizza' + orderNumber);
	var newNumber = Number(numberLabel.text()) + incValue;
	if (newNumber > 0) { //If the number of pizzas would still be more than 0.
		$('#elNumberPizza' + orderNumber).text(newNumber); //Increment or decrements the number of pizzas in the display.
		managerIncrementPizza(orderNumber, newNumber); //Changes the number in the system.
	}
	//If the number of pizzas would be 0.
	else if (newNumber == 0) { confirmationDeleteElement('Do you really wish to delete this element?', deletePizza, orderNumber); }
	//The number won't reach negative values because when it reaches 0, the order is canceled (with the client's permission).
	else if (newNumber < 0) { /*Security redundancy.*/ }
}
//When the client clicks the increment or decrement drink buttons.
function orderIncrementDrink(incValue, button, orderNumber){
	var numberLabel = $('#elNumberDrink' + orderNumber);
	var newNumber = Number(numberLabel.text()) + incValue;
	if (newNumber > 0) { //If the number of pizzas would still be more than 0.
		$('#elNumberDrink' + orderNumber).text(newNumber); //Increment or decrements the number of drinks in the display.
		managerIncrementDrink(orderNumber, newNumber); //Changes the number in the system.
	}
	//If the number of pizzas would be 0.
	else if (newNumber == 0) { confirmationDeleteElement('Do you really wish to delete this element?', {
		'Yes': ['buttonDanger', function() { deleteDrink(orderNumber); }],
		'No' : ['buttonNeutral']
	}); }
	//The number won't reach negative values because when it reaches 0, the order is canceled (with the client's permission).
	else if (newNumber < 0) { /*Security redundancy.*/ }
}

function refreshOrder(orderNumber) {
	$('#order').empty();
	var pizza = '#pizza' + orderNumber.toString();
	$(pizza).parent('.orderStatusContainer').remove();
	var values = managerGetMetaValues(Number(orderNumber));
	if (values[0] == '' && values[1] == '') { confirmationOrderCancel(); }
	createOrderItem(orderNumber); //Creates the HTML structure for the order.
	createOrderElements(values[0], values[1], orderNumber); //Fills the order item with the chosen pizza and drink.
}

function confirmationDeleteElement(confirmationQuestion, func, arg) {
	confirmationOverlayShow(confirmationQuestion, {
		'Yes': ['buttonDanger', function() { func(arg); }],
		'No' : ['buttonNeutral']
	});
}
function deletePizza(arg) {
	managerDeletePizza(arg);
	refreshOrder(arg);
}
function deleteDrink(arg) {
	managerDeleteDrink(arg);
	refreshOrder(arg);
}

//When the client clicks the cancel button.
function orderCancel(index) {
	confirmationOverlayShow('Do you really wish to cancel this order?', {
		'Yes': ['buttonDanger', function() { confirmCancel(index); }],
		'No' : ['buttonNeutral']
	});
}
//When the client clicks the 'Yes' button in the confirmation overlay (callback from confirmationOverlayShow).
function confirmCancel(index) {
	$('#order' + index).remove();
	// let all_timers = JSON.parse(sessionStorage.timer_orders);
	// all_timers.remove('#timer_order' + index);
	// sessionStorage.timer_orders = JSON.stringify(all_timers);
	managerDeleteOrder(index);
}
//When the client clicks the cancel all button.
function orderAllCancel() {
	confirmationOverlayShow('Do you really wish to cancel all your orders?', {
		'Yes': ['buttonDanger', confirmCancelAll],
		'No' : ['buttonNeutral']
	});
}
//When the client clicks the 'Yes' button in the confirmation overlay (callback from confirmationOverlayShow).
function confirmCancelAll() {
	$('#orders').empty();
	//sessionStorage.timer_orders = JSON.stringify({});
	manageDeleteAllOrders();
}


/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
//The click event for the edit button shows the two buttons so the user chooses to edit the pizza or drink.
$('.buttonEdit').click(function() {	orderEdit(Number(($(this).attr('id'))[4])); });
//The click event for the edit pizza button edits the pizza.
$('.buttonEditPizza').click(function() { orderEditPizza(Number(($(this).attr('id'))[9])); });
//The click event for the edit drink button edits the drink.
$('.buttonEditDrink').click(function() { orderEditDrink(Number(($(this).attr('id'))[9])); });
//The click event for the cancel button cancels the order.
$('.buttonCancel').click(function() {
	var num = Number(($(this).parent().parent().attr('id'))[5]);
	orderCancel(num);
}); //Cancels the selected order.
//The click event for the cancel all button cancels the order.
$('#buttonCancelAll').click(function() { orderAllCancel(); }); //Cancells the selected order.
//The click event for the new order buttons enables the client to order again.
$('#buttonNewOrder').click(function() {
	sessionStorage.orderNumber = sessionStorage.orders; //Sets the number of the current order.
	window.location.href = 'html/menus/menuPizzaList.html'; //Continues with the ordering process).
});
