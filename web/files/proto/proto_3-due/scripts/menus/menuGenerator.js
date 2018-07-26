/*------------------------------------------------------------------------------

			SHARED CODE

------------------------------------------------------------------------------*/
$('#extensiveInfoBar').hide(); //Hides the lateral pizza information bar.
//Shows the extensive information bar.
function showExtensiveInformation(objName, objSize = 0) {
	var closeX = $('<i>', {
		'class': 'fa fa-close',
		'click': function(){ hideExtensiveInformation(); }
	});
	$('#extensiveInfoBar').empty().append(closeX); //Emptys the extensive information bar.

	// Pizza elements
	var pizza = getPremadePizza(objName); //Gets the pizza's structure.
	var ingredients;

	// Drink elements
	var drink = getPremadeDrink(objName); //Gets the drink's structure.
	var drinkTypes;

	// Global
	var nutInfo;
	var ratingDiv;
	var priceOrder;

	var container = $('<div>', {
		'id': 'infoContents',
		html: createItemName(objName)
	});
	if (objSize != 0) { //If objSize is given, it's a pizza.
		//ingredients = createPizzaIngredientsList(pizza); //Creates the pizza's ingredient list.
		nutInfo = createNutritonalInfo(pizza); //Creates a div for the nutritional information table.
		ratingDiv = createRating(pizza); //Creates a div for the rating stars and the rating label.
		priceOrder = createPizzaPrice(objSize);
		container.append([ratingDiv]);
	}
	else { //If objSize is NOT given, it's a drink.
		drinkTypes = createDrinkTypes(drink); //Gets the drink's types.
		nutInfo = createNutritonalInfo(drink); //Creates a div for the nutritional information table.
		priceOrder = createDrinkOrderButton(); //Gets the drink's order price and button.
		container.append([drinkTypes]);
	}
	container.append([nutInfo, ratingDiv, priceOrder]);
	container.children(':not(:first-child)').each(function (i, val) {
		$(val).addClass('infoContent');
	});
	$('#extensiveInfoBar').append(container).show();
}
//Hides the extensive information bar.
function hideExtensiveInformation() {
	$('.menuDrinkItem').removeClass('active'); //Clears the previously chosen drink.
	$('#extensiveInfoBar').hide();
}

//Creates the label for the name.
function createItemName(obj) {
	if ($.type(obj) !== 'string') { obj = obj['name'] }
	return $('<label>', { //Creates the label that represents the item's name.
		'class': 'mPITitle',
		html: obj
	});
}
//Creates a div for the nutritional information table.
function createNutritonalInfo(obj) {
	var nutInfo = obj['nutritions']; //Gets the list of nutritional facts.
	var table = $('<table>').addClass('nutritionalTable'); //Creates the table for the nutritional facts.
	for (var key in nutInfo) {
		table.append($('<tr>') //Creates a table row for each nutritional category.
			.append($('<td>', { html: key }))
			.append($('<td>', { html: nutInfo[key] }))
		);
	}
	return table;
}
//Creates a div for the rating stars and the rating label.
function createRating(obj) {
	var d = $('<div>').addClass('rating');
	var starNum = parseInt(obj['rating']);
	for (var i = 1; i <= starNum; i++) { d.append($('<i>').addClass('fa fa-star').addClass('coloredStar')); }
	for (var i = starNum + 1; i <= 5; i++) { d.append($('<i>').addClass('fa fa-star')); }
	return d;
}

function createIncrementButtons(pizzaNumber, drinkNumber, orderNumber = 0) {
	var incPizza = $('<button>', {
		'class': 'buttonWhite incrementButton incPizza',
		html: '+',
		id: 'incPizza' + orderNumber,
		'click': function() { orderIncrementPizza(1, $(this), orderNumber); }
	});
	var labelPizza = $('<label>', {
		'class': 'elementNumber elNumberPizza',
		html: pizzaNumber.toString(),
		id: 'elNumberPizza' + orderNumber,
	});
	var decPizza = $('<button>', {
		'class': 'buttonWhite incrementButton decPizza',
		html: '-',
		id: 'decPizza' + orderNumber,
		'click': function() { orderIncrementPizza(-1, $(this), orderNumber); }
	});
	var incDrink = $('<button>', {
		'class': 'buttonWhite incrementButton incDrink',
		html: '+',
		id: 'incDrink' + orderNumber,
		'click': function() { orderIncrementDrink(1, $(this), orderNumber); }
	});
	var labelDrink = $('<label>', {
		'class': 'elementNumber elNumberDrink',
		html: drinkNumber.toString(),
		id: 'elNumberDrink' + orderNumber,
	});
	var decDrink = $('<button>', {
		'class': 'buttonWhite incrementButton decDrink',
		html: '-',
		id: 'decDrink' + orderNumber,
		'click': function() { orderIncrementDrink(-1, $(this), orderNumber); }
	});
	var d1 = $('<div>').addClass('incButtons pizza').append(decPizza, labelPizza, incPizza);
	var d2 = $('<div>').addClass('incButtons drinks').append(decDrink, labelDrink, incDrink);
	return [d1, d2];
}

/*------------------------------------------------------------------------------

			PIZZA-RELATED CODE

------------------------------------------------------------------------------*/
//Checks if the pizza is suggested.
function isPizzaSuggested(pizza) {
	var pizzaName = pizza['name'];
	//If the pizza is suggedted, return true.
	if (getIsSuggested(pizzaName)) { return true; }
	//If the pizza is NOT suggedted, return false.
	else { return false; }
}

//Creates and populates the premade pizzas menu.
function populatePremadeMenu(obj) {
	for (var pizzaName in pizzaList) {
		var pizzaStruct = getPremadePizza(pizzaName); //Gets the structure of the pizza (by name).
		obj.append(createPizzaItem(pizzaStruct)); //Creates a div with the pizza's name, image, and size buttons.
	}
	var itemInfo = (obj.children('.menuPizzaItem')).children('.menuPizzaItemInfo');
	itemInfo.addClass('col-md-6');
}

//Creates the pizza's image.
function createPizzaImg(pizza) {
	return $('<img>', {
		'class': 'col-md-6 pizzaThumbnail',
		'src': pizza['image']
	});
}
//Creates the pizza's ingredient list.
function createPizzaIngredientsList(pizza) {
	var ingredientsList = pizza['ingredients']; //Gets the ingredient list.
	var ul = $('<ul>').addClass('mPIIIngredientList');
	for (i in ingredientsList) { //Creates a list element for each ingredient.
		ul.append($('<li>', {
			'class': 'mPIIIngredient',
			html: ingredientsList[i]
		}));
	}
	return ul;
}

//Creates the div for the pizza's name and ingredient list.
function createPizzaInfo(pizza) {
	var sug = null;
	var sugTip = null;
	if (isPizzaSuggested(pizza)) {
		sug = $('<i>').addClass('fa fa-user');
		sugTip = $('<label>').addClass('suggestedToolTip').html('( Suggested for you )');
	}
	return  $('<div>', {
		'class': 'menuPizzaItemInfo',
		html: [createItemName(pizza), createPizzaIngredientsList(pizza), sug, sugTip]
	});
}
//Creates the div for the pizza's name, ingredient list and size buttons.
function createPizzaInfoWithSize(pizza) {
	return  $('<div>', {
		'class': 'menuPizzaItemInfo',
		html: [createItemName(pizza).append(' (' + pizza['pizzaSize'] + ')'), createPizzaIngredientsList(pizza)],
	});
}
//Creates a div with the pizza's name, image and ingredient list.
function createPizzaItem(pizza) {
	return $('<div>', {
		'class': 'menuPizzaItem row',
		html: [createPizzaImg(pizza), createPizzaInfo(pizza)]
	});
}
//Creates a div with the pizza's name, size, image and ingredient list.
function createPizzaItemWithSize(pizza) {
	return $('<div>', {
		'class': 'menuPizzaItem row',
		html: [createPizzaImg(pizza), createPizzaInfoWithSize(pizza)]
	});
}


/*------------------------------------------------------------------------------

			DRINKS-RELATED CODE

------------------------------------------------------------------------------*/
//Creates and populates the drinks menu.
function populateDrinksMenu(obj) {
	for (drink in drinksList) {
		drink = getPremadeDrink(drink); //Gets the structure of the drink (by name).
		obj.append(createDrinkItem(drink)); //Adds each drink to the passed object.
	}
}

//Creates the drink's image.
function createDrinkImg(drink) {
	return $('<img>', {
		'class': 'menuDrinkItemImg',
		'src': drink['image']
	});
}
//Creates the labels that represent the drink's sizes.
function createDrinkTypes(drink) {
	var d = $('<div>').addClass('drinksInformationContainer');
	for (size in drink['sizes']) {
		var label = $('<label>', { //Gets the label for each of the drink's sizes.
			'class': 'drinksInformationTypeLabel',
			html: drink['sizes'][size]
		});
		d.append(label);
	}
	return d;
}
//Creates the div for the drink's price and order button in the extensive information bar.
function createDrinkOrderButton() {
	var price = $('<label>', { //Creates the label for the drink's price.
		'class': 'drinksInformationTypeLabel',
		html: '5€'
	});
	var button = $('<button>', { //Creates the button for ordering.
		'id': 'drinkOrderButton',
		'class': 'buttonNeutral',
		html: 'Order!',
		'click': function() { setGlobalDrink(); }
	});
	return $('<div>', { 'class':'priceContainer' }).append([price, button]);
}

//Creates a div with the drink's name and image.
function createDrinkItem(drink) {
	return $('<div>', {
		'class': 'col-md-4 menuDrinkItem',
		html: [createItemName(drink), createDrinkImg(drink)]
	});
}
