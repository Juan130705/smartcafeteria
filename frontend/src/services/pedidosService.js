import axios from "axios";
import API_URL from "../config/api";

const PEDIDOS_URL =
    `${API_URL}/api/pedidos`;

const obtenerHeaders = () => {

    const token =
        localStorage.getItem(
            "token"
        );

    return {
        headers: {
            Authorization:
                `Bearer ${token}`
        }
    };

};

export const obtenerPedidos =
    async () => {

        const response =
            await axios.get(
                PEDIDOS_URL,
                obtenerHeaders()
            );

        return response.data;

    };

export const obtenerPedidoPorId =
    async (id) => {

        const response =
            await axios.get(
                `${PEDIDOS_URL}/${id}`,
                obtenerHeaders()
            );

        return response.data;

    };

export const crearPedido =
    async (pedido) => {

        const response =
            await axios.post(
                PEDIDOS_URL,
                pedido,
                obtenerHeaders()
            );

        return response.data;

    };

export const actualizarEstado =
    async (
        id,
        estado
    ) => {

        const response =
            await axios.put(
                `${PEDIDOS_URL}/${id}/estado`,
                {
                    estado
                },
                obtenerHeaders()
            );

        return response.data;

    };