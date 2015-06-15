var inzoart = (function(){
	var time, src, images;
	// Guardar todas las imagenes en un array.
	// Ocultar la ultima y mostrar la siguiente a la ultima
	// En una variable guardar la imagen que se encuentra visible y su posición dentro del array

	function init(element, options){

		images = options.images || {};
		var length = images.length;
		var count = 1;
		var domElement = document.getElementById(element);

		for(var i = 0;i<length; i++){
			var img = document.createElement("IMG");
			img.src = images[i];
			domElement.appendChild(img);
			img.setAttribute("style","display:none");
			img.setAttribute("data-position", i);
			if(i==1){
				img.setAttribute("style","display:inline");
			}
		}

		setInterval(function(){ 
			var imgs = document.getElementsByTagName("IMG");
			var imgsLength = imgs.length;
			for(var i = 0; i<imgsLength; i++){
				imgs[i].setAttribute("style", "display:none");
			}
			imgs[count].setAttribute("style", "display:inline");

			count = count == imgsLength -1 ? 0 : count+1;
		}, 3000);
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

	return {
		slider: init
	}
})();