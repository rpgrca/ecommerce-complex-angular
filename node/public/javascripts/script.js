
/**
 * Para activar y desactivar campos obligatorios en el formulario.
 * Los campos obligatorios seran marcados con '(*)' al final del
 * Label correspondiente.
 */
var camposObligatorios = [
    "nombre",
    "apellido",
    //"dni",
    "email",
    "clave",
    "confirmarClave",
    //"telefono"
    "marca",
    "precioLista",
    "precioFinal",
    "codigo"
];

/**
 * Convierte el id del campo en un texto que se puede mostrar
 * al usuario.
 */
function traducirCampoObligatorio(c) {
    let result = c;

    if (c == "dni")
        result = "DNI";
    else if (c == "email")
        result = "e-mail";
    else if (c == "confirmarClave")
        result = "confirmaci\u00f3n de clave";
    else if (c == "precioLista")
        result = "precio de lista";
    else if (c == "precioFinal")
        result = "precio final";
    else
        result = c;

    return result;
}

/**
 * Un objeto que contiene las funciones para verificar si los
 * datos ingresados son validos. Las validaciones son simples:
 * nombre y apellido tienen que tener texto, el documento debe
 * ser un numero, el e-mail debe tener el formato x@x.x, y el
 * telefono debe ser 8 numeros, o dos grupos de cuatro con una
 * separacion con un espacio o '-' (12345678, 1234-5678 o
 * 1234 5678, por ejemplo).
 */
var validadorCampos = {
    "nombre": function(n) {
        return n.length > 0;
    },
    "apellido": function(a) {
        return a.length > 0;
    },
    "dni": function(d) {
        return !isNaN(d);
    },
    "email": function(e) {
        return /\S+@\S+\.\S+/.test(e);
    },
    "telefono": function(t) {
        return /^\(?([0-9]{4})\)?[- ]?([0-9]{4})$/.test(t);
    },
    "clave": function(c) {
        return c.length > 0;
    },
    "confirmarClave": function(c) {
        return c.length > 0;
    },
    "precioLista": function(p) {
        return !isNaN(p);
    },
    "precioFinal": function(p) {
        return !isNaN(p);
    },
    "codigo": function(c) {
        return c.length > 0;
    },
    "marca": function(m) {
        return m.length > 0;
    }
}

/**
 * Marca los campos obligatorios del formulario.
 */
function marcarCamposObligatorios() {
    for (var index = 0; index < camposObligatorios.length; index++) {
        var campo = document.getElementById(camposObligatorios[index] + "Label");
        if (campo) {
            campo.innerHTML += " (*)"
        }
    }
}

/**
 * Verifica que todos los campos obligatorios del formulario esten
 * completos. Los espacios en blanco al principio y al final de los
 * campos son eliminados, por consiguiente completar campos con
 * espacios no es permitido.
 * Esta funcion se llama tanto por la pagina para acceder como por
 * la pagina para registrar un usuario nuevo.
 */
function verificarCampos() {
    var mensaje = ""

    for (var index = 0; index < camposObligatorios.length; index++) {
        var campoId = camposObligatorios[index];
        var campo = document.getElementById(campoId);
        if (campo) {
            if (campo.value.trim().length == 0) {
                mensaje = "El campo " + traducirCampoObligatorio(campoId) + " est\u00e1 vac\u00edo";
                break;
            }
            else {
                if (! validadorCampos[campoId](campo.value)) {
                    mensaje = "El campo " + traducirCampoObligatorio(campoId) + " es inv\u00e1lido.\n";
                    break;
                }
            }
        }
    }

    if (mensaje != "") {
        alert(mensaje);
        return false;
    }
    else {
        return true;
    }
}

/**
 * Verifica que la clave y la confirmacion son iguales. Esta
 * funcion solo se llama si los campos en el formulario para
 * registrar esta correctamente completo.
 */
function verificarClaveYConfirmacion() {
    let c1 = "clave";
    let c2 = "confirmarClave";
    let clave = document.getElementById(c1);
    let confirmarClave = document.getElementById(c2);

    if (clave != undefined && confirmarClave != undefined) {
        if (clave.value != confirmarClave.value) {
            alert("La " + traducirCampoObligatorio(c1) + " y la " + traducirCampoObligatorio(c2) + " son distintas.");
            return false;
        }
    }

    return true;
}
