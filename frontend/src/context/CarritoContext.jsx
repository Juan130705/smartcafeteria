import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({
    children
}) => {

    const [carrito, setCarrito] =
        useState(() => {

            const carritoGuardado =
                localStorage.getItem(
                    "carrito"
                );

            return carritoGuardado
                ? JSON.parse(
                      carritoGuardado
                  )
                : [];

        });

    useEffect(() => {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }, [carrito]);

    const agregarProducto = (
        producto
    ) => {

        const existe =
            carrito.find(
                item =>
                    item.id ===
                    producto.id
            );

        if (existe) {

            const carritoActualizado =
                carrito.map(
                    item =>
                        item.id ===
                        producto.id
                            ? {
                                  ...item,
                                  cantidad:
                                      item.cantidad +
                                      1
                              }
                            : item
                );

            setCarrito(
                carritoActualizado
            );

        } else {

            setCarrito([
                ...carrito,
                {
                    ...producto,
                    cantidad: 1
                }
            ]);

        }

    };

    const eliminarProducto = (
        id
    ) => {

        setCarrito(
            carrito.filter(
                item =>
                    item.id !== id
            )
        );

    };

    const vaciarCarrito = () => {

        setCarrito([]);

        localStorage.removeItem(
            "carrito"
        );

    };

    const total =
        carrito.reduce(
            (
                acumulado,
                item
            ) =>
                acumulado +
                Number(
                    item.precio
                ) *
                    item.cantidad,
            0
        );

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                agregarProducto,
                eliminarProducto,
                vaciarCarrito,
                total
            }}
        >
            {children}
        </CarritoContext.Provider>
    );

};

export default CarritoContext;