const express = require("express");

const router = express.Router();

const {
    obtenerResumen,
    obtenerVentasDia
} = require(
    "../controllers/reporte.controller"
);

const verificarToken =
    require("../middleware/auth.middleware");

const verificarRol =
    require("../middleware/roles.middleware");

router.get(
    "/resumen",
    verificarToken,
    verificarRol("admin"),
    obtenerResumen
);

router.get(
    "/ventas-dia",
    verificarToken,
    verificarRol("admin"),
    obtenerVentasDia
);

module.exports = router;