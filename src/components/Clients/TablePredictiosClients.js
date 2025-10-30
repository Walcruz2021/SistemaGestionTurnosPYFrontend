import React from "react";
import "./TablePredictionsClients.css";
import convertNum from "../../functions/convertNum";
import { useDispatch, useSelector } from "react-redux"

export default function TablePredictionsClients({ data = sampleData, listMonth, lastValues }) {

    const lastValuesSales = useSelector(state => state.sales.lastValues)
  
    return (
        <div className="tmv-container">

            <table className="tmv-table" aria-label="Tabla Mes y Valor">
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>Ultima Venta</td>
                        <td>{convertNum(lastValuesSales[0])}</td>

                    </tr>
                    {data.map((prediction, index) => (

                        <tr key={index} className={index % 2 === 0 ? "tmv-row-even" : "tmv-row-odd"}>
                            <td>{listMonth[index].value}</td>
                            <td>{convertNum(prediction)}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
}