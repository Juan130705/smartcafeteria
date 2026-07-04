import {
    useEffect,
    useState
} from "react";

import axios from "axios";

function Notificaciones() {

    const [
        notificaciones,
        setNotificaciones
    ] = useState([]);

    useEffect(() => {

        const cargarNotificaciones =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const response =
                        await axios.get(
                            "http://192.168.100.7:3000/api/notificaciones",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );

                    console.log(
                        "NOTIFICACIONES:",
                        response.data
                    );

                    setNotificaciones(
                        response.data
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                }

            };

        cargarNotificaciones();

    }, []);

    return (

        <div
            style={{
                padding: "20px"
            }}
        >

            <h1>
                🔔 Notificaciones
            </h1>

            {notificaciones.length === 0 && (

                <p>
                    No tienes notificaciones.
                </p>

            )}

            {notificaciones.map(
                (
                    notificacion
                ) => (

                    <div
                        key={
                            notificacion.id
                        }
                        style={{
                            border:
                                "1px solid #ddd",

                            borderRadius:
                                "8px",

                            padding:
                                "15px",

                            marginBottom:
                                "10px",

                            background:
                                "#f8f9fa"
                        }}
                    >

                        <strong>
                            {
                                notificacion.mensaje
                            }
                        </strong>

                        <br />

                        <small>
                            {
                                new Date(
                                    notificacion.fecha_envio
                                ).toLocaleString()
                            }
                        </small>

                    </div>

                )
            )}

        </div>

    );

}

export default Notificaciones;