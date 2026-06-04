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
import companySupplyReducer from "./hooksReducer/companySupply/companySupplyReducer"
import cartReducer from "../store/cartSlice";
import supplyVariantReducer from "./hooksReducer/supply/supplyVariantReducer";
import companySupplyVariantReducer from "./hooksReducer/companySupplyVariant/companySupplyVariantReducer";
import categoryReducer from "./hooksReducer/categoryReducer/categoryReducer";

const rootReducer = combineReducers({
  bills: billsReducer,
  client: clientReducer,
  company: companyReducer,
  companySupply: companySupplyReducer,
  gralRed: gralReducer,
  pets: petsReducer,
  sales: salesReducer,
  user: userReducer,
  turns: turnsReducer,
  supplier: supplierReducer,
  category: categoryReducer,
  supply: supplyReducer,
  stockBatch: stockBatchReducer,
  salesSupply: informSalesSupply,
  cart: cartReducer,
  supplyVariant: supplyVariantReducer,
  companySupplyVariant: companySupplyVariantReducer
});

export default rootReducer;
