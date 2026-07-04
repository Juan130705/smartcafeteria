import {
    useCarrito
} from "../context/CarritoContext";

import {
    crearPedido
} from "../services/pedidosService";

import {
    useNavigate
} from "react-router-dom";

function Carrito() {

    const navigate =
        useNavigate();

    const {
        carrito,
        eliminarProducto,
        total,
        vaciarCarrito
    } = useCarrito();

    const confirmarPedido =
        async () => {

            try {

                if (
                    carrito.length === 0
                ) {

                    alert(
                        "El carrito está vacío"
                    );

                    return;

                }

                const pedido = {

                    usuario_id: 1,

                    productos:
                        carrito.map(
                            item => ({
                                producto_id:
                                    item.id,
                                cantidad:
                                    item.cantidad
                            })
                        )

                };

                const respuesta =
                    await crearPedido(
                        pedido
                    );

                alert(
                    `Pedido creado correctamente\n\nOrden: ${respuesta.numero_orden}`
                );

                vaciarCarrito();

                navigate(
                    "/pedidos"
                );

            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Error al crear pedido"
                );

            }

        };

    return (

        <div
            style={{
                padding: "20px"
            }}
        >

            <h1>
                🛒 Carrito
            </h1>

            {
                carrito.length === 0 && (

                    <p>
                        No hay productos en el carrito.
                    </p>

                )
            }

            {
                carrito.map(
                    producto => (

                        <div
                            key={producto.id}
                            style={{
                                background: "#fff",
                                marginBottom: "10px",
                                padding: "15px",
                                borderRadius: "10px",
                                boxShadow:
                                    "0 2px 6px rgba(0,0,0,.15)"
                            }}
                        >

                            <h3>
                                {producto.nombre}
                            </h3>

                            <p>
                                Cantidad:
                                {" "}
                                {producto.cantidad}
                            </p>

                            <p>
                                Precio:
                                $
                                {producto.precio}
                            </p>

                            <button
                                onClick={() =>
                                    eliminarProducto(
                                        producto.id
                                    )
                                }
                            >
                                Eliminar
                            </button>

                        </div>

                    )
                )
            }

            <h2>
                Total: ${total}
            </h2>

            <button
                onClick={
                    confirmarPedido
                }
                style={{
                    padding: "10px",
                    cursor: "pointer"
                }}
            >
                Confirmar Pedido
            </button>

        </div>

    );

}

export default Carrito;