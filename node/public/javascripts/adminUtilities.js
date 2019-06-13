
/**
 * Funcion para ser llamada desde el formulario de busqueda de usuarios. Al presionar el
 * boton en lugar de dejar que el formulario realice la peticion esta se hace con AJAX
 * para esperar la respuesta y poder mostrarla dentro del textarea inferior en lugar de
 * cargar una nueva pagina.
 * 
 * @param {string} urlFormularioBase La url de la accion a llamar desde el formulario
 * @param {boolean} raw Indica si se quiere recibir el json directamente
 */
function buscarYesperarRespuesta(urlFormularioBase, raw) {
    var xmlhttp = new XMLHttpRequest();
    var v = document.getElementById("idBuscar").value;
    xmlhttp.open("GET", urlFormularioBase + "/" + v);
    var formData = new FormData(document.getElementById("formularioBusqueda")); 
    xmlhttp.send(formData);

    if (raw) {
        xmlhttp.onload = function(event) {
            var textarea = document.getElementById("resultadoBusqueda");
            textarea.value = event.target.response;
        };
    }

    return false;
}

/**
 * Funcion para ser llamada desde el formulario de borrado de usuarios. Al presionar el
 * boton en lugar de dejar que el formulario realice la peticion esta se hace con AJAX para
 * esperar la respuesta y poder mostrarla como un tooltip al lado del boton en lugar de
 * cargar una nueva pagina.
 * TODO: No puedo usar esta funcion porque si se borra el usuario actual, no puedo refrescar
 * la pagina.
 * 
 * @param {string} urlFormularioBase La url de la accion a llamar desde el formulario
 */
function borrarYesperarRespuesta(urlFormularioBase) {
    var v = document.getElementById("idBorrar").value;
    var span = document.getElementById("resultadoBorrado");

    if (v) {
        span.innerText = "";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", urlFormularioBase + "/" + v);
        var formData = new FormData(document.getElementById("formularioBorrar"));
        xmlhttp.send(formData);

        xmlhttp.onload = function(event) {
            span.innerText = event.target.response;
        };
    }
    else {
        span.innerText = "Ingrese el id, por favor"
    }

    return false;
}