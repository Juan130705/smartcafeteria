require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/database");

// Rutas

const productoRoutes =
    require("./routes/producto.routes");

const authRoutes =
    require("./routes/auth.routes");

const pedidoRoutes =
    require("./routes/pedido.routes");

const reporteRoutes =
    require("./routes/reporte.routes");

const notificacionRoutes =
    require("./routes/notificacion.routes");

const app = express();

// Middlewares

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// Ruta principal

app.get("/", (req, res) => {

    res.json({
        mensaje:
            "✅ API SmartCafeteria funcionando correctamente"
    });

});

// API

app.use(
    "/api/productos",
    productoRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/pedidos",
    pedidoRoutes
);

app.use(
    "/api/reportes",
    reporteRoutes
);

app.use(
    "/api/notificaciones",
    notificacionRoutes
);

// Probar conexión MySQL

async function probarConexion() {

    try {

        const conexion =
            await db.getConnection();

        console.log(
            "✅ Conectado a MySQL"
        );

        conexion.release();

    } catch (error) {

        console.error(
            "❌ Error MySQL:",
            error.message
        );

    }

}

probarConexion();

// Ruta no encontrada

app.use((req, res) => {

    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });

});

// Iniciar servidor

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `🚀 Servidor ejecutándose en http://localhost:${PORT}`
    );

});