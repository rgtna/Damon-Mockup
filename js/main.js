"use strict";
/* global gus garry:true */
/* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */

var $form = $("#survey");
var choiceSelected;

$form.submit(function formSubmitted () {
	choiceSelected = $("input[type=radio]:checked").val();
	return false;
});


// Variable to hold request
var request;

// Bind to the submit event of our form
$("#foo").submit(function(event){
	// Abort any pending request
	if (request) {
		request.abort();
	}
	// setup some local variables
	var $form = $(this);

	// Let's select and cache all the fields
	var $inputs = $form.find("input, select, button, textarea");

	// Serialize the data in the form
	var serializedData = $form.serialize();

	// Let's disable the inputs for the duration of the Ajax request.
	// Note: we disable elements AFTER the form data has been serialized.
	// Disabled form elements will not be serialized.
	$inputs.prop("disabled", true);

	// fire off the request to /form.php
	request = $.ajax({
		url: "https://script.google.com/macros/s/AKfycbzdf4FfoLcZ2UsB0WL38LaoviVdWS7mEVdj8tVMJ-AgdV_X_zCJ/exec",
		type: "post",
		data: serializedData
	});

	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR){
		// Log a message to the console
		console.log("Hooray, it worked!");
	});

	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown){
		// Log the error to the console
		console.error(
			"The following error occurred: "+
			textStatus, errorThrown
		);
	});

	// Callback handler that will be called regardless
	// if the request failed or succeeded
	request.always(function () {
		// Reenable the inputs
		$inputs.prop("disabled", false);
	});

	// Prevent default posting of form
	event.preventDefault();
});