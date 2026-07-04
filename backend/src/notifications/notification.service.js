const crearNotificacion =
    async (
        usuarioId,
        mensaje
    ) => {

        console.log(
            `Notificación:
            ${usuarioId}
            ${mensaje}`
        );

    };

module.exports = {
    crearNotificacion
};