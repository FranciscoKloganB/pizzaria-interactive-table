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
		ingredients = createPizzaIngredientsList(pizza); //Creates the pizza's ingredient list.
		nutInfo = createNutritonalInfo(pizza); //Creates a div for the nutritional information table.
		ratingDiv = createRating(pizza); //Creates a div for the rating stars and the rating label.
		priceOrder = createPizzaPrice(objSize);
		container.append([ingredients, ratingDiv]);
	}
	else { //If objSize is NOT given, it's a drink.
		drinkTypes = createDrinkTypes(drink); //Gets the drink's types.
		nutInfo = createNutritonalInfo(drink); //Creates a div for the nutritional information table.
		priceOrder = createDrinkOrderButton(); //Gets the drink's order price and button.
		container.append([drinkTypes]);
	}
	container.append(nutInfo, ratingDiv, priceOrder);
	$('#extensiveInfoBar').append(container).show();
}
//Hides the extensive information bar.
function hideExtensiveInformation() { $('#extensiveInfoBar').hide(); }

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
	for (var i = 0; i < 5; i++) {
		d.append($('<i>').addClass('fa fa-star'));
	}
	d.append($('<p>', {
		'class': 'ratingValue',
		html: obj['rating']
	}));
	return d;
}

function createIncrementButtons() {
	var incPizza = $('<button>', {
		'class': 'incrementButton incPizza',
		html: '+',
		'click': function() { orderIncrementPizza(1); }
	});
	var labelPizza = $('<label>', {
		'class': 'elementNumber elNumberPizza',
		html: '1'
	});
	var decPizza = $('<button>', {
		'class': 'incrementButton decPizza',
		html: '-',
		'click': function() { orderIncrementPizza(-1); }
	});
	var incDrink = $('<button>', {
		'class': 'incrementButton incDrink',
		html: '+',
		'click': function() { orderIncrementDrink(1); }
	});
	var labelDrink = $('<label>', {
		'class': 'elementNumber elNumberDrink',
		html: '1'
	});
	var decDrink = $('<button>', {
		'class': 'incrementButton decDrink',
		html: '-',
		'click': function() { orderIncrementDrink(-1); }
	});
	var d1 = $('<div>').addClass('incButtons').append(decPizza, labelPizza, incPizza);
	var d2 = $('<div>').addClass('incButtons').append(decDrink, labelDrink, incDrink);
	return [d1, d2];
}

/*------------------------------------------------------------------------------

			PIZZA-RELATED CODE

------------------------------------------------------------------------------*/
//TODO - @RafaelRibeiro - delete this and replace it for a symbol in the corresponding pizzas in the premade pizza menu.
function populateSuggestions(obj) {
	obj.append($('<label>', { //Creates the title for the suggestion's menu.
		html: 'Suggestions tailored for you',
		'class': 'menuPremadePizzasSugestionsTitle'
	}));
	var suggestions = $('<div>', { 'id': 'menuPremadePizzasSugestions' }); //Creates the main sugestions division with lateral scroll.
	for (var pizzaName in suggestionsList) {
		var pizza = getPremadePizza(pizzaName);
		suggestions.append(createPizzaSuggestion(pizza)); //Adds each suggested pizza to the passed object.
	}
	obj.append(suggestions);
}
function createPizzaSuggestion(pizza) {
	return $('<div>', {
		html: createPizzaInfo(pizza).append(createSizeButtons()),
		'class': 'menuPizzaSugestion'
	});
}


//Creates and populates the premade pizzas menu.
function populatePremadeMenu(obj) {
	obj.append($('<label>', { //Creates the label for the menu title.
		'class': 'menuPremadeMenuTitle',
		html: 'Predesigned pizzas'
	}));
	for (var pizzaName in pizzaList) {
		var pizza = getPremadePizza(pizzaName); //Gets the structure of the pizza (by name).
		obj.append(createPizzaItemWithButtons(pizza)); //Creates a div with the pizza's name, image, and size buttons.
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
	return  $('<div>', {
		'class': 'menuPizzaItemInfo',
		html: [createItemName(pizza), createPizzaIngredientsList(pizza)]
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
//Creates a div with the pizza's name, image, ingredient list and size buttons.
function createPizzaItemWithButtons(pizza) {
	return $('<div>', {
		'class': 'menuPizzaItem row',
		html: [createPizzaImg(pizza), createPizzaInfo(pizza).append(createSizeButtons())]
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
		d.append(label).append($('<br>'));
	}
	return d;
}
//Creates the div for the drink's price and order button in the extensive information bar.
function createDrinkOrderButton() {
	var price = $('<label>', { //Creates the label for the drink's price.
		'class': 'drinksInformationTypeLabel priceContainer',
		html: '5€'
	});
	var button = $('<button>', { //Creates the button for ordering.
		'id': 'drinkOrderButton',
		html: 'Order',
		'click': function() { setGlobalDrink(); }
	});
	return $('<div>').append([price, button]);
}

//Creates a div with the drink's name and image.
function createDrinkItem(drink) {
	return $('<div>', {
		'class': 'menuDrinkItem',
		html: [createItemName(drink), createDrinkImg(drink)]
	});
}
