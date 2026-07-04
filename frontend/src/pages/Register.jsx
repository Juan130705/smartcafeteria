import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

    const navigate = useNavigate();

    const [formulario, setFormulario] =
        useState({
            nombre: "",
            correo: "",
            password: ""
        });

    const cambiarValor = (e) => {

        setFormulario({
            ...formulario,
            [e.target.name]:
                e.target.value
        });

    };

    const registrar = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://192.168.100.7:3000/api/auth/register",
                formulario
            );

            alert(
                "Usuario registrado correctamente"
            );

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.mensaje ||
                "Error al registrar usuario"
            );

        }

    };

    return (

        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                textAlign: "center"
            }}
        >

            <h1>
                Registro Cliente
            </h1>

            <form
                onSubmit={registrar}
            >

                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formulario.nombre}
                    onChange={cambiarValor}
                    required
                />

                <br />
                <br />

                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={formulario.correo}
                    onChange={cambiarValor}
                    required
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formulario.password}
                    onChange={cambiarValor}
                    required
                />

                <br />
                <br />

                <button type="submit">
                    Registrarse
                </button>

            </form>

            <br />

            <Link to="/login">
                Ya tengo cuenta
            </Link>

        </div>

    );

}

export default Register;