const express =
    require("express");

const router =
    express.Router();

const verificarToken =
    require(
        "../middleware/auth.middleware"
    );

const {
    obtenerNotificaciones
} = require(
    "../controllers/notificacion.controller"
);

router.get(
    "/",
    verificarToken,
    obtenerNotificaciones
);

module.exports = router;