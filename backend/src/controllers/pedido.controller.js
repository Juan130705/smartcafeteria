const db = require("../config/database");
const generarNumeroOrden =
    require("../utils/generarOrden");

/* CREAR PEDIDO */

const crearPedido = async (req, res) => {

    try {

        const { productos } = req.body;

        const usuario_id =
            req.usuario.id;

        if (
            !productos ||
            productos.length === 0
        ) {

            return res.status(400).json({
                mensaje:
                    "Los productos son obligatorios"
            });

        }

        let subtotal = 0;

        for (const item of productos) {

            const [producto] =
                await db.query(
                    `
                    SELECT *
                    FROM productos
                    WHERE id = ?
                    `,
                    [item.producto_id]
                );

            if (
                producto.length === 0
            ) {

                return res.status(404).json({
                    mensaje:
                        "Producto no encontrado"
                });

            }

            subtotal +=
                Number(
                    producto[0].precio
                ) *
                item.cantidad;

        }

        const numeroOrden =
            generarNumeroOrden();

        const [pedido] =
            await db.query(
                `
                INSERT INTO pedidos
                (
                    usuario_id,
                    numero_orden,
                    subtotal,
                    total
                )
                VALUES
                (?, ?, ?, ?)
                `,
                [
                    usuario_id,
                    numeroOrden,
                    subtotal,
                    subtotal
                ]
            );

        const pedidoId =
            pedido.insertId;

        for (const item of productos) {

            const [producto] =
                await db.query(
                    `
                    SELECT *
                    FROM productos
                    WHERE id = ?
                    `,
                    [item.producto_id]
                );

            await db.query(
                `
                INSERT INTO detalle_pedido
                (
                    pedido_id,
                    producto_id,
                    cantidad,
                    precio_unitario,
                    subtotal
                )
                VALUES
                (?, ?, ?, ?, ?)
                `,
                [
                    pedidoId,
                    item.producto_id,
                    item.cantidad,
                    producto[0].precio,
                    Number(
                        producto[0].precio
                    ) *
                        item.cantidad
                ]
            );

        }

        res.status(201).json({
            pedido_id: pedidoId,
            numero_orden:
                numeroOrden,
            total: subtotal,
            estado: "pendiente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje:
                error.message
        });

    }

};

/* OBTENER PEDIDOS */

const obtenerPedidos = async (
    req,
    res
) => {

    try {

        const [pedidos] =
            await db.query(
                `
                SELECT *
                FROM pedidos
                ORDER BY id DESC
                `
            );

        for (const pedido of pedidos) {

            const [productos] =
                await db.query(
                    `
                    SELECT
                        dp.cantidad,
                        p.nombre
                    FROM detalle_pedido dp
                    INNER JOIN productos p
                        ON p.id = dp.producto_id
                    WHERE dp.pedido_id = ?
                    `,
                    [pedido.id]
                );

            pedido.productos =
                productos;

        }

        res.json(
            pedidos
        );

    } catch (error) {

        res.status(500).json({
            mensaje:
                error.message
        });

    }

};

/* OBTENER PEDIDO POR ID */

const obtenerPedidoPorId =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const [pedido] =
                await db.query(
                    `
                    SELECT *
                    FROM pedidos
                    WHERE id = ?
                    `,
                    [id]
                );

            if (
                pedido.length === 0
            ) {

                return res.status(404).json({
                    mensaje:
                        "Pedido no encontrado"
                });

            }

            res.json(
                pedido[0]
            );

        } catch (error) {

            res.status(500).json({
                mensaje:
                    error.message
            });

        }

    };

/* ACTUALIZAR ESTADO */

const actualizarEstadoPedido =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const { estado } =
                req.body;

            await db.query(
                `
                UPDATE pedidos
                SET estado = ?
                WHERE id = ?
                `,
                [
                    estado,
                    id
                ]
            );

            if (
                estado === "listo"
            ) {

                const [pedido] =
                    await db.query(
                        `
                        SELECT
                            usuario_id,
                            numero_orden
                        FROM pedidos
                        WHERE id = ?
                        `,
                        [id]
                    );

                if (
                    pedido.length > 0
                ) {

                    await db.query(
                        `
                        INSERT INTO notificaciones
                        (
                            usuario_id,
                            mensaje
                        )
                        VALUES
                        (?, ?)
                        `,
                        [
                            pedido[0]
                                .usuario_id,

                            `✅ Tu pedido ${pedido[0].numero_orden} ya está listo para recoger.`
                        ]
                    );

                }

            }

            res.json({
                mensaje:
                    "Estado actualizado correctamente"
            });

        } catch (error) {

            res.status(500).json({
                mensaje:
                    error.message
            });

        }

    };

/* OBTENER MIS PEDIDOS */

const obtenerMisPedidos =
    async (req, res) => {

        try {

            const usuarioId =
                req.usuario.id;

            const [pedidos] =
                await db.query(
                    `
                    SELECT *
                    FROM pedidos
                    WHERE usuario_id = ?
                    ORDER BY id DESC
                    `,
                    [usuarioId]
                );

            for (const pedido of pedidos) {

                const [productos] =
                    await db.query(
                        `
                        SELECT
                            dp.cantidad,
                            p.nombre
                        FROM detalle_pedido dp
                        INNER JOIN productos p
                            ON p.id = dp.producto_id
                        WHERE dp.pedido_id = ?
                        `,
                        [pedido.id]
                    );

                pedido.productos =
                    productos;

            }

            res.json(
                pedidos
            );

        } catch (error) {

            res.status(500).json({
                mensaje:
                    error.message
            });

        }

    };


    module.exports = {
    crearPedido,
    obtenerPedidos,
    obtenerMisPedidos,
    obtenerPedidoPorId,
    actualizarEstadoPedido
};