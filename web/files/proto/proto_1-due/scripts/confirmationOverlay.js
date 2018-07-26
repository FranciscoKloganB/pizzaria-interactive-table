const MODAL_HTML = `
					<div id="cancelModal">
						<div id="modalContainer">
							<p id="varMsg">Do you really wish to cancel your order?</p>
							<p id="conMsg">This action is irreversible.</p>
							<div id="buttonContainer">
								<button class="modalButtons" id="proceed">Yes</button>
								<button class="modalButtons" id="return">No</button>
							</div>
						</div>
					</div>
					`;


/*------------------------------------------------------------------------------

				CODE EXECUTION

------------------------------------------------------------------------------*/
$("main").append(MODAL_HTML);
var modal = $("#cancelModal");
var modalButtons = $(".modalButtons");
var functionCallBack = confirmationOverlayShow;
var functionCallBackArgs = [];


/*------------------------------------------------------------------------------

				AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
function modalClose() { modal.hide(); }
function confirmationOverlayShow(callback, args) {
	modal.show();
	modalButtons.show();
	functionCallBack = callback;
	functionCallBackArgs = args;
}


/*------------------------------------------------------------------------------

				MENU FLOW

------------------------------------------------------------------------------*/
$("#return").click(function() { modalClose(); });
$("#proceed").click(function() {
	functionCallBack(functionCallBackArgs)
	modalClose();
});
