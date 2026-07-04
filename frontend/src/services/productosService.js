import axios from "axios";
import API_URL
from "../config/api";
const API =
    `${API_URL}/api/productos`;

export const obtenerProductos = async () => {

    const response =
        await axios.get(API);

    return response.data;
};