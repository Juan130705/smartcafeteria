import { useState } from "react";
import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    login
} from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [correo, setCorreo] =
        useState("");

    const [password, setPassword] =
        useState("");

    const iniciarSesion = async () => {

        try {

            const data =
                await login(
                    correo,
                    password
                );

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(
                    data.usuario
                )
            );

            if (
                data.usuario.rol ===
                "admin"
            ) {

                navigate("/admin");

            } else if (
                data.usuario.rol ===
                "empleado"
            ) {

                navigate("/cocina");

            } else {

                navigate("/");

            }

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.mensaje ||
                "Credenciales incorrectas"
            );

        }

    };

    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "400px",
                margin: "0 auto"
            }}
        >

            <h1>
                🔐 Login
            </h1>

            <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) =>
                    setCorreo(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={
                    iniciarSesion
                }
            >
                Entrar
            </button>

            <br />
            <br />

            <p>
                ¿No tienes cuenta?
            </p>

            <Link to="/register">
                Crear cuenta
            </Link>

        </div>

    );

}

export default Login;