/*------------------------------------------------------------------------------

				AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
//Initializes the order manager.
function managerStart() {
	var meta = {}; //Creates orders data structure.
	sessionStorage.meta = JSON.stringify(meta); //Sets it as a sessionStorage item for global avalability.
	sessionStorage.orders = 0; //Sets the current order number to 0.
	sessionStorage.orderNumber = 0; //Sets the number of total placed orders to 0.
	sessionStorage.editing = false; // Sets the editing flag to false.
}

//Adds the order to the system.
function managerAddToMeta(orderNumber, order) {
	var parsed = JSON.parse(sessionStorage.meta); //Parses it (its current state is a string).
	parsed['order' + orderNumber] = order; //Adds the order.
	sessionStorage.meta = JSON.stringify(parsed); //Sets the sessionStorage again.
	sessionStorage.ordered = true; //Sets the ordered 'global flag' to true.
}
//Gets the order from the system.
function managerGetMetaValues(orderNumber) {
	var parsed = JSON.parse(sessionStorage.meta); //Parses it (it's current state is a string).
	return parsed['order' + orderNumber]; //Returns the array of the ordered elements.
}


function managerSetOrderArrived(orderNumber) {
	var values = managerGetMetaValues(orderNumber); //Gets the order from the system.
	var pizza = values[0];
	var drink = values[1];
	pizza['arrived'] = 'true';
	managerAddToMeta(orderNumber, [pizza, drink]); //Adds the order to the global data structure.
}
function managerCheckOrderArrived(orderNumber) {
	var values = managerGetMetaValues(orderNumber); //Gets the order from the system.
	var pizza = values[0];
	return pizza['arrived'] == 'true';
}

//Checks if the current order is not empty.
function managerCheckOrderNotEmpty(orderNumber) {
	var values = managerGetMetaValues(orderNumber); //Gets the order from the system.
	if (values == null) { return false; }
	if (values[0] != '' || values[1] != '') { return true; }
	else { return false; }
}
//Gets the order's drink.
function managerGetDrink(orderNumber) {
	var values = managerGetMetaValues(orderNumber);
	if (values == null) { return ''; }
	var drink = values[1];
	if (drink == null || drink == '') { return ''; }
	else if (drink && drink != '') { return drink; }
}
//Gets the order's pizza.
function managerGetPizza(orderNumber) {
	var values = managerGetMetaValues(orderNumber);
	if (values == null) { return ''; }
	var pizza = values[0];
	if (pizza == null || pizza == '') { return ''; }
	else if (pizza && pizza != '') { return pizza; }
}

//Adds a premade pizza to the order.
function managerAddPizza(pizzaName, pizzaSize) {
	var oldPizza = managerGetPizza(sessionStorage.orderNumber);
	var drink = managerGetDrink(sessionStorage.orderNumber);
	var pizzaNumber = 1;
	if (oldPizza != '') { pizzaNumber = oldPizza['pizzaNumber']; }
	if (pizzaName == '') {
		managerAddToMeta(sessionStorage.orderNumber, ['', drink]); //Adds the order to the global data structure.
	}
	else {
		var pizza = getPremadePizza(pizzaName); //Gets the pizza's structure.
		pizza['pizzaSize'] = pizzaSize; //Adds the pizza's size to the the structure.
		pizza['pizzaNumber'] = pizzaNumber; //Sets number of pizzas of the order to 1.
		console.log("managerAddPizza", pizza);
		managerAddToMeta(sessionStorage.orderNumber, [pizza, drink]); //Adds the order to the global data structure.
	}
}

function managerAddCustomPizza(pizzaMaker) {
	var oldPizza = managerGetPizza(sessionStorage.orderNumber);
	var drink = managerGetDrink(sessionStorage.orderNumber);
	var pizzaNumber = 1;
	if (oldPizza != '') { pizzaNumber = oldPizza['pizzaNumber']; }

	pizzaMaker['pizzaNumber'] = pizzaNumber; //Sets the same number to the edited pizza.
	managerAddToMeta(sessionStorage.orderNumber, [pizzaMaker, drink]); //Adds the order to the global data structure.
}

//Adds a drink to the order.
function managerAddNewDrink(drinkName) {
	var pizza = managerGetPizza(sessionStorage.orderNumber); //Gets the ordered pizza.
	var drink = getPremadeDrink(drinkName); //Gets the drink's structure.
	drink['drinkNumber'] = 1; //Sets number of drinks of the order to 1.
	managerAddToMeta(sessionStorage.orderNumber, [pizza, drink]); //Adds the order to the global data structure.
}

function managerDeletePizza(orderNumber) {
	var order = managerGetMetaValues(orderNumber);
	var drink = order[1];
	managerAddToMeta(orderNumber, ['', drink]);
}
function managerDeleteDrink(orderNumber) {
	var order = managerGetMetaValues(orderNumber);
	var pizza = order[0];
	managerAddToMeta(orderNumber, [pizza, '']);
}
//Makes the order empty (for the system, if the order is empty, it doesn't show up).
function managerDeleteOrder(orderNumber) { managerAddToMeta(orderNumber, ['', '']); /*Adds the empty order to the global data structure.*/ }
//Makes the order empty (for the system, if the order is empty, it doesn't show up).
function manageDeleteAllOrders() {
	var v = ['', '']; //Sets the value for the key (empty fields).
	for (var i = 0; i < sessionStorage.orders; i++) {
		managerAddToMeta(i, v);
	}
}

//Increments or decrements the number of pizzas of the order.
function managerIncrementPizza(orderNumber, newPizzaNumber) {
	var pizza = (managerGetMetaValues(orderNumber))[0]; //Gets the ordered pizza.
	var drink = (managerGetMetaValues(orderNumber))[1]; //Gets the ordered drink.
	pizza['pizzaNumber'] = newPizzaNumber; //Sets the new number of pizzas of the order.
	var valueNew = [pizza, drink]; //Sets the value for the key.
	managerAddToMeta(orderNumber, valueNew); //Adds the order to the global data structure.
}
//Increments or decrements the number of drinks of the order.
function managerIncrementDrink(orderNumber, newDrinkNumber) {
	var pizza = (managerGetMetaValues(orderNumber))[0]; //Gets the ordered pizza.
	var drink = (managerGetMetaValues(orderNumber))[1]; //Gets the ordered drink.
	drink['drinkNumber'] = newDrinkNumber; //Sets the new number of drinks of the order.
	var valueNew = [pizza, drink]; //Sets the value for the key.
	managerAddToMeta(orderNumber, valueNew); //Adds the order to the global data structure.
}
