import { Bar } from "react-chartjs-2";

import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function GraficaVentas({ ventas }) {

    const data = {

        labels: ventas.map(
            item => item.fecha
        ),

        datasets: [
            {
                label: "Ventas ($)",

                data: ventas.map(
                    item => item.ventas
                ),

                backgroundColor:
                    "#4CAF50",

                borderRadius: 10
            }
        ]
    };

    const options = {

        responsive: true,

        plugins: {

            legend: {
                position: "top"
            },

            title: {
                display: true,
                text: "Ventas por Día"
            }

        }

    };

    return (

        <div
            style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "30px",
                boxShadow:
                    "0 3px 10px rgba(0,0,0,.15)"
            }}
        >

            <Bar
                data={data}
                options={options}
            />

        </div>

    );

}

export default GraficaVentas;
