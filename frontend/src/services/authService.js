import axios from "axios";

import API_URL
from "../config/api";

const AUTH_URL =
    `${API_URL}/api/auth`;
export const login = async (
    correo,
    password
) => {

    const response =
        await axios.post(
            `${AUTH_URL}/login`,
            {
                correo,
                password
            }
        );

    return response.data;

};