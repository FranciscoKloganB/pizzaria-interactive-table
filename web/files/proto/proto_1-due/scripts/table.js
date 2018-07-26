/*------------------------------------------------------------------------------

			CODE EXECUTION

------------------------------------------------------------------------------*/
$("#menubar").menubar({ minimized : false, }); //Adds the navigation bar
if (sessionStorage.ordered != "true") { //If no orders have been placed.
	managerStart(); //Initializes the order manager.
}
