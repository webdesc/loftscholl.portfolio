// modals

var modal = (function(){

	var btnShowModal = $('.show-modal'),
		btnCloseModal = $('.modal-close');

	return {
		init: function(){
			this.setupListeners();
		},
		setupListeners: function(){
			btnShowModal.on('click', showModal);
			btnCloseModal.on('click', closeModal);
		}
	};

	function showModal(e){
		e.preventDefault();
		var modalID = $(this).data('modal'),
			modal = $('#'+modalID),
			modalWrp = modal.closest('.modal-wrp'),
			marginTop = modal.height()/2;
		modalWrp
			.css('visibility', 'visible')
			.animate({
				opacity: 1
			}, 500);
		modal
			.animate({
				top: '50%'
			}, 300)
			.animate({
				marginTop: '-'+marginTop
			}, 400);
	};

	function closeModal(e){
		e.preventDefault();
		var modal = $(this).closest('.modal'),
			modalWrp = modal.closest('.modal-wrp'),
			res_a_1 = $.Deferred(),
			res_a_2 = $.Deferred();
		modal
			.stop(true, true)
			.animate({
				top: '-3000px'
			}, 500, res_a_1.resolve)
			.css('marginTop', 0);
		modalWrp
			.stop(true, true)
			.animate({
				opacity: 0
			}, 300, res_a_2.resolve);
		
		$.when(
			res_a_1, res_a_2
		).done(
			function(){
				modalWrp.css('visibility', 'hidden');
			}
		);
	};

})();

// forms

var fileUpload = (function(){

	var wrapper = $('.field-file-upload'),
		input = wrapper.find('input'),
		fakeInput = wrapper.find('.fake-input-text'),
		fileAPI = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

	return {
		init: function(){
			this.setupListeners();
		},
		setupListeners: function(){
			input.on('change', getFileName);
		}
	};

	function getFileName(e){
		e.preventDefault();
		var fileName;
		if (fileAPI && input[0].files[0]) {
			fileName = input[0].files[0].name;
		} else {
			fileName = input.val().replace('C:\\fakepath\\', '');
		}
		if (!fileName.length)
			return;
		fakeInput.text(fileName);
	}

})();