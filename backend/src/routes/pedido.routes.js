const express = require("express");

const router = express.Router();

const {
    crearPedido,
    obtenerPedidos,
    obtenerMisPedidos,
    obtenerPedidoPorId,
    actualizarEstadoPedido
} = require("../controllers/pedido.controller");

const verificarToken =
    require("../middleware/auth.middleware");

const verificarRol =
    require("../middleware/roles.middleware");

router.post(
    "/",
    verificarToken,
    crearPedido
);

router.get(
    "/",
    verificarToken,
    obtenerPedidos
);

router.get(
    "/mis-pedidos",
    verificarToken,
    obtenerMisPedidos
);

router.get(
    "/:id",
    verificarToken,
    obtenerPedidoPorId
);

router.put(
    "/:id/estado",
    verificarToken,
    verificarRol(
        "admin",
        "empleado"
    ),
    actualizarEstadoPedido
);

module.exports = router;