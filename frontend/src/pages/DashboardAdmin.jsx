import {
    useEffect,
    useState
} from "react";

import {
    obtenerResumen,
    obtenerVentasDia
} from "../services/reportesService";

import GraficaVentas
from "../components/GraficaVentas";

function DashboardAdmin() {

    const [
        resumen,
        setResumen
    ] =
    useState(null);

    const [
        ventasDia,
        setVentasDia
    ] =
    useState([]);

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos =
        async () => {

            try {

                const resumenData =
                    await obtenerResumen();

                const ventasData =
                    await obtenerVentasDia();

                setResumen(
                    resumenData
                );

                setVentasDia(
                    ventasData
                );

            } catch (error) {

                console.error(error);

            }

        };

    if (!resumen) {

        return (
            <h2>
                Cargando...
            </h2>
        );

    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f4f6f8",
                padding: "30px"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                📊 Dashboard Administrador
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}
            >

                <div style={card}>
                    <h3>
                        💰 Ventas Hoy
                    </h3>

                    <h2>
                        ${resumen.ventasHoy}
                    </h2>
                </div>

                <div style={card}>
                    <h3>
                        📦 Pedidos Hoy
                    </h3>

                    <h2>
                        {resumen.pedidosHoy}
                    </h2>
                </div>

                <div style={card}>
                    <h3>
                        🍔 Productos Vendidos
                    </h3>

                    <h2>
                        {resumen.productosVendidos}
                    </h2>
                </div>

                <div style={card}>
                    <h3>
                        ⭐ Producto Top
                    </h3>

                    <h2>
                        {resumen.productoTop}
                    </h2>
                </div>

            </div>

            <GraficaVentas
                ventas={ventasDia}
            />

        </div>

    );

}

const card = {

    background: "#fff",

    width: "250px",

    padding: "20px",

    borderRadius: "15px",

    textAlign: "center",

    boxShadow:
        "0 3px 10px rgba(0,0,0,.15)"
};

export default DashboardAdmin;