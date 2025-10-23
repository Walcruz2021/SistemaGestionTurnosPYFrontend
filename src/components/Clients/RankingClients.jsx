
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { rankingVentasByClient } from "../../reducer/actions/actionsVentas"
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const RankingClients = () => {

    const dispatch = useDispatch()
    const companySelectedMenu = useSelector((state) => state.companySelected);
    const rankingVtas = useSelector(state => state.rankingVtasByClient)

    useEffect(() => {
        dispatch(rankingVentasByClient(companySelectedMenu._id))
    }, [])

    let arrayClients = []
    let arrayCantServ = []
    let arrayTotalServices = []
    if (rankingVtas) {
        arrayClients = rankingVtas.map(cli => cli.nameClient)
        arrayCantServ = rankingVtas.map(cli => cli.totalCantServicios)
        arrayTotalServices = rankingVtas.map(cli => cli.totalValorServ)
    }

    const dataServ = {
        labels: arrayClients,
        datasets: [
            {
                label: "Services",
                data: arrayCantServ,
                backgroundColor: ["rgba(255, 0, 0, 0.6)", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const isMobile = window.innerWidth < 600;

    const options = {
        responsive: true,
        aspectRatio: isMobile ? 0.8 : 2,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales Data",
            },
        },
    };

    const dataValues = {
        labels: arrayClients,
        datasets: [
            {
                label: "ValuesServices",
                data: arrayTotalServices,
                backgroundColor: ["rgba(255, 0, 0, 0.6)", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const isMobile2 = window.innerWidth < 600;

    const options2 = {
        responsive: true,
        aspectRatio: isMobile2 ? 0.8 : 2,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales Data",
            },
        },
    };

    return (

        <div className="container-lg table-responsive">
            <div className="titGral">
                <h1>Ranking de Clientes</h1>
            </div>

            <div className="titGral">
                <h2>Cantidad de Servicios</h2>
            </div>
            <Pie data={dataServ} options={options} />

            <div className="titGral">
                <h2>Monto de Servicios</h2>
            </div>
            <Bar data={dataValues} options={options2} />

            <div className="titGral">
                <h2>Prediccion de Servicios</h2>
            </div>

            <Line data={dataValues} options={options2} />

        </div>
    )


}
export default RankingClients