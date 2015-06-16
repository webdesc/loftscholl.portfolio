$(document).ready(function(){

	$('.form-input').placeholder();
	
	// инициализируем модули
	if ($('.modal').length) {
		modal.init();
	}
	if ($('.field-file-upload').length) {
		fileUpload.init();
	}
	if ($('form').length) {
		validator.init();
	}

});