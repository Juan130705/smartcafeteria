import axios from "axios";

const API =
    "http://192.168.100.7:3000/api/productos";

export const obtenerProductos = async () => {

    const response =
        await axios.get(API);

    return response.data;
};