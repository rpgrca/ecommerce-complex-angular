const Producto = require('../models/modelo.producto');
const Usuario = require('../models/modelo.usuario');

/**
 * Agrega un producto al carrito del cliente
 */
exports.agregar = function(req, res, next) {
    Producto.findOne({codigo: req.body.codigo}, function(err, prod) {
        if (err) {
            res.json({status: "error", message: "Acceso denegado", data: null});
        }
        else {
            Usuario.findOne({_id: req.body.userId}, function(err, user) {
                if (err) {
                    res.json({status: "error", message: "Usuario actual no encontrado", data: null});
                }
                else {
                    let jsonObject = user.carrito;
                    let jsonArray = [];
                    if (jsonObject) {
                        jsonArray = jsonObject.productos;
                    }

                    let found = false;
                    let total = 0;

                    for (let jsonElement of jsonArray) {
                        if (jsonElement.codigo === prod.codigo) {
                            jsonElement.cantidad++;
                            jsonElement.precioTotal = jsonElement.precioUnidad * jsonElement.cantidad;
                            found = true;
                        }

                        total += jsonElement.precioTotal;
                    }

                    if (! found) {
                        jsonArray.push({nombre: prod.nombre,
                                        codigo: prod.codigo,
                                        precioUnidad: prod.precioFinal,
                                        cantidad: 1,
                                        precioTotal: prod.precioFinal
                                    });
                    }

                    jsonObject.total = total;
                    jsonObject.productos = jsonArray;
                    user.carrito = jsonObject;
                    Usuario.updateOne({_id: user._id}, {$set: user}, function(err, updres) {
                        if (err) {
                            res.json({status: "error", message: "Error al grabar el carrito", data: null});
                        }
                        else {
                            if (updres.ok == 1) {
                                res.json({status: "success", message: "Producto agregado al carrito", data: jsonObject});
                            }
                        }
                    })
                }
            });
        }
    });
};

/**
 * Remove todos los items del carrito de un usuario
 */
exports.purgar = function(req, res, next) {
    Usuario.findOne({_id: req.body.userId}, function (err, user) {
        if (err) {
            res.json({status: "error", message: "Usuario actual no encontrado", data: null});
        }
        else {
            user.carrito = {total: 0, productos: []};
            Usuario.updateOne({_id: user._id}, {$set: user}, function(err, updres) {
                if (err) {
                    res.json({status: "error", message: "Error al purgar el carrito", data: null});
                }
                else {
                    if (updres.ok == 1) {
                        res.json({status: "success", message: "Carrito purgado", data: user.carrito});
                    }
                }
            })

        }
    })
}

/**
 * Remueve un item del carrito del usuario.
 */
exports.remover = function(req, res, next) {
    Usuario.findOne({_id: req.body.userId}, function(err, user) {
        if (err) {
            res.json({status: "error", message: "Usuario actual no encontrado", data: null});
        }
        else {
            let jsonObject = user.carrito;
            let jsonArray = [];
            if (jsonObject) {
                jsonArray = jsonObject.productos;
            }
            let total = 0

            for (let jsonElement of jsonArray) {
                if (jsonElement.codigo === req.body.codigo) {
                    jsonElement.cantidad--;
                    jsonElement.precioTotal = jsonElement.precioUnidad * jsonElement.cantidad;
                }

                total += jsonElement.precioTotal;
            }

            jsonArray = jsonArray.filter(function(value, index, arr) {
                return value.cantidad >= 1;
            });

            jsonObject.total = total;
            jsonObject.productos = jsonArray;
            user.carrito = jsonObject;
            Usuario.updateOne({_id: user._id}, {$set: user}, function(err, updres) {
                if (err) {
                    res.json({status: "error", message: "Error al grabar el carrito", data: null});
                }
                else {
                    if (updres.ok == 1) {
                        res.json({status: "success", message: "Carrito actualizado", data: jsonObject});
                    }
                }
            })
        }
    });
}

/**
 * Retorna los items que se encuentran en el carrito del usuario dado
 */
exports.listar = function(req, res, next) {
    Usuario.findOne({_id: req.body.userId}, function(err, user) {
        if (err) {
            res.json({ status: "error", message: "No se encontró el carrito del usuario" });
        }
        else {
            res.json({ status: "success", message: null, data:user.carrito });
        }
    });
};

