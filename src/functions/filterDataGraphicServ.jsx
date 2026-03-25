/**
 * @param {*} listServByYear Object Array - backend's ventasxAnio 
 * "totalByMonth": [
        {
            "_id": 1,
            "totalValorServ": 537000,
            "totalEfectivo": 67000,
            "totalTarjeta": 70000,
            "totalTransferencia": 400000,
            "totalCantServicios": 4
        },...]
 * @returns return dataServGraphics=[
        {mesString:"Enero",
        totalValorServ: 537000
        }
        ]
 */
export default function filterDataGraphicServ(dataBackend) {

    const objectListMeses = [

        {
            mesString: "Enero",
            mes: 1,
            totalValorServ: 0
        },
        {
            mesString: "Febrero",
            mes: 2,
            totalValorServ: 0
        },
        {
            mesString: "Marzo",
            mes: 3,
            totalValorServ: 0
        },
        {
            mesString: "Abril",
            mes: 4,
            totalValorServ: 0
        },
        {
            mesString: "Mayo",
            mes: 5,
            totalValorServ: 0
        },
        {
            mesString: "Junio",
            mes: 6,
            totalValorServ: 0
        },
        {
            mesString: "Julio",
            mes: 7,
            totalValorServ: 0
        },
        {
            mesString: "Agosto",
            mes: 8,
            totalValorServ: 0
        },
        {
            mesString: "Septiembre",
            mes: 9,
            totalValorServ: 0
        },
        {
            mesString: "Octubre",
            mes: 10,
            totalValorServ: 0
        },
        {
            mesString: "Noviembre",
            mes: 11,
            totalValorServ: 0
        },
        {
            mesString: "Diciembre",
            mes: 12,
            totalValorServ: 0
        },
    ]

    dataBackend && Array.isArray(dataBackend) && dataBackend.length > 0 ? dataBackend.map((data) => (

        objectListMeses[data._id - 1].totalValorServ = data.totalValorServ ? data.totalValorServ : 0

    )

    ) : null

    return objectListMeses
};  
