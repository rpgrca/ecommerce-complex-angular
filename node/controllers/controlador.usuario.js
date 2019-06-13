const constantes = require('../models/constantes')
const Usuario = require('../models/modelo.usuario');
const jwt = require('jsonwebtoken');

/**
 * Funcion auxiliar para crear usuario, llamada por crearUsuario y registrarUsuario.
 * 
 * @param {req} req El request enviado desde el cliente
 * @param {function(req, usuario)} callback la funcion a llamar en caso de crear al usuario,
 * exitosamente, recibe el request original y el usuario que se creo como parametros
 */
function crearUsuarioConCallback(req, callback) {
    Usuario.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        email: req.body.email,
        telefono: req.body.telefono,
        clave: req.body.clave,
        carrito: { total: 0, productos: []}
    })
    .then(user => {
        callback(req, user);
    })
}

/**
 * Registra un usuario, redireccionando a la pagina de registracion si el mail ya estaba
 * registrado, o al home para proceder al listado de productos si se pudo registrar
 * correctamente.
 */
exports.registrarUsuario = function(req, res) {
    Usuario.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return err;
        }
        else {
            if (user) {
                res.json({status: "error", message: "El usuario ya existe", data: null});
            }
            else {
                crearUsuarioConCallback(req, function(r, u) {
                    //r.session.user = u;
                    const token = jwt.sign({id: u._id}, constantes.getSecretKey(), { expiresIn: constantes.getExpirationTime() });
                    res.json({status: "success", message: "El usuario ha sido creado", data: {user: u, token: token}});
                });
            }
        }
    });
};

/**
 * Funcion de login. Busca en la base de datos si existe un usuario con ese e-mail y esa
 * clave, si existe se logueo correctamente y redirecciona a la pagina principal, si fallo
 * se vuelve a la pagina de login.
 */
exports.accederUsuario = function(req, res, next) {
    Usuario.findOne({email: req.body.email }, function(err, user) {
        if (err) {
            return next(err);
        }

        if (user) {
            if (bcrypt.compareSync(req.body.clave, user.clave)) {
                const token = jwt.sign({id: user._id}, constantes.getSecretKey(), { expiresIn: constantes.getExpirationTime() });
                res.json({status: "success", message: "Acceso permitido", data: {user: user, token: token}});
            }
            else {
                res.status(403).json({status: "error", message: "Acceso denegado", data: null});
            }
       }
        else {
            res.status(403).json({status: "error", message: "Acceso denegado", data: null});
        }
    });
}

/**
 * Valida si el token del usuario aun esta activo.
 */
exports.validarUsuario = function(req, res, next) {
    jwt.verify(req.headers['x-access-token'], constantes.getSecretKey(), function(err, decoded) {
        if (err) {
            res.json({status: "error", message: err.message + " (No se encuentra identificado en el sistema?)", data: { tokenExpired: true }});
        }
        else {
            req.body.userId = decoded.id;
            next();
        }
    })
}
