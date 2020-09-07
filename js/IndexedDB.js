var btn = document.getElementById("regresar");
window.onload = inicio;

function inicio() {
    inicioBD();
    //recuperar valores
    leerBD();
    var boton = document.getElementById("BotonAnadir");
    boton.addEventListener("click", function () {
        agregarCancion()
    }, false);
    var borrar = document.getElementById("borrar");
    borrar.addEventListener("click", borrado, false);
    var ordenar = document.getElementById("ordenar");
    ordenar.addEventListener("click", orden, false);
    /* Manejador para que no haga enter en el input */
    var texto = document.getElementById("CancionTextInput");
    texto.value = "";
    texto.addEventListener("keydown", function (event) {
        console.log("tecla pulsada");
        if (event.keyCode === 13) {
            event.preventDefault();
            agregarCancion();
        }
    }, false);
}

function agregarCancion() {
    var nuevoli = document.createElement("li");
    var texto = document.getElementById("CancionTextInput").value;
    if (texto === "") {
        alert('Debe ingresar un nombre');
        document.getElementById("CancionTextInput").focus();
    } else if (!isNaN(texto)) {
        alert("El valor: " + texto + ", no es una letra");
        document.getElementById("CancionTextInput").value = "";
        document.getElementById("CancionTextInput").focus();
    } else{
        nuevoli.textContent = texto;
        addBD(texto);
        document.getElementById("CancionTextInput").value = "";
        document.getElementById("CancionTextInput").focus();
        var ul = document.getElementById("listaEquipos");
        ul.appendChild(nuevoli);
    }
}

function orden() {
    var ul = document.getElementById("listaEquipos");
    var listado = ul.querySelectorAll("li");
    var array = new Array();
    for (var i = 0; i < listado.length; i++) {
        array[i] = listado[i].textContent;
    }
    borrarUl();
    array.sort();
    for (var i = 0; i < array.length; i++) {
        var nuevoli = document.createElement("li");
        nuevoli.textContent = array[i];
        ul.appendChild(nuevoli);
    }
}

function borrado() {
    //pedir confirmacion
    if (confirm("¿Borrar Listado?")) {
        //borrar registros de la base de datos
        var open = indexedDB.open("bd", 1);
        open.onsuccess = function (event) {
            thisDB = event.target.result;
            var transaction = thisDB.transaction(["lista"], "readwrite");
            var store = transaction.objectStore("lista");

            /*var request = store.delete("12");
        	request.onerror = function(e) {
        	}
        	request.onsuccess = function(e) {
        	}*/
            store.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    var request = store.delete(cursor.value.name);
                    request.onerror = function (e) {
                        //console.log("se ha borrado con exito");
                    }
                    request.onsuccess = function (e) {
                        //console.log("no se ha borrado con exito");
                    }
                    cursor.continue();
                }
            };
        }
        //Borrar lista
        borrarUl();
    }
}

function borrarUl() {
    var ul = document.getElementById("listaEquipos");
    var listado = ul.querySelectorAll("li");
    for (var i = listado.length - 1; i >= 0; i--) {
        listado[i].parentNode.removeChild(listado[i]); //Borramos el elemento del DOM
        if (typeof document.outerHTML !== "undefined") {
            listado[i].outerHTML = ""; //Borramos la memoria asociada al elemento
        }
    }
}


function inicioBD() {
    var openRequest = indexedDB.open("bd", 1);
    openRequest.onupgradeneeded = function (e) { //cuando es necesario crear las tablas de la base de datos
        console.log("ver");
        thisDB = e.target.result;
        console.log(thisDB);
        if (!thisDB.objectStoreNames.contains("lista")) {
            var os = thisDB.createObjectStore("lista", {
                keyPath: "name"
            }); //crear tabla
        }
    }
    openRequest.onsuccess = function (e) {
        // console.log("se ha creado con exito");
    }
    openRequest.onerror = function (e) {
        // console.log("ha ocurrido algún error");
    }
}

function addBD(nombre) {
    var texto = document.getElementById("CancionTextInput").value;
    var open = indexedDB.open("bd", 1);
    open.onsuccess = function (event) {
        thisDB = event.target.result;
        var transaction = thisDB.transaction(["lista"], "readwrite");
        var store = transaction.objectStore("lista");
        var cancion = {
            name: nombre
        };
        //console.log(cancion);

        var request = store.add(cancion);
        request.onerror = function (e) {
            // console.log("se ha guardado con exito");
        }
        request.onsuccess = function (e) {
            //  console.log("no se ha guardado con exito");
        }
    }
}

function leerBD() {
    var open = indexedDB.open("bd", 1);
    open.onsuccess = function (event) {
        thisDB = event.target.result;
        var transaction = thisDB.transaction(["lista"], "readonly");
        var store = transaction.objectStore("lista");
        store.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            var ul = document.getElementById("listaEquipos");
            if (cursor) {
                var nuevoli = document.createElement("li");
                nuevoli.textContent = cursor.value.name;
                ul.appendChild(nuevoli);
                cursor.continue();
            }
        }
    }
}
btn.addEventListener("click", function(){
    location.href = "index.html";
});