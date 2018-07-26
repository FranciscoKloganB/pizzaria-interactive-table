const MODAL_HTML2 = `
					<div id='modal2'>
						<div id='modalContainer'>
							<p id='varMsg2'>Acknowledge.</p>
							<div id='modalButtonContainer'>
								<button class='modalButton buttonNeutral' id='return2'>OK</button>
							</div>
						</div>
					</div>
					`;


/*------------------------------------------------------------------------------

				CODE EXECUTION

------------------------------------------------------------------------------*/
$('main').append(MODAL_HTML2);
var functionCallBack2 = null;
var functionCallBackArgs2 = [];


/*------------------------------------------------------------------------------

				AUXILIAR FUNCTIONS

------------------------------------------------------------------------------*/
function modalClose2() { $('#modal2').hide(); }
function acknowledgementOverlayShow(text, callback, args) {
	$('#varMsg2').html(text);
	$('#modal2').show();
	functionCallBack2 = callback;
	functionCallBackArgs2 = args;
}


/*------------------------------------------------------------------------------

				MENU FLOW

------------------------------------------------------------------------------*/
$('#return2').click(function() {
	modalClose2();
	if (functionCallBack2 != undefined) { functionCallBack2(functionCallBackArgs); }
});
