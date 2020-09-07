var info = document.getElementById("info");
var form = document.getElementById("formulario");
var contenedor="";
var aleatorio = Math.floor(Math.random() * 9999) + 1000;
var btn = document.getElementById("clear");

function mostrar() {    
    var nombres = "Default";
    if (localStorage.getItem("nombres")){
        nombres = localStorage.getItem("nombres");
    }
    var apellidos = "Default";
    if (localStorage.getItem("apellidos")) {
        apellidos = localStorage.getItem("apellidos");
    }
    var email = "Default";
    if (localStorage.getItem("email")) {
        email = localStorage.getItem("email");
    }
    var data = apellidos.split(" ");
    if (data.length == 1) {
        data.push(data[0]);
    }
    contenedor += "<table class='table table-hover'>";
    contenedor += "<thead class='bg-dark text-white'>\n\t<tr>\n\t\t";
    contenedor += "<th>Nombres</th>\n\t\t";
    contenedor += "<th>Apellidos</th>\n\t\t";
    contenedor += "<th>Correo</th>\n\t\t";
    contenedor += "<th>ID</th>\n\t\t";
    contenedor += "</tr>\n\t</thead>\n";
    contenedor += "<tbody>\n\t";
    contenedor += "<tr>\n\t\t";
    contenedor += "<td>" + nombres + "</td>\n\t\t";
    contenedor += "<td>" + apellidos + "</td>\n\t\t";
    contenedor += "<td>" + email + "</td>\n\t\t";
    contenedor += "<td>" + data[0][0] + data[1][0] + aleatorio+"</td>\n\t\t";
    contenedor += "</tr></tbody>\n";
    contenedor += "</table>\n";
    info.innerHTML = contenedor;
    console.log();
}
btn.addEventListener("click",function(){
    localStorage.removeItem("nombres");
    localStorage.removeItem("apellidos");
    localStorage.removeItem("email");
    location.href = "LocalStorage.html";
});

window.onload=mostrar();