import { Reac, useState } from "react";
import FormGastosVar from "../components/Formulario/Gastos/FormGastosVar";
import FormGastosInd from "../components/Formulario/Gastos/FormGastosInd";
import FormGastosDir from "../components/Formulario/Gastos/FormGastosDir";
import Button from "react-bootstrap/Button";
import FormGastosFij from "../components/Formulario/Gastos/FormGastosFij";
import gasto from "../icons/gastos.png";
import { Link } from "react-router-dom";

const Gastos = () => {
  const [stateActiveGDir, stateSetActiveGDir] = useState(true);
  const [stateActiveGInd, stateSetActiveGInd] = useState(false);
  const [stateActiveGVar, stateSetActiveGVar] = useState(false);
  const [stateActiveGFij, stateSetActiveGFij] = useState(false);

  const activeGVar = () => {
    stateSetActiveGVar(true);
    stateSetActiveGFij(false);
    stateSetActiveGDir(false);
    stateSetActiveGInd(false);
  };

  const activeGFij = () => {
    stateSetActiveGVar(false);
    stateSetActiveGFij(true);
    stateSetActiveGDir(false);
    stateSetActiveGInd(false);
  };

  const activeGDir = () => {
    stateSetActiveGVar(false);
    stateSetActiveGFij(false);
    stateSetActiveGDir(true);
    stateSetActiveGInd(false);
  };

  const activeGInd = () => {
    stateSetActiveGVar(false);
    stateSetActiveGFij(false);
    stateSetActiveGDir(false);
    stateSetActiveGInd(true);
  };

  return (
    <>
      <div className="container py-1">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4 d-flex justify-content-center mb-1">
            <div className="text-center">
              <div className="card-body">
                <Button variant="outline-secondary" onClick={activeGVar}>
                  Gastos Variables
                </Button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex justify-content-center mb-1">
            <div className="text-center">
              <div className="card-body">
                <Button variant="outline-secondary" onClick={activeGFij}>
                  Gastos Fijos
                </Button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex justify-content-center mb-1">
            <div className="text-center">
              <div className="card-body">
                <Button variant="outline-secondary" onClick={activeGDir}>
                  Gastos Directos
                </Button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex justify-content-center mb-1">
            <div className="text-center">
              <div className="card-body">
                <Button variant="outline-secondary m-1" onClick={activeGInd}>
                  Gastos Indirectos
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="card-body">
              <Link to="/InformeGastos">
                <button className="btn btn-link">
                  <img src={gasto} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {stateActiveGDir ? (
        <FormGastosDir />
      ) : stateActiveGInd ? (
        <FormGastosInd />
      ) : stateActiveGVar ? (
        <FormGastosVar />
      ) : (
        <FormGastosFij />
      )}
      {/* <FormGastosVar />
      <FormGastosExt />
      <FormGastosFij />
      <FormGastosDir />
      <FormGastosInd /> */}
    </>
  );
};

export default Gastos;
