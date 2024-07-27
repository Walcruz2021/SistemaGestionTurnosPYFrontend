import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTurnos, functionCompanySelected } from "../reducer/actions/actions";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';


const ListCompanies = () => {
  const navigate = useNavigate();
  const companies = useSelector((state) => state.arrayCompanies.data);
  const dispatch = useDispatch();
  const [state, setState] = useState({});


  const selectCompany = (company) => {
    setState(company);
  };

  const dispatchTurns = () => {
    dispatch(functionCompanySelected(state));
    navigate('/dashboard');
  };

  const addCompany=()=>{
    window.location.href = "/addCompany"
  }

  return (
    <>
      <Form>
        {companies && companies.companies
          ? companies.companies.map((company) => (
              <div key={company._id}>
                {["checkbox"].map((type) => (
                  <div key={`${company._id}-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`${company._id}-${type}`}
                      label={company.nameCompany}
                      value={setState.company}
                      onClick={() => selectCompany(company)}
                    />
                  </div>
                ))}
              </div>
            ))
          : null}
      </Form>
      <button onClick={() => dispatchTurns()}>Seleccionar Empresa</button>
      <button onClick={()=>addCompany()}>Adherir Empresa</button>
    </>
  );
};

export default ListCompanies;
