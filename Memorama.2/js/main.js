var canPlay = false; 
$(document).ready(function(){


	$(".img-thumbnail").attr("src", "img/logo.png");

	
	

	img1 = {
		ruta: "",
		id: ""
	};

	var img2 = {
		ruta: "",
		id: ""
	};

	var push = 0,
		intentos,
		intentosFallidos = 0,
		intentosCorrectos = 0;

	const audiowin = new Audio("/sounds/win.wav" );
	const flip = new Audio("/sounds/flip.wav" );
	const point = new Audio("/sounds/point.wav");
	const error = new Audio("/sounds/error.wav");
	const bomb = new Audio("/sounds/bomb.wav");

	$(".img-thumbnail").click(function(){
		if (canPlay){

		if ($(this).attr("class") == "NULL") {
			return null};
			$(this).fadeOut(1);
			$(this).fadeIn();
			var foto = $(this).attr("src").split("/");
			foto = foto[foto.length - 1];
	
			if(foto == "logo.png"){
				if (push == 0){
					
					img1.ruta = $(this).data("alt").split("/");
					img1.ruta = img1.ruta[img1.ruta.length - 1];		
					img1.id = $(this).attr("id");
					flip.play();
					if(img1.ruta == "bomb.jpg"){
						bomb.play();
						alert("Huy perdiste!")
						setTimeout(function(){
							window.location.reload();
						}, 1000);
						
					}
				}else{
					img2.ruta = $(this).data("alt").split("/");
					img2.ruta = img2.ruta[img2.ruta.length - 1];
					img2.id = $(this).attr("id");
					flip.play();
					if(img2.ruta == "bomb.jpg"){
						bomb.play();
						alert("Huy perdiste!")
						setTimeout(function(){
							window.location.reload();
						}, 1000);
					}
				}
	
				if (push == 1){
					setTimeout(function(){
						intentos++;
						$("#intentos").text(intentos);
						if (img1.ruta != img2.ruta) {
							error.play();
							$("#result").text("Incorrecto");
							$(".img-thumbnail").attr("src", ("img/logo.png"));
							intentosFallidos++;
							$("#intentosFallidos").text(intentosFallidos);
						}else{
							$("#result").text("Correcto");
							point.play();
							$("#"+img1.id).attr("src", "img/like.jpg");
							$("#"+img2.id).attr("src", "img/like.jpg");
							// Si ya estan bien se 
							$("#"+img1.id).attr("class", "NULL");
							$("#"+img2.id).attr("class", "NULL");
							intentosCorrectos++;
							$("#intentosCorrectos").text(intentosCorrectos);
	
							if (intentosCorrectos == 7) {
								audiowin.play();
								var msg = "Felicidades Ganaste :D  !! \n¿Desea cambiar de usuario?";
								if(localStorage.getItem("toperrors") == null || intentosFallidos > Number(localStorage.getItem("toperrors"))){
									localStorage.setItem("toplayer", nickuser) ;
	
									localStorage.setItem("toperrors", intentosFallidos);
									$("#Rfallos").text(intentosFallidos);
									$("#Rnickuser").text(nickuser);
								}
								var option = confirm(msg);
								if (option) {
									window.location.reload();		
								}else {
									intentosFallidos=0;
									intentosCorrectos=0;
									$("#intentosFallidos").text(intentosFallidos);
									$("#intentosCorrectos").text(intentosCorrectos);
									
								}
							}
						}
						push = 0;
					},700);
				}
				ruta = $(this).data("alt");
				$(this).attr("src", "img/" + ruta);
				push++;

			}else{
				$(this).attr("src", "img/logo.png");
				push--;
			}
		}
		});
		
});
$(document).delegate('#addNew', 'click', function(event) {
	event.preventDefault();
	nickuser= $('#usuario').val();
	$("#nickuser").text(nickuser);
	canPlay = true;
	crearImagenes();

	setTimeout(function(){
	$(".img-thumbnail").attr("src", "img/logo.png")
	}, 3000); 

});

function crearImagenes(){
	var rutas = [
		["0.jpg", 0],
		["1.jpg", 0],
		["2.jpg", 0],
		["3.jpg", 0],
		["4.jpg", 0],
		["5.jpg", 0],
		["6.jpg", 0],
		["bomb.jpg",0]
	];
	for (var i = 1; i <= 15; i++) {
		var num = Math.floor(Math.random()*10%8);
		if(rutas[num][1] < 2 ){

			$("#foto"+i).data("alt", rutas[num][0]);
			$("#foto"+i).attr("src", "img/" + rutas[num][0]);

			if(rutas[num][0] == "bomb.jpg"){
				rutas[num][1]++;
			}

			rutas[num][1]++;
		}else{
			i--;
		}
	}
}