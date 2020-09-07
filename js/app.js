var nombres = document.getElementById("nombres");
var apellidos = document.getElementById("apellidos");
var email = document.getElementById("email");
var fecha = document.getElementById("fecha");
var clave = document.getElementById("pass");
var clave2 = document.getElementById("cpass");
var info = document.getElementById("info");
var btnAccesar = document.getElementById("btnIngresar");
var form=document.getElementById("formulario");
var contenedor="";

function validar() {
	if (clave.value != clave2.value) {
		alert('Las contraseñas no coinciden');
		return false; 
	}
	else {
    	return true;
    }
}

function llenardatos(nombres, apellidos, email, clave, clave2, fecha) {
	this.nombres=nombres.value;
	localStorage.setItem("nombres", this.nombres);
	this.apellidos=apellidos.value;
	localStorage.setItem("apellidos", this.apellidos);
	this.email=email.value;
	localStorage.setItem("email", this.email);
	this.clave=clave.value;
	this.clave2=clave2;
	this.fecha=fecha.value;
}

btnAccesar.addEventListener("click", function () {
	var resultados = new llenardatos(nombres, apellidos, email, clave, fecha);
	resultados.mostrar();
});


