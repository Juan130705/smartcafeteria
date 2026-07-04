const db =
    require("../config/database");

const obtenerNotificaciones =
    async (req, res) => {

        try {

            console.log(
                "USUARIO JWT:",
                req.usuario
            );

            const usuarioId =
                req.usuario.id;

            const [notificaciones] =
                await db.query(
                    `
                    SELECT *
                    FROM notificaciones
                    WHERE usuario_id = ?
                    ORDER BY fecha_envio DESC
                    `,
                    [usuarioId]
                );

            console.log(
                "RESULTADO:",
                notificaciones
            );

            res.json(
                notificaciones
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                mensaje:
                    error.message
            });

        }

    };

module.exports = {
    obtenerNotificaciones
};