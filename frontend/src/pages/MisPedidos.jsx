import {
    useEffect,
    useState
} from "react";
import API_URL
from "../config/api";
import axios from "axios";

function MisPedidos() {

    const [pedidos, setPedidos] =
        useState([]);

    const cargarPedidos =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await axios.get(
                        `${API_URL}/api/pedidos/mis-pedidos`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setPedidos(
                    response.data
                );

            } catch (error) {

                console.error(
                    error
                );

            }

        };

    useEffect(() => {

        cargarPedidos();

        const intervalo =
            setInterval(
                cargarPedidos,
                5000
            );

        return () =>
            clearInterval(
                intervalo
            );

    }, []);

    return (

        <div
            style={{
                padding: "20px"
            }}
        >

            <h1>
                📦 Mis Pedidos
            </h1>

            {pedidos.length === 0 && (

                <p>
                    No tienes pedidos.
                </p>

            )}

            {pedidos.map(
                pedido => (

                    <div
                        key={pedido.id}
                        style={{
                            background:
                                "#fff",

                            padding:
                                "20px",

                            borderRadius:
                                "12px",

                            marginBottom:
                                "15px",

                            boxShadow:
                                "0 2px 8px rgba(0,0,0,.1)"
                        }}
                    >

                        <h3>
                            {
                                pedido.numero_orden
                            }
                        </h3>

                        <p>
                            Estado:
                            {" "}
                            {
                                pedido.estado
                            }
                        </p>

                        <p>
                            Total:
                            {" "}
                            $
                            {
                                Number(
                                    pedido.total
                                ).toFixed(2)
                            }
                        </p>

                        <h4>
                            Productos
                        </h4>

                        <ul>

                            {pedido.productos?.map(
                                (
                                    producto,
                                    index
                                ) => (

                                    <li
                                        key={
                                            index
                                        }
                                    >

                                        {
                                            producto.cantidad
                                        }
                                        x
                                        {" "}
                                        {
                                            producto.nombre
                                        }

                                    </li>

                                )
                            )}

                        </ul>

                    </div>

                )
            )}

        </div>

    );

}

export default MisPedidos;