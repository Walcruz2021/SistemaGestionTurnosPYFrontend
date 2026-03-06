import { combineReducers } from "redux";
import billsReducer from "./hooksReducer/billsReducer"
import clientReducer from "./hooksReducer/clientReducer"
import companyReducer from "./hooksReducer/companyReducer"
import gralReducer from "./hooksReducer/gralReducer"
import petsReducer from "./hooksReducer/petsReducer"
import salesReducer from "./hooksReducer/salesReducer"
import userReducer from "./hooksReducer/userReducer"
import turnsReducer from "./hooksReducer/turnsReducer"
import supplierReducer from "./hooksReducer/supplier/supplierReducer"
import supplyReducer from "./hooksReducer/supply/supplyReducer"
import stockBatchReducer from "./hooksReducer/stockBatchReducer"
import informSalesSupply from "./hooksReducer/supply/informSalesSupply"

const rootReducer = combineReducers({
  bills: billsReducer,
  client: clientReducer,
  company: companyReducer,
  gralRed: gralReducer,
  pets: petsReducer,
  sales: salesReducer,
  user: userReducer,
  turns: turnsReducer,
  supplier: supplierReducer,
  supply: supplyReducer,
  stockBatch: stockBatchReducer,
  salesSupply: informSalesSupply
});

export default rootReducer;
