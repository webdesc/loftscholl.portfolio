$(document).ready(function(){
	
	// инициализируем модули
	if ($('.modal').length) {
		modal.init();
	}
	if ($('.field-file-upload').length) {
		fileUpload.init();
	}

});