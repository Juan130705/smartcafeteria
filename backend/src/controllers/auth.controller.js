const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const {
            nombre,
            correo,
            password
        } = req.body;

        if (
            !nombre ||
            !correo ||
            !password
        ) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const [existe] = await db.query(
            `
            SELECT id
            FROM usuarios
            WHERE correo = ?
            `,
            [correo]
        );

        if (existe.length > 0) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const hash = await bcrypt.hash(
            password,
            10
        );

        await db.query(
            `
            INSERT INTO usuarios
            (
                nombre,
                correo,
                password_hash,
                rol
            )
            VALUES
            (?, ?, ?, ?)
            `,
            [
                nombre,
                correo,
                hash,
                "cliente"
            ]
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

const login = async (req, res) => {

    try {

        const {
            correo,
            password
        } = req.body;

        const [usuarios] = await db.query(
            `
            SELECT *
            FROM usuarios
            WHERE correo = ?
            `,
            [correo]
        );

        if (usuarios.length === 0) {

            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });

        }

        const usuario = usuarios[0];

        const passwordValida =
            await bcrypt.compare(
                password,
                usuario.password_hash
            );

        if (!passwordValida) {

            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });

        }

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        );

        res.json({

            mensaje: "Login exitoso",

            token,

            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }

        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    register,
    login
};