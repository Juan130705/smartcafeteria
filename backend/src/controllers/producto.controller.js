const db = require("../config/database");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {

    try {

        const [productos] =
            await db.query(
                "SELECT * FROM productos"
            );

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Obtener producto por ID
const obtenerProductoPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const [producto] =
            await db.query(
                `
                SELECT *
                FROM productos
                WHERE id = ?
                `,
                [id]
            );

        if (producto.length === 0) {

            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });

        }

        res.json(producto[0]);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Crear producto
const crearProducto = async (req, res) => {

    try {

        const {
            nombre,
            descripcion,
            precio,
            stock,
            tiempo_preparacion
        } = req.body;

        const [resultado] =
            await db.query(
                `
                INSERT INTO productos
                (
                    nombre,
                    descripcion,
                    precio,
                    stock,
                    tiempo_preparacion
                )
                VALUES
                (?, ?, ?, ?, ?)
                `,
                [
                    nombre,
                    descripcion,
                    precio,
                    stock,
                    tiempo_preparacion
                ]
            );

        res.status(201).json({
            mensaje: "Producto creado",
            id: resultado.insertId
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Actualizar producto
const actualizarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            descripcion,
            precio,
            stock,
            tiempo_preparacion
        } = req.body;

        await db.query(
            `
            UPDATE productos
            SET
                nombre = ?,
                descripcion = ?,
                precio = ?,
                stock = ?,
                tiempo_preparacion = ?
            WHERE id = ?
            `,
            [
                nombre,
                descripcion,
                precio,
                stock,
                tiempo_preparacion,
                id
            ]
        );

        res.json({
            mensaje: "Producto actualizado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

// Eliminar producto
const eliminarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            `
            DELETE FROM productos
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            mensaje: "Producto eliminado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};