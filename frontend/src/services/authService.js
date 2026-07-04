import axios from "axios";

const API_URL =
    "http://192.168.100.7:3000/api/auth";

export const login = async (
    correo,
    password
) => {

    const response =
        await axios.post(
            `${API_URL}/login`,
            {
                correo,
                password
            }
        );

    return response.data;

};