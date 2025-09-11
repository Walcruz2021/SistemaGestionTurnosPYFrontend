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
const FormGastosDir = () => {
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

  const arrayGastosDir = [
    {
      value: "GASTOS MANO DE OBRA DIRECTA",
      label: "Gastos Mano de Obra Directa",
    },
    { value: "GASTOS MATERIA PRIMA", label: "Materia Prima" },
    { value: "GASTOS COMPONENTES", label: "Gastos Componentes" },
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
        categoryGasto: "GASTO DIRECTO",
        value: value,
        mes: mes,
        typeGasto: newStateInput.category.value,
        idCompany: companySelectdMenu._id,
      })
    );

    MySwal.fire({
      title: "¡Gasto Directo Agendado!",
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
        <h2>GASTOS DIRECTOS</h2>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {" "}
            {/* Responsive container */}
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
                      options={arrayGastosDir}
                      className="instrument-serif-regular"
                    />
                  )}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 instrument-serif-regular"
                controlId="formBasicEmail"
              >
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

              <div className="instrument-serif-regular">
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
                        required
                        maxLength={10}
                        min="0"
                        className="mt-2"
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e" || e.key === "+") {
                            e.preventDefault();
                          }
                          // Evita escribir si ya hay 10 caracteres
                          if (
                            e.target.value &&
                            e.target.value.length >= 10 &&
                            // Permite borrar
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            !isNaN(Number(e.key))
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          // Limita el valor a 10 caracteres
                          if (e.target.value.length <= 10) {
                            field.onChange(e);
                          }
                        }}
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
                        maxLength={10}
                        required
                        className="mt-2"
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e" || e.key === "+") {
                            e.preventDefault();
                          }
                          // Evita escribir si ya hay 10 caracteres
                          if (
                            e.target.value &&
                            e.target.value.length >= 10 &&
                            // Permite borrar
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            !isNaN(Number(e.key))
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          // Limita el valor a 10 caracteres
                          if (e.target.value.length <= 10) {
                            field.onChange(e);
                          }
                        }}
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
                        maxLength={10}
                        required
                        className="mt-2 mb-2"
                        min="0"
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e" || e.key === "+") {
                            e.preventDefault();
                          }
                          // Evita escribir si ya hay 10 caracteres
                          if (
                            e.target.value &&
                            e.target.value.length >= 10 &&
                            // Permite borrar
                            e.key !== "Backspace" &&
                            e.key !== "Delete" &&
                            !isNaN(Number(e.key))
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          // Limita el valor a 10 caracteres
                          if (e.target.value.length <= 10) {
                            field.onChange(e);
                          }
                        }}
                      />
                    )}
                  />
                )}
              </div>

              <Form.Group
                className="mb-3 pt-2 instrument-serif-regular"
                id="formDescription"
              >
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
                      {...field}
                      maxLength="80"
                    />
                  )}
                />
              </Form.Group>

              <Form.Group className="mb-1 instrument-serif-regular">
                <Form.Text className="text-danger">
                  * Valores Obligatorios.
                </Form.Text>
              </Form.Group>

              <div className="instrument-serif-regular">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid()}
                >
                  Ingresar Gasto Directo
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {/* <div className="container mt-3">
        <p className="text-secondary font-weight-bold small">
          Los gastos directos son costos que pueden atribuirse directamente
          a la producción de bienes o servicios específicos. Estos gastos son
          esenciales para calcular el costo de los bienes vendidos y pueden
          atribuirse directamente al proceso de producción.
        </p>
      </div> */}
    </>
  );
};

export default FormGastosDir;
