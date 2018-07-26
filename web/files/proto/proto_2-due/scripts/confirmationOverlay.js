const MODAL_HTML = `
					<div id='modal'>
						<div id='modalContainer'>
							<p id='varMsg'>Do you really wish to cancel your order?</p>
							<p id='conMsg'>This action is irreversible.</p>
							<div id='modalButtonContainer'>
								<button class='modalButton buttonDanger' id='proceed'>Yes</button>
								<button class='modalButton buttonNeutral' id='return'>No</button>
							</div>
						</div>
					</div>
					`;


/*------------------------------------------------------------------------------

				CODE EXECUTION

------------------------------------------------------------------------------*/
$('main').append(MODAL_HTML);
var functionCallBack = confirmationOverlayShow;
var functionCallBackArgs = [];


/*------------------------------------------------------------------------------

				AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
function modalClose() { $('#modal').hide(); }
function confirmationOverlayShow(textQuestion, callback, args=[]) {
	$('#varMsg').html(textQuestion);
	$('#modal').show();
	functionCallBack = callback;
	functionCallBackArgs = args;
}


/*------------------------------------------------------------------------------

				MENU FLOW

------------------------------------------------------------------------------*/
$('#proceed').click(function() {
	modalClose();
	functionCallBack(functionCallBackArgs);
});
$('#return').click(function() { modalClose(); });
