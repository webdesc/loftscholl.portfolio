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

// validate form

var validator = (function(){

	var form = $('form'),
		inputs = form.find('.form-input'),
		clear = form.find('input[type="reset"]'),
		tooltip = '<div class="tooltip">Заполните поле</div>';

	return {
		init: function(){
			this.setupListeners();
		},
		setupListeners: function(){
			form.on('submit', validationForm);
			inputs.on('keyup', removeInvalid);
			clear.on('click', clearForm);
		}
	};

	function validationForm(e){
		e.preventDefault();
		var reqInput = $(this).find('[data-required="true"]');
		if (reqInput) {
			reqInput.each(function(){
				if ($(this).val() === '') {
					$(this).addClass('invalid').before(tooltip);
				} else {
					if ($(this).data('type') === 'email') {
						var email = $(this).val();
							if (!regExpEmail(email)) {
								$(this).addClass('invalid').before('<div class="tooltip">Некорректный email</div>');
							} else {
								$(this).removeClass('invalid').parent().find('.tooltip').remove();
							}
					} else {
						$(this).removeClass('invalid').parent().find('.tooltip').remove();
					}
				}
			});
		};
	};

	function regExpEmail(email) {
		var regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
			if (regExp.test(email)) {
				return true;
			} else {
				return false;
			}

	};

	function clearForm(e){
		e.preventDefault();
		var allInputs = form.find('input[type="email"], input[type="text"], textarea'),
			tooltips = form.find('.tooltip'),
			invalidInputs = inputs.filter('.invalid');
		if (tooltips.length || invalidInputs.length) {
			invalidInputs.removeClass('invalid');
			tooltips.remove();
		}
		if (allInputs) {
			allInputs.each(function(){
				$(this).val('');
			});
		};
	};

	function removeInvalid() {
		var flagInput = $(this).hasClass('invalid');
		if (flagInput) {
			$(this).removeClass('invalid').parent().find('.tooltip').remove();
		}
	};

})();