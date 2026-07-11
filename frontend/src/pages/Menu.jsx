import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productosService";
import { useCarrito } from "../context/CarritoContext";

function Menu() {
    const [productos, setProductos] = useState([]);

    const { agregarProducto } = useCarrito();

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#F5F5F5",
                minHeight: "100vh",
                paddingBottom: "40px"
            }}
        >
            {/* Banner */}
            <div
                style={{
                    background:
                        "linear-gradient(90deg,#E86D4F,#F08A6B)",
                    padding: "30px",
                    textAlign: "center",
                    color: "white",
                    boxShadow:
                        "0 4px 10px rgba(0,0,0,.15)"
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: "42px"
                    }}
                >
                    🍽 SmartCafetería UTC
                </h1>

                <p
                    style={{
                        marginTop: "10px",
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                >
                    ¡No se trata de comer menos, sino de comer mejor!
                </p>
            </div>

            {/* Categorías */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    marginTop: "25px",
                    flexWrap: "wrap"
                }}
            >
                <div
                    style={{
                        background: "#2F2F35",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "25px",
                        fontWeight: "bold"
                    }}
                >
                    🍔 Alimentos
                </div>

                <div
                    style={{
                        background: "#E86D4F",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "25px",
                        fontWeight: "bold"
                    }}
                >
                    🥤 Bebidas
                </div>

                <div
                    style={{
                        background: "#2F2F35",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "25px",
                        fontWeight: "bold"
                    }}
                >
                    🍪 Botanas
                </div>
            </div>

            {/* Productos */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "25px",
                    marginTop: "40px",
                    padding: "20px"
                }}
            >
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        style={{
                            width: "280px",
                            background: "#FFFFFF",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow:
                                "0 5px 15px rgba(0,0,0,.15)"
                        }}
                    >
                        https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800

                        <div
                            style={{
                                padding: "20px"
                            }}
                        >
                            <h3
                                style={{
                                    color: "#2F2F35",
                                    marginTop: 0
                                }}
                            >
                                {producto.nombre}
                            </h3>

                            <p
                                style={{
                                    color: "#666"
                                }}
                            >
                                {producto.descripcion}
                            </p>

                            <h2
                                style={{
                                    color: "#E86D4F"
                                }}
                            >
                                ${producto.precio}
                            </h2>

                            <button
                                onClick={() =>
                                    agregarProducto(producto)
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    border: "none",
                                    borderRadius: "10px",
                                    background: "#E86D4F",
                                    color: "white",
                                    fontWeight: "bold",
                                    cursor: "pointer"
                                }}
                            >
                                ➕ Agregar al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;