import axios from "axios";
import host from "../../../components/ruteBack/vbledeploy";
export const GET_COMPANY_SUPPLY_VARIANTS = "GET_COMPANY_SUPPLY_VARIANTS";



export function getCompanySupplyVariants(idCompanySupply) {
  return async function (dispatch) {
    const listCompanySupplyVariants = await axios.get(
      `${host}/api/getVariantsByCompanySupply/${idCompanySupply}`
    );

    return dispatch({
      type: GET_COMPANY_SUPPLY_VARIANTS,
      payload: listCompanySupplyVariants.data.listCompanyVariant
    });
  };
}

/**
 * Updates a companySupplyVariant.
 * @param {Object} variantData - Variant data to update.
 * @param {string} variantData.idVariant - Variant identifier.
 * @param {string} variantData.nameVariant - Variant name.
 * @param {number} variantData.priceSale - Sale price.
 * @param {string} variantData.idCompanySupply - Company supply identifier.
 * @returns new companySupplyVariant with data updated
 */

export function actionEditCompanySupplyVariant(variantData) {
  
  return async function (dispatch) {
    try {
      const editCompSupplyVariant = await axios.put(
        `${host}/api/editCompanyVariantByParameter/${variantData.idVariant}`,
        variantData
      );
      return editCompSupplyVariant
      console.log(editCompSupplyVariant, "editCompSupplyVariant");
    } catch (error) {
      console.log(error);
      
    }
  };
}