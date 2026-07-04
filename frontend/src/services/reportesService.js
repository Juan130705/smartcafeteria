import axios from "axios";

const API_URL =
    "http://192.168.100.7:3000/api/reportes";

export const obtenerResumen =
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await axios.get(
                `${API_URL}/resumen`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };

export const obtenerVentasDia =
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await axios.get(
                `${API_URL}/ventas-dia`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };