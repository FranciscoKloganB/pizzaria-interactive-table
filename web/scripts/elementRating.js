/*------------------------------------------------------------------------------

			VARIABLES

------------------------------------------------------------------------------*/
var preliminarRating = {};


/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
const MAX_RATING = 5;

$('#menubar').menubar();
$('#buttonConfirm').hide();


/*------------------------------------------------------------------------------

			AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
for (var i = 0; i < sessionStorage.orders; i++) {
	var values = managerGetMetaValues(i.toString()); // Gets the ordered pizzas
	if (values != null && values[0] != null && values[0] != '') { // If the order wasn't deleted.
		if (managerCheckOrderArrived(i)) {
			createOrderItem(i); // Creates the HTML structure for the order.
			createOrderElements(values[0], i); // Fills the order item with the chosen pizza and drink.
			createRating(i);
		}
	}
}

//Creates the HTML structure for the order.
function createOrderItem(index) {
	var orderDiv = $('<div>', {
					'class': 'orderStatusContainer',
					'id': 'order' + index,
					html: [ $('<div>', { 'class': 'col', 'id': 'pizza' + index })	]
				});
	var starContainer = $('<div>', {
						'class': 'starContainer',
						'id': 'order' + index + 'rating',
					});
	orderDiv.append(starContainer);
	$('#orders').append(orderDiv);
}
//Fills the order item with the chosen pizza and drink.
function createOrderElements(pizza, index) {
	setTimeout(function() {
		if (pizza != '') { $('#pizza' + index).append(createPizzaItemWithSize(pizza)); } //Shows the ordered pizza.
	}, 100);
}

function createRating(index) {
	var userRating = managerGetPizzaRating(index);
	var starContainer = $('#order' + index + 'rating');
	var i = 1;
	for (i; i <= userRating; i++) { starContainer.append($('<i>').addClass('fa fa-star active').attr('id', 'order' + index + 'ratingStar' + i)); }
	for (i; i <= MAX_RATING; i++) { starContainer.append($('<i>').addClass('fa fa-star').attr('id', 'order' + index + 'ratingStar' + i)); }

}

$('.orderStatusContainer').on("click", ".fa.fa-star", function() {
	$('#buttonConfirm').show();
	var orderNumber = ($(this).parent().parent().attr('id'))[5];
	var starsToColor = ($(this).attr('id'))[16];
	preliminarRating[orderNumber] = starsToColor;
	var i;
	for (i = 1; i <= starsToColor; i++) {
		$('#order' + orderNumber + 'ratingStar' + i).addClass('active');
	}
	for (i; i <= MAX_RATING; i++) {
		$('#order' + orderNumber + 'ratingStar' + i).removeClass('active');
	}
});

function execute() {
	for (var i = 0; i < sessionStorage.orders; i++) {
		if (preliminarRating[i]) {
			managerPizzaRate(i, preliminarRating[i]);
		}
	}
	window.location.href = 'html/table.html';
}


/*------------------------------------------------------------------------------

			MENU FLOW

------------------------------------------------------------------------------*/
$('#buttonCancel').click(function() {
	confirmationOverlayShow("Do you really wish to skip the rating step?", {
		'Yes': ['buttonDanger', execute],
		'No' : ['buttonNeutral']
	});
});
$('#buttonConfirm').click(execute);
