function PedidoCard({
    pedido,
    onCambiarEstado
}) {

    const colores = {

        pendiente: {
            background: "#fff8e1",
            borderLeft:
                "8px solid #ffc107"
        },

        preparacion: {
            background: "#fff3e0",
            borderLeft:
                "8px solid #ff7043"
        },

        listo: {
            background: "#e8f5e9",
            borderLeft:
                "8px solid #4caf50"
        },

        entregado: {
            background: "#eceff1",
            borderLeft:
                "8px solid #607d8b"
        }

    };

    return (
        <div
            style={{
                ...colores[
                    pedido.estado
                ],
                borderRadius:
                    "12px",
                padding: "20px",
                marginBottom:
                    "15px",
                boxShadow:
                    "0 2px 10px rgba(0,0,0,.1)"
            }}
        >
            <h3>
                🍔 COMANDA
            </h3>

            <h2>
                {
                    pedido.numero_orden
                }
            </h2>

            <hr />

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
                            key={index}
                        >
                            {
                                producto.cantidad
                            }
                            x{" "}
                            {
                                producto.nombre
                            }
                        </li>
                    )
                )}
            </ul>

            <p>
                💰 Total: $
                {Number(
                    pedido.total
                ).toFixed(2)}
            </p>

            <p>
                📦 Estado:{" "}
                {pedido.estado}
            </p>

            {pedido.estado !==
                "preparacion" && (
                <button
                    onClick={() =>
                        onCambiarEstado(
                            pedido.id,
                            "preparacion"
                        )
                    }
                >
                    Preparación
                </button>
            )}

            {" "}

            {pedido.estado !==
                "listo" && (
                <button
                    onClick={() =>
                        onCambiarEstado(
                            pedido.id,
                            "listo"
                        )
                    }
                >
                    Listo
                </button>
            )}

            {" "}

            {pedido.estado !==
                "entregado" && (
                <button
                    onClick={() =>
                        onCambiarEstado(
                            pedido.id,
                            "entregado"
                        )
                    }
                >
                    Entregado
                </button>
            )}
        </div>
    );

}

export default PedidoCard;