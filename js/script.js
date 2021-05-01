//  -------------Кастомизированный селект -------------
$.widget('app.selectmenu', $.ui.selectmenu, {
	_drawButton: function () {
		this._super();
		var selected = this.element
		.find('[selected]')
		.length,
			placeholder = this.options.placeholder;
		
		if (!selected && placeholder) {
			this.buttonItem.text(placeholder);
		}
	}
})
$(document).ready(function() {
	$('.form__select1').selectmenu({
		placeholder: 'Не выбрана'
	});
	$('.form__select2').selectmenu({
		placeholder: 'Не выбран'
	});
});

//  -------------Подсветка input при hover для form__input-badges-area -------------
let inputBadgesArea = document.querySelector('.form__input-badges-area');
let input = inputBadgesArea.querySelector('.form__input');
let badge = inputBadgesArea.querySelector('.form__badge');

input.onblur = inputBlur;
input.onfocus = inputFocus;

function inputBlur() {  
	badge.classList.remove('active');
	inputBadgesArea.classList.remove('red-circle');
}

function inputFocus() {
	badge.classList.add('active');
	inputBadgesArea.classList.add('red-circle');
}

//  -------------Скрытие/открытие контента после чекбокса "температурный режим"-------------
let checkbox = document.querySelector('.form__custom-checkbox');
let temperatureArea = document.querySelector('.form__temperature-area');

checkbox.addEventListener('click', function () { 
	if (checkbox.checked === true) {
		temperatureArea.classList.add('show');
	}
	else {
		temperatureArea.classList.remove('show');
	}
});