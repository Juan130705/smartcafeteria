import { useEffect, useState } from "react";

import PedidoCard from "../components/PedidoCard";

import {
    obtenerPedidos,
    actualizarEstado
} from "../services/pedidosService";

function DashboardCocina() {

    const [pedidos, setPedidos] =
        useState([]);

    const cargarPedidos = async () => {

        try {

            const data =
                await obtenerPedidos();

            setPedidos(data);

        } catch (error) {

            console.error(
                "Error al obtener pedidos:",
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

    const cambiarEstado = async (
        id,
        estado
    ) => {

        try {

            await actualizarEstado(
                id,
                estado
            );

            cargarPedidos();

        } catch (error) {

            console.error(
                "Error al actualizar pedido:",
                error
            );

        }

    };

    const pendientes =
        pedidos.filter(
            pedido =>
                pedido.estado ===
                "pendiente"
        );

    const preparacion =
        pedidos.filter(
            pedido =>
                pedido.estado ===
                "preparacion"
        );

    const listos =
        pedidos.filter(
            pedido =>
                pedido.estado ===
                "listo"
        );

    const entregados =
        pedidos.filter(
            pedido =>
                pedido.estado ===
                "entregado"
        );

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f4f6f8",
                padding: "20px"
            }}
        >
            <h1
    style={{
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "36px"
    }}
>
    🍔 SmartCafetería - Dashboard Cocina
        </h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems:
                        "flex-start"
                }}
            >
                <div
                    style={{
                        flex: 1,
                        background:
                            "#eceff1",
                        padding: "15px",
                        borderRadius:
                            "12px"
                    }}
                >
                    <h2>
                        🟡 Pendientes
                    </h2>

                    {pendientes.map(
                        pedido => (
                            <PedidoCard
                                key={pedido.id}
                                pedido={pedido}
                                onCambiarEstado={
                                    cambiarEstado
                                }
                            />
                        )
                    )}
                </div>

                <div
                    style={{
                        flex: 1,
                        background:
                            "#eceff1",
                        padding: "15px",
                        borderRadius:
                            "12px"
                    }}
                >
                    <h2>
                        🟠 Preparación
                    </h2>

                    {preparacion.map(
                        pedido => (
                            <PedidoCard
                                key={pedido.id}
                                pedido={pedido}
                                onCambiarEstado={
                                    cambiarEstado
                                }
                            />
                        )
                    )}
                </div>

                <div
                    style={{
                        flex: 1,
                        background:
                            "#eceff1",
                        padding: "15px",
                        borderRadius:
                            "12px"
                    }}
                >
                    <h2>
                        🟢 Listos
                    </h2>

                    {listos.map(
                        pedido => (
                            <PedidoCard
                                key={pedido.id}
                                pedido={pedido}
                                onCambiarEstado={
                                    cambiarEstado
                                }
                            />
                        )
                    )}
                </div>

                <div
                    style={{
                        flex: 1,
                        background:
                            "#eceff1",
                        padding: "15px",
                        borderRadius:
                            "12px"
                    }}
                >
                    <h2>
                        ✅ Entregados
                    </h2>

                    {entregados.map(
                        pedido => (
                            <PedidoCard
                                key={pedido.id}
                                pedido={pedido}
                                onCambiarEstado={
                                    cambiarEstado
                                }
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );

}

export default DashboardCocina;