import axios from "axios";
import host from "../../components/ruteBack/vbledeploy";
export const FUNCTION_COMPANY_SELECTED = "FUNCTION_COMPANY_SELECTED";
export const RESET_COMPANY_SELECTED = "RESET_COMPANY_SELECTED";
export const ADD_COMPANY = "ADD_COMPANY";
export const VERIFICATION_COMPANY_EXISTS = "VERIFICATION_COMPANY_EXISTS";
export const IS_CATEGORY_MEDICINE = "IS_CATEGORY_MEDICINE";
export const TYPE_PERSON_CATEGORY="TYPE_PERSON_CATEGORY";

export const resetCompanySelected = () => ({
  type: RESET_COMPANY_SELECTED,
});

export function functionCompanySelected(payload) {
  return {
    type: FUNCTION_COMPANY_SELECTED,
    payload,
  };
}

export function verificationCompaniesExist(email) {
  return async function (dispatch) {
    const arrayCompanies = await axios.get(
      `${host}/api/validationCompanyExist/${email}`
    );

    return dispatch({
      type: VERIFICATION_COMPANY_EXISTS,
      payload: arrayCompanies,
    });
  };
}

export function addCompany(payload) {
  return async function (dispatch) {
    try {
      const newCompany = await axios.post(
        //`http://localhost:3002/api/addPerro/${idClient}`,
        `${host}/api/addCompany`,
        payload
      );
      return newCompany;
    } catch (error) {
      console.log(error);
    }
  };
}

export function isMedicine(payload) {
  return {
    type: IS_CATEGORY_MEDICINE,
    payload,
  };
}

export function typePerson(payload) {
  return {
    type: TYPE_PERSON_CATEGORY,
    payload,
  };
}