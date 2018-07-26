/*------------------------------------------------------------------------------

			PIZZAS

------------------------------------------------------------------------------*/
//Array of premade suggested pizzas (for the JS generated menu).
var suggestionsList = { 'Pepperoni Lovers' : {}, 'Camponesa3' : {}, 'Camponesa2' : {} };
//Array of premade pizzas (for the JS generated menu).
var pizzaList = {
	'Pepperoni Lovers' : {
		'name' : 'Pepperoni Lovers',
		'ingredients' : ['Extra Mozzarella', 'Extra pepperoni'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'rating' : '5',
		'image' : 'img/menus/pizzaMenu/menuPizza1.png',
	},
	'Four Seasons' : {
		'name' : 'Four Seasons',
		'ingredients' : ['Ham', 'Veggies', 'Corn', 'Pineapple'],
		'nutritions' : {'Calories':'190kcal', 'Protein':'8g', 'Carbohydrates':'56g', 'Fat':'999g'},
		'rating' : '2',
		'image' : 'img/menus/pizzaMenu/menuPizza2.png',
	},
	'Camponesa' : {
		'name' : 'Camponesa',
		'ingredients' : ['Ham', 'Onion', 'Jalapeños'],
		'nutritions' : {'Calories':'2660kcal', 'Protein':'4g', 'Carbohydrates':'26g', 'Fat':'881g'},
		'rating' : '4',
		'image' : 'img/menus/pizzaMenu/menuPizza3.png',
	},
	'Camponesa2' : {
		'name' : 'Camponesa2',
		'ingredients' : ['Ham', 'Onion', 'Jalapeños'],
		'nutritions' : {'Calories':'887kcal', 'Protein':'1g', 'Carbohydrates':'12g', 'Fat':'125g'},
		'rating' : '3',
		'image' : 'img/menus/pizzaMenu/menuPizza4.png',
	},
	'Camponesa3' : {
		'name' : 'Camponesa3',
		'ingredients' : ['Ham', 'Onion', 'Jalapeños'],
		'nutritions' : {'Calories':'556kcal', 'Protein':'23g', 'Carbohydrates':'44g', 'Fat':'99g'},
		'rating' : '5',
		'image' : 'img/menus/pizzaMenu/menuPizza5.png',
	}
};

//Returns the structure of the the given pizza.
function getPremadePizza(pizzaName) { return pizzaList[pizzaName]; }
//Returns if the pizza is in the suggested pizza list.
function getIsSuggested(pizzaName) { return pizzaName in suggestionsList; }

/*------------------------------------------------------------------------------

			DRINKS

------------------------------------------------------------------------------*/
//Array of premade drinks (for the JS generated menu).
var drinksList = {
	'Water' : {
		'name' : 'Water',
		'sizes' : ['Bottle (25cl)', 'Bottle (50cl)', 'Bottle (1L)'],
		'nutritions' : {'Calories':'1kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/aqua.png',
	},
	'Sparkling Water' : {
		'name' : 'Sparkling Water',
		'sizes' : ['Bottle (25cl)', 'Bottle (50cl)', 'Bottle (1L)'],
		'nutritions' : {'Calories':'1kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/pedras.png',
	},
	'Fresh Juice' : {
		'name' : 'Fresh Juice',
		'sizes' : ['Orange Juice (25cl)', 'Blueberry Juice (25cl)', 'Lemonade (25cl)'],
		'nutritions' : {'Calories':'55kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/freshjuice.png',
	},
	'Heineken' : {
		'name' : 'Heineken',
		'sizes' : ['Bottle (25cl)', 'Can (33cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/heineken.png',
	},
	'Bavaria' : {
		'name' : 'Bavaria',
		'sizes' : ['Can (33cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/bavaria.png',
	},
	'Sweppes Citrus' : {
		'name' : 'Sweppes Citrus',
		'sizes' : ['Bottle (25cl)', 'Can (33cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/sweppescitrus.png',
	},
	'Coca-Cola' : {
		'name' : 'Coca-Cola',
		'sizes' : ['Bottle (25cl)', 'Can (33cl)', 'Glass (40cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/cocacolaclassic.png',
	},
	'Coca-Cola Zero' : {
		'name' : 'Coca-Cola Zero',
		'sizes' : ['Bottle (25cl)', 'Can (33cl)', 'Glass (40cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/cocacolazero.png',
	},
	'Coca-Cola Light' : {
		'name' : 'Coca-Cola Light',
		'sizes' : ['Bottle (25cl)', 'Can (33cl)', 'Glass (40cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/cocacolalight.png',
	},
	'Fanta Orange' : {
		'name' : 'Fanta Orange',
		'sizes' : ['Can (33cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/fantaorange.png',
	},
	'Fanta Grape' : {
		'name' : 'Fanta Grape',
		'sizes' : ['Can (33cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/fantagrape.png',
	},
	'Sprite' : {
		'name' : 'Sprite',
		'sizes' : ['Can (33cl)', 'Glass (40cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/sprite.png',
	},
	'Ice Tea Peach' : {
		'name' : 'Ice Tea Peach',
		'sizes' : ['Can (33cl)', 'Glass (40cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/iceteapeach.png',
	},
	'Ice Tea Lemon' : {
		'name' : 'Ice Tea Lemon',
		'sizes' : ['Can (33cl)', 'Glass (40cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/icetealemon.png',
	},
	'Ice Tea Mango' : {
		'name' : 'Ice Tea Mango',
		'sizes' : ['Can (33cl)', 'Glass (40cl)'],
		'nutritions' : {'Calories':'120kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/iceteamango.png',
	},
	'Burn' : {
		'name' : 'Burn',
		'sizes' : ['Can (33cl)'],
		'nutritions' : {'Calories':'240kcal', 'Protein':'8g', 'Carbohydrates':'20g', 'Fat':'80g'},
		'image' : 'img/menus/drinksMenu/burn.png',
	},
};

//Returns the structure of the the given drink.
function getPremadeDrink(drinkName) { return drinksList[drinkName]; }
