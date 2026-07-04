const db = require("../config/database");

const obtenerResumen = async (req, res) => {

    try {

        const [ventas] = await db.query(`
            SELECT
                COUNT(*) AS pedidos,
                IFNULL(SUM(total), 0) AS ventas
            FROM pedidos
            WHERE DATE(fecha_pedido) = CURDATE()
        `);

        const [productos] = await db.query(`
            SELECT
                IFNULL(SUM(cantidad), 0) AS vendidos
            FROM detalle_pedido
        `);

        const [topProducto] = await db.query(`
            SELECT
                p.nombre,
                SUM(d.cantidad) AS total
            FROM detalle_pedido d
            INNER JOIN productos p
                ON p.id = d.producto_id
            GROUP BY p.nombre
            ORDER BY total DESC
            LIMIT 1
        `);

        res.json({
            pedidosHoy: ventas[0].pedidos,
            ventasHoy: ventas[0].ventas,
            productosVendidos: productos[0].vendidos,
            productoTop:
                topProducto.length > 0
                    ? topProducto[0].nombre
                    : "Sin datos"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

const obtenerVentasDia = async (req, res) => {

    try {

        const [ventas] = await db.query(`
            SELECT
                DATE(fecha_pedido) AS fecha,
                SUM(total) AS ventas
            FROM pedidos
            GROUP BY DATE(fecha_pedido)
            ORDER BY fecha
        `);

        res.json(ventas);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    obtenerResumen,
    obtenerVentasDia
};