$(document).ready(function() {
	if(window.location.href=='http://localhost:3000/map') {
		var elems = document.getElementsByClassName("nav__bar_menu-item");
			elems[0].classList.remove('active');
			$(elems[1]).addClass('active');
		}
	$('#phoneFill').click(function(event) {
		event.preventDefault();
		FillNumber();
	});
	$('#fullnameFill').click(function(event) {
		event.preventDefault();
		FillName();
	});
	$('#FillPlace').click(function(event) {
		event.preventDefault();
		FillPlace();
	});
	$('.header__burger').click(function(event) {
		event.preventDefault();
		$('.nav__bar').toggleClass('active');
		$('.container-body').toggleClass('active');
	});
	$('.nav__bar_menu-item').click(function(e) {
		var linkClass = $(this);
		var linkClass2 = $('.icon');
		var elems = document.getElementsByClassName("nav__bar_menu-item");
		var elems2 = document.getElementsByClassName("icon");
		for (var i = 0; i < elems.length; i++) {
			elems[i].classList.remove('active');
			$(linkClass).addClass('active');
		}
	});
	$('.category_bar-item').click(function(e) {
		var linkClass = $(this);
		var elems = document.getElementsByClassName("category_bar-item");
		var elemsS = document.getElementsByClassName("category_switcher");
		for (var i = 0; i < elems.length; i++) {
			elems[i].classList.remove('active');
			$(linkClass).addClass('active');
			elemsS[i].classList.remove('active');
			$('.category_bar-item.active > .category_switcher').addClass('active');
		} 
		
	});
	$('#checkId11').click(function(e) {
		if($('#checkId11').val(this.checked)) {
			$('.form__other-wrapper').toggleClass('active');
		}
	});
	$('#militaryID2').click(function(e) {
		if($('#militaryID2').val(this.checked)) {
			$('.form__military-notification').addClass('active');
		}
		
	});
	$('#militaryID1').click(function(e) {
		$('.form__military-notification').removeClass('active');
	});
	$('#checkId10').click(function(e) {
		$('.form__militarybook-check').toggleClass('active');
	});
});