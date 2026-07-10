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
                    "linear-gradient(90deg,#2F2F35,#1F1F24)",

                padding:
                    "15px 25px",

                display:
                    "flex",

                gap:
                    "15px",

                alignItems:
                    "center",

                flexWrap:
                    "wrap",

                boxShadow:
                    "0 4px 10px rgba(0,0,0,.25)"
            }}
        >

            <h2
                style={{
                    color: "#E86D4F",
                    margin: 0,
                    marginRight: "20px"
                }}
            >
                🍽 UTC SmartCafetería
            </h2>

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
                        🛒 Carrito ({cantidad})
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
                            "10px 18px",

                        borderRadius:
                            "10px",

                        cursor:
                            "pointer",

                        background:
                            "#E86D4F",

                        color:
                            "white",

                        fontWeight:
                            "bold",

                        fontSize:
                            "14px",

                        boxShadow:
                            "0 3px 8px rgba(0,0,0,.2)"
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
        "bold",

    padding:
        "10px 14px",

    borderRadius:
        "10px",

    background:
        "rgba(255,255,255,.08)"

};

export default Navbar;