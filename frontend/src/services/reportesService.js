import axios from "axios";
import API_URL from "../config/api";

const REPORTES_URL =
    `${API_URL}/api/reportes`;

export const obtenerResumen =
    async () => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await axios.get(
                `${REPORTES_URL}/resumen`,
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
                `${REPORTES_URL}/ventas-dia`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        return response.data;

    };