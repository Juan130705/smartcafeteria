const verificarRol = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (
            !req.usuario ||
            !rolesPermitidos.includes(
                req.usuario.rol
            )
        ) {

            return res.status(403).json({
                mensaje: "Acceso denegado"
            });

        }

        next();

    };

};

module.exports = verificarRol;