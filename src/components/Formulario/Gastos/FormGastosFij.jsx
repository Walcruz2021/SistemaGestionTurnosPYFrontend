import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useWatch } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addGastos } from "../../../reducer/actions/actionsGastos";

/**
 * FormGastosDir use form control. The states are intern and use new functions as "Watch" that control current values with "allValues"
 * "isFormValid" verify all values are completed to enabled the button
 * @returns
 */
const FormGastosFij = () => {
  const MySwal = withReactContent(Swal);
  const companySelectdMenu = useSelector((state) => state.companySelected);
  const dispatch = useDispatch();
  const [visibleCheckE, setVisibleCheckE] = useState(false);
  const [visibleCheckT, setVisibleCheckT] = useState(false);
  const [visibleCheckB, setVisibleCheckB] = useState(false);

  const { handleSubmit, control, reset, watch } = useForm();
  const allValues = watch();

  const handleCheckChange = (type) => {
    if (type === "Efectivo") {
      setVisibleCheckE(!visibleCheckE);
    } else if (type === "Transferencia") {
      setVisibleCheckB(!visibleCheckB);
    } else if (type === "Tarjeta") {
      setVisibleCheckT(!visibleCheckT);
    }
  };

  const arrayGastosFij = [
    { value: "ALQUILER", label: "Alquiler" },
    { value: "DEPRECIACION MAQUINARIAS", label: "Depreciación Maquinarias" },
    {
      value: "SEGUROS",
      label: "Seguros",
    },
    { value: "SERVICIOS PUBLICOS", label: "Servicios Publicos" },
  ];

  const onSubmit = (data) => {
    const fecha = new Date(data.date);
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;

    const newStateInput = {
      ...data,
      efectivo: data.efectivo || 0,
      transferencia: data.transferencia || 0,
      tarjeta: data.tarjeta || 0,
    };

    const value =
      Number(newStateInput.efectivo) +
      Number(newStateInput.tarjeta) +
      Number(newStateInput.transferencia);

    dispatch(
      addGastos({
        año: año,
        date: newStateInput.date,
        description: newStateInput.description,
        efectivo: newStateInput.efectivo,
        tarjeta: newStateInput.tarjeta,
        transferencia: newStateInput.transferencia,
        categoryGasto: "GASTO FIJO",
        value: value,
        mes: mes,
        typeGasto: newStateInput.category.value,
        idCompany: companySelectdMenu._id,
      })
    );

    MySwal.fire({
      title: "¡Gasto Fijo Agendado!",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "rgb(21, 151, 67)",
    }).then((result) => {
      if (result.isConfirmed) {
        reset({
          date: "",
          description: "",
          efectivo: 0,
          transferencia: 0,
          tarjeta: 0,
          category: null,
        });
        setVisibleCheckE(false);
        setVisibleCheckT(false);
        setVisibleCheckB(false);
      }
    });
  };

  /**
   * if the condition are met. this function will enabled button
   */
  const isFormValid = () => {
    return (
      allValues.date &&
      allValues.description &&
      (allValues.efectivo > 0 ||
        allValues.transferencia > 0 ||
        allValues.tarjeta > 0) &&
      allValues.category
    );
  };

  return (
    <>
      <div className="titGral">
        <h2>GASTOS FIJOS</h2>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <Form className="px-3" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Controller
                  name="category"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="* Seleccione Categoria"
                      options={arrayGastosFij}
                    />
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>* Fecha</Form.Label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      type="date"
                      placeholder="Ingrese Fecha"
                      {...field}
                    />
                  )}
                />
              </Form.Group>

              <div>
                <Form.Check
                  type="checkbox"
                  id="check-efectivo"
                  label="Efectivo"
                  onChange={() => handleCheckChange("Efectivo")}
                  className="mt-2"
                  checked={visibleCheckE}
                />
                {visibleCheckE && (
                  <Controller
                    name="efectivo"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <Form.Control
                        type="number"
                        placeholder="Efectivo"
                        maxLength={30}
                        required
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        className="mt-2"
                        {...field}
                      />
                    )}
                  />
                )}

                <Form.Check
                  type="checkbox"
                  id="check-transferencia"
                  label="Transferencia"
                  onChange={() => handleCheckChange("Transferencia")}
                  className="mt-2"
                  checked={visibleCheckB}
                />
                {visibleCheckB && (
                  <Controller
                    name="transferencia"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <Form.Control
                        type="number"
                        placeholder="Transferencia"
                        maxLength={30}
                        required
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        className="mt-2"
                        {...field}
                      />
                    )}
                  />
                )}

                <Form.Check
                  type="checkbox"
                  id="check-tarjeta"
                  label="Tarjeta"
                  onChange={() => handleCheckChange("Tarjeta")}
                  className="mt-2"
                  checked={visibleCheckT}
                />
                {visibleCheckT && (
                  <Controller
                    name="tarjeta"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <Form.Control
                        type="number"
                        placeholder="Tarjeta"
                        maxLength={30}
                        required
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        className="mt-2 mb-2"
                        {...field}
                      />
                    )}
                  />
                )}
              </div>

              <Form.Group className="mb-3 pt-2">
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="* Ingrese Descripcion del Gasto"
                      maxLength="70"
                      {...field}
                    />
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-1">
                <Form.Text className="text-danger">
                  * Valores Obligatorios.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={!isFormValid()}>
                Ingresar Gasto Fijo
              </Button>
            </Form>
          </div>
        </div>
      </div>
      {/* <div className="container mt-3">
        <p className="text-secondary font-weight-bold small">
          Los gastos fijos son aquellos costos que una empresa incurre
          regularmente y que no fluctúan con el nivel de producción o ventas.
          Estos gastos se mantienen constantes en el corto plazo,
          independientemente de la cantidad de bienes o servicios que se
          produzcan o vendan. 
        </p>
      </div> */}
    </>
  );
};

export default FormGastosFij;
