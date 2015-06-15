var inzoart = (function(){
	var images, position, options, elementContent;
	// Guardar todas las imagenes en un array.
	// Ocultar la ultima y mostrar la siguiente a la ultima
	// En una variable guardar la imagen que se encuentra visible y su posición dentro del array

	function createImage(imgSrc, pos){
		var img = document.createElement("IMG");
		img.src = imgSrc;
		img.setAttribute("style","display:none");
		img.setAttribute("data-position", pos);
		return img;
	}

	function init(element, options){

		images = options.images || [];
		elementContent = element; 

		if(!images)return;
		var length, count, domElement;

		length = images.length;
		count = 1;
		domElement = document.getElementById(element);

		for(var i = 0;i<length; i++){
			domElement.appendChild(createImage(images[i], i));
		}

		var firstElement = document.querySelectorAll('[data-position="0"]')[0];
		position = 0;

		firstElement.setAttribute("style", "display:inline");

		setInterval(next, 3000);
	}

	function next(){
		var positionOld = position;
		position = position == images.length -1 ? 0 : position +1;
		var element = document.querySelectorAll('[data-position="'+ positionOld +'"]')[0];
		var elementNext = document.querySelectorAll('[data-position="'+ position +'"]')[0];

		element.setAttribute("style", "display:none");
		elementNext.setAttribute("style", "display:inline");
	}

	function fadeOut(element) {
		if(!element)
			return;
		var opacity = 1;
		var interval = setInterval(function(){
			if(opacity){
				element.setAttribute("opacity", opacity);
				opacity = opacity - 0.1;
			} else {
				clearInterval(interval);
			}
		},100);

	}

	function add(src){
		var domElement = document.getElementById(elementContent);
		domElement.appendChild(createImage(src, images.length));
		images.push(src);
	}

	return {
		slider: init,
		addImage: add
	}
})();