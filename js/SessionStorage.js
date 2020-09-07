function addProducto() {
    var producto = document.getElementById('producto').value;
    var precio = document.getElementById('precio').value;
    if (producto.length == 0 || precio.length == 0) {
        alert('Debe llenar el campo');
        return false;
    } else if (isNaN(precio)) {
        alert('Debe ingresar un número como precio');
        document.getElementById('precio').value = "";
        document.getElementById('precio').focus();
        return false;
    } else if (/^([0-9])*$/.test(producto)){
        alert("El valor " + producto + " no es una letra");
        document.getElementById('producto').value = "";
        document.getElementById('producto').focus();
    } else {
        sessionStorage.setItem(producto, precio); //ó sessionStorage[producto]=precio
        mostrarDatos(producto);
        document.getElementById('producto').value = "";
        document.getElementById('precio').value = "";
    };
}

function mostrarDatos() {
    var datosDisponibles = document.getElementById('datosDisponibles');
    datosDisponibles.innerHTML = '';
    for (var i = 0; i < sessionStorage.length; i++) {
        var producto = sessionStorage.key(i);
        var precio = sessionStorage.getItem(producto);
        datosDisponibles.innerHTML += '<div>' + producto + ' - ' + precio + '</div>';
    }
}

function limpiarVista() {
    var datosDisponibles = document.getElementById('datosDisponibles');
    datosDisponibles.innerHTML = 'Limpiada vista. Los datos permanecen.';
}

function borrarTodo() { 
    sessionStorage.clear(); mostrarDatos(); 
}