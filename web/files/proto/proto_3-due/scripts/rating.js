/*------------------------------------------------------------------------------

				STAR RATING

------------------------------------------------------------------------------*/
const MAX_RATING = 5;

function createRating() {
	var sC = $('#starContainer');
	for (var i = 1; i <= MAX_RATING; i++) {
		sC.append($('<i>').addClass('fa fa-star').attr('id', 'star' + i));
	}
}

$(document).ready(function() {
	createRating();
	$('#buttonConfirm').hide();
	$('#menubar').menubar();
});

$('#starContainer').on("click", ".fa.fa-star", function() {
	var currentStar;
	var clickedIndex = $('.fa').index(this) + 1;
	$('#buttonConfirm').show();
	for (var i = 1; i <= MAX_RATING; i++) {
		currentStar = $('#star' + i);
		if (i <= clickedIndex) {
			currentStar.css({"color" : "green"});
		} else {
			currentStar.css({"color" : "white"});
		}
	}
});

/*------------------------------------------------------------------------------

				MODAL MANAGEMENT

------------------------------------------------------------------------------*/

function execute() {
	window.location.href = 'html/table.html';
}

$('#buttonCancel').click(function() {
	confirmationOverlayShow("Do you really wish to skip the rating step?", {
		'Yes': ['buttonDanger', execute],
		'No' : ['buttonNeutral']
	});
});

$('#buttonConfirm').click(function() {
	execute([]);
});
