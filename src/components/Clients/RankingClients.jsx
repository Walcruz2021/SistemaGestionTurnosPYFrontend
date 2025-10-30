
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { rankingVentasByClient, predictionsSalesxAnio, predictionsSalesByClientInCant, rankingVentasByClientDetails, lastValues } from "../../reducer/actions/actionsVentas"
import Select from "react-select";
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
import { set } from "react-hook-form";
import filterDatefeatures from "../../functions/filterDatefeatures";
import TablePredictionsClients from "./TablePredictiosClients";

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
    const companySelectedMenu = useSelector((state) => state.company.companySelected);
    const rankingVtas = useSelector(state => state.sales.rankingVtasByClient)
    
    //ultimas 5 ventas
    const rankingVtasDetails = useSelector(state => state.sales.rankingVtasByClientDetails)
    const [initial, setInitial] = useState(true);
    const predictionClientRanking = useSelector(state => state.sales.dataPredictioninCant)
    const [selectedClient, setSelectedClient] = useState(null);


    let date = new Date();
    const mesNow = date.getMonth() + 1;
    const listMonth = filterDatefeatures(mesNow)



    useEffect(() => {
        dispatch(rankingVentasByClient(companySelectedMenu._id))
    }, [])

    useEffect(() => {
        dispatch(rankingVentasByClientDetails(companySelectedMenu._id))
    }, [])


    let arrayClients = []
    let arrayCantServ = []
    let arrayTotalServices = []
    if (rankingVtas) {
        arrayClients = rankingVtas.map(cli => cli.nameClient)
        arrayCantServ = rankingVtas.map(cli => cli.totalCantServicios)
        arrayTotalServices = rankingVtas.map(cli => cli.totalValorServ)
    }

    useEffect(() => {
        if (rankingVtasDetails && initial) {
            dispatch(predictionsSalesByClientInCant(rankingVtasDetails[0].lastFiveSales))
            // setLastaValues(rankingVtasDetails[0].lastFiveSales && rankingVtasDetails[0].lastFiveSales.pop())
            setInitial(false);
        }
    }, [])

    useEffect(() => {
        if (selectedClient && rankingVtasDetails && rankingVtasDetails.length > 0 && !initial) {
            const opt = { value: selectedClient._id, label: selectedClient.cliente_name, lastFiveSales: selectedClient.lastFiveSales };
            setSelectedClient(opt);
            dispatch(predictionsSalesByClientInCant(selectedClient.lastFiveSales));
        }
    }, [rankingVtasDetails, dispatch])


    const dataServ = {
        labels: arrayClients,
        datasets: [
            {
                label: "Services",
                data: arrayCantServ,
                backgroundColor: ["rgba(255, 0, 0, 0.6)", "#36A2EB", "#FFCE56", "#cacfd2", "#2fc053ff"],
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
                backgroundColor: ["rgba(255, 0, 0, 0.6)", "#36A2EB", "#FFCE56", "#cacfd2", "#2fc053ff"],
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

    const dataPrediction = {
        labels: listMonth ? listMonth.map(m => m.value) : [],
        datasets: [
            {
                label: "PredictionServices",
                data: predictionClientRanking.success === true ? predictionClientRanking.predictions : [],
                backgroundColor: ["#2fc053ff"],
            },
        ],
    };

    const isMobile3 = window.innerWidth < 600;

    const options3 = {
        responsive: true,
        aspectRatio: isMobile3 ? 0.8 : 2,
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

    const handleChangeCli = (e) => {
console.log(e,"cliente elegido")
        setSelectedClient(e);
        //const clientLastFiveSales = e.lastFiveSales;
        dispatch(predictionsSalesByClientInCant(e.lastFiveSales));
        dispatch(lastValues(e.lastFiveSales))
    }

    //no esta mostrando correctamente el ultimo valor de venta

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

            <div className="container-lg mb-3 ml-3" style={{ maxWidth: 420, width: "100%" }}>

                <Select
                    inputId="cliente-select"
                    inputProps={{ "data-testid": "cliente-select" }}
                    className="instrument-serif-regular"
                    placeholder="Seleccione Cliente"

                    value={selectedClient}
                    onChange={handleChangeCli}
                    options={rankingVtasDetails && rankingVtasDetails.map(cli => ({ value: cli._id, label: cli.cliente_name, lastFiveSales: cli.lastFiveSales }))}
                />

                {predictionClientRanking.success === true && listMonth && <TablePredictionsClients data={predictionClientRanking.predictions} listMonth={listMonth} />}

            </div>

            <Line data={dataPrediction} options={options3} />

        </div>
    )


}
export default RankingClients