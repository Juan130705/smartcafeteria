import { Link } from "react-router-dom";

import {
    useCarrito
} from "../context/CarritoContext";

import {
    obtenerUsuario,
    logout
} from "../utils/auth";

function Navbar() {

    const usuario =
        obtenerUsuario();

    const { carrito } =
        useCarrito();

    const cantidad =
        carrito.reduce(
            (acc, item) =>
                acc + item.cantidad,
            0
        );

    const cerrarSesion = () => {

        logout();

        window.location.href =
            "/login";

    };

    return (

        <nav
            style={{
                background:
                    "#1976d2",

                padding:
                    "15px",

                display:
                    "flex",

                gap:
                    "20px",

                alignItems:
                    "center"
            }}
        >

            {!usuario && (

                <Link
                    to="/login"
                    style={linkStyle}
                >
                    Login
                </Link>

            )}

            {usuario?.rol ===
                "cliente" && (

                <>

                    <Link
                        to="/"
                        style={linkStyle}
                    >
                        🍔 Menú
                    </Link>

                    <Link
                        to="/carrito"
                        style={linkStyle}
                    >
                        🛒 Carrito (
                        {cantidad}
                        )
                    </Link>

                    <Link
                        to="/pedidos"
                        style={linkStyle}
                    >
                        📦 Mis Pedidos
                    </Link>

                    <Link
                        to="/notificaciones"
                        style={linkStyle}
                    >
                        🔔 Notificaciones
                    </Link>

                    <Link
                        to="/perfil"
                        style={linkStyle}
                    >
                        👤 Perfil
                    </Link>

                </>

            )}

            {usuario?.rol ===
                "empleado" && (

                <>

                    <Link
                        to="/cocina"
                        style={linkStyle}
                    >
                        👨‍🍳 Cocina
                    </Link>

                    <Link
                        to="/perfil"
                        style={linkStyle}
                    >
                        👤 Perfil
                    </Link>

                </>

            )}

            {usuario?.rol ===
                "admin" && (

                <>

                    <Link
                        to="/admin"
                        style={linkStyle}
                    >
                        ⚙️ Administración
                    </Link>

                    <Link
                        to="/cocina"
                        style={linkStyle}
                    >
                        👨‍🍳 Cocina
                    </Link>

                    <Link
                        to="/perfil"
                        style={linkStyle}
                    >
                        👤 Perfil
                    </Link>

                </>

            )}

            {usuario && (

                <button
                    onClick={
                        cerrarSesion
                    }
                    style={{
                        marginLeft:
                            "auto",

                        border:
                            "none",

                        padding:
                            "8px 15px",

                        borderRadius:
                            "5px",

                        cursor:
                            "pointer"
                    }}
                >
                    🚪 Salir
                </button>

            )}

        </nav>

    );

}

const linkStyle = {

    color: "white",

    textDecoration:
        "none",

    fontWeight:
        "bold"

};

export default Navbar;