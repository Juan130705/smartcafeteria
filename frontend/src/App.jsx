import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Carrito from "./pages/Carrito";
import MisPedidos from "./pages/MisPedidos";
import Perfil from "./pages/Perfil";
import Notificaciones from "./pages/Notificaciones";

import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardCocina from "./pages/DashboardCocina";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (
        <>
            <Navbar />

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            roles={["cliente"]}
                        >
                            <Menu />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/carrito"
                    element={
                        <ProtectedRoute
                            roles={["cliente"]}
                        >
                            <Carrito />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/pedidos"
                    element={
                        <ProtectedRoute
                            roles={["cliente"]}
                        >
                            <MisPedidos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notificaciones"
                    element={
                        <ProtectedRoute
                            roles={["cliente"]}
                        >
                            <Notificaciones />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <ProtectedRoute
                            roles={[
                                "cliente",
                                "empleado",
                                "admin"
                            ]}
                        >
                            <Perfil />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cocina"
                    element={
                        <ProtectedRoute
                            roles={[
                                "admin",
                                "empleado"
                            ]}
                        >
                            <DashboardCocina />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            roles={["admin"]}
                        >
                            <DashboardAdmin />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );

}

export default App;