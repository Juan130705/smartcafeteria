import { Navigate } from "react-router-dom";
import { obtenerUsuario } from "../utils/auth";

function ProtectedRoute({
    children,
    roles
}) {

    const usuario =
        obtenerUsuario();

    if (!usuario) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    if (
        roles &&
        !roles.includes(
            usuario.rol
        )
    ) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    return children;

}

export default ProtectedRoute;