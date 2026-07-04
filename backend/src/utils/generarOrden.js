const generarNumeroOrden = () => {

    const fecha = new Date();

    const anio = fecha.getFullYear();

    const mes = String(
        fecha.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        fecha.getDate()
    ).padStart(2, "0");

    const consecutivo = Date.now()
        .toString()
        .slice(-4);

    return `SC-${anio}${mes}${dia}${consecutivo}`;
};

module.exports = generarNumeroOrden;