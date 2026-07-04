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
                padding: "20px"
            }}
        >

            <h1>
                🍔 Menú SmartCafetería
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap"
                }}
            >

                {productos.map((producto) => (

                    <div
                        key={producto.id}
                        style={{
                            background: "#fff",
                            width: "250px",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow:
                                "0 2px 8px rgba(0,0,0,.15)"
                        }}
                    >

                        <h3>
                            {producto.nombre}
                        </h3>

                        <p>
                            {producto.descripcion}
                        </p>

                        <p>
                            ${producto.precio}
                        </p>

                        <button
                            onClick={() => {

                                console.log(
                                    "Agregando producto:",
                                    producto
                                );

                                agregarProducto(producto);

                            }}
                        >
                            Agregar
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Menu;