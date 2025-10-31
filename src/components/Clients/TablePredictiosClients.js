import React from "react";
import "./TablePredictionsClients.css";
import convertNum from "../../functions/convertNum";
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { use } from "react";

export default function TablePredictionsClients({ data = sampleData, listMonth, lastValues }) {

    const lastValuesSales = useSelector(state => state.sales.lastValues)


    const [stateLastValues, setStateLastValues] = useState([])

    useEffect(() => {
        setStateLastValues(lastValuesSales)
    }, [lastValuesSales])

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
                        <td>{stateLastValues&&stateLastValues.length>0&&convertNum(stateLastValues[0])}</td>

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