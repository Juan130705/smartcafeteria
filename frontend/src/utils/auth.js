export const obtenerToken = () => {
    return localStorage.getItem(
        "token"
    );
};

export const obtenerUsuario = () => {

    const usuario =
        localStorage.getItem(
            "usuario"
        );

    if (!usuario) {
        return null;
    }

    try {
        return JSON.parse(usuario);
    } catch {
        return null;
    }

};

export const logout = () => {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "usuario"
    );

};