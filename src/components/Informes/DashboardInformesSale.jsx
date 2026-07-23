import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { actionBestSelling } from "../../reducer/actions/salesSupply/actionSalesSupply"


const DashboardInformesSale = () => {
    const distpath = useDispatch()
    useEffect(() => {
        dispatch(actionBestSelling("6a5906c6c40b02984153c339"))
    }, [])
    return (
        <>
            <h1>DASHBOARD INFORMATIVO</h1>

            <h2>PRODUCTO MAS VENDIDO</h2>
            <h2>PRODUCTO MENOS VENDIDO</h2>
            <h2>MES CON MAS VENTAS</h2>
            <h2>MES CON MENOS VENTAS</h2>

        </>
    )
}
export default DashboardInformesSale