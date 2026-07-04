const express = require("express");

const router =
    express.Router();

const {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require(
    "../controllers/producto.controller"
);

const verificarToken =
require("../middleware/auth.middleware");

const verificarRol =
require("../middleware/roles.middleware");

router.get(
    "/",
    obtenerProductos
);

router.get(
    "/:id",
    obtenerProductoPorId
);

router.post(
    "/",
    verificarToken,
    verificarRol("admin"),
    crearProducto
);

router.put(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    actualizarProducto
);

router.delete(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    eliminarProducto
);

module.exports = router;