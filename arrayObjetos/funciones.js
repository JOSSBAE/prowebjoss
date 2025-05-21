//funciones.js

function saludo(){
	document.write("\
		<h1>Ejemplo de saludos</h1>\
			<ol>\
				<li>hola</li>\
				<li>¿qué hay?</li>\
				<li>whats up?</li>\
			</ol>");
}

function crearArrayTradicional(){
	let primos = [1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];

	const divArregloTradicional = document.querySelector("div");
	//innerHTML, innerText, textContent
	divArregloTradicional.innerHTML= "<hr>    <strong>   Arreglo          de   primos = 		</strong>" + primos + "<hr>";
}

function arraysAsociativos(){
	const alumno = new Array();
	alumno ["nombre"]= "Juan";
	alumno["ApellidoPat"]= "Sanchez";
	alumno["ApellidoMat"]= "Perez";
	alumno["Semestre"]= 6;
	alumno["regular"]= true;	

	const divAsoc = document.getElementsByTagName("div");
	divAsoc[1].innerText = "Alumno nombre= " + alumno["nombre"]  //divAsociativos

}
//document.write("Hola Mundo");