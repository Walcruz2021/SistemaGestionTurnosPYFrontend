import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import Form from "react-bootstrap/Form";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addGastos } from "../../../reducer/actions/actionsGastos";
import { Plus } from "lucide-react";

const FormGastosFij = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const companySelectdMenu = useSelector(
    (state) => state.company.companySelected
  );

  const { register, handleSubmit, control, reset, watch } = useForm();

  const [visibleCheckE, setVisibleCheckE] = useState(false);
  const [visibleCheckT, setVisibleCheckT] = useState(false);
  const [visibleCheckB, setVisibleCheckB] = useState(false);
  const [stateValuesGastos, setStateValuesGastos] = useState({
    efectivo: "",
    transferencia: "",
    tarjeta: ""
  });
  const allValues = watch();

  const handleCheckChange = (type) => {
    if (type === "Efectivo") setVisibleCheckE(!visibleCheckE);
    if (type === "Transferencia") setVisibleCheckB(!visibleCheckB);
    if (type === "Tarjeta") setVisibleCheckT(!visibleCheckT);
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

    const newData = {
      ...data,
      efectivo: Number(data.efectivo) || 0,
      transferencia: Number(data.transferencia) || 0,
      tarjeta: Number(data.tarjeta) || 0,
    };

    const value =
      Number(stateValuesGastos.efectivo) + Number(stateValuesGastos.transferencia) + Number(stateValuesGastos.tarjeta);


    dispatch(
      addGastos({
        año,
        date: newData.date,
        description: newData.description,
        efectivo: stateValuesGastos.efectivo,
        tarjeta: stateValuesGastos.tarjeta,
        transferencia: stateValuesGastos.transferencia,
        categoryGasto: "GASTO FIJO",
        value,
        mes,
        typeGasto: newData.category.value,
        idCompany: companySelectdMenu._id,
      })
    );

    MySwal.fire({
      title: "¡Gasto Fijo Agendado!",
      icon: "success",
      confirmButtonColor: "rgb(21, 151, 67)",
    });

    reset({
      date: "",
      description: "",
      category: null,
    });

    setStateValuesGastos({
      efectivo: "",
      transferencia: "",
      tarjeta: ""
    })

    setVisibleCheckE(false);
    setVisibleCheckT(false);
    setVisibleCheckB(false);
  };

  const isFormValid = () => {
    return (
      allValues.date &&
      allValues.description &&
      allValues.description.trim() !== "" &&
      (Number(stateValuesGastos.efectivo) > 0 ||
        Number(stateValuesGastos.transferencia) > 0 ||
        Number(stateValuesGastos.tarjeta) > 0) &&
      allValues.category
    );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-5 px-3"
    >
      {/* CATEGORIA + FECHA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase text-gray-500">
            * Categoría
          </label>
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
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase text-gray-500">
            * Fecha
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm px-3 py-2.5"
          />
        </div>
      </div>

      {/* MEDIOS DE PAGO */}
      <div className="flex flex-col gap-4 max-w-md">
        <label className="text-[11px] font-semibold uppercase text-gray-500">
          * Medio de pago
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Efectivo",
              checked: visibleCheckE,
              state: "Efectivo",
              field: "efectivo",
            },
            {
              label: "Transferencia",
              checked: visibleCheckB,
              state: "Transferencia",
              field: "transferencia",
            },
            {
              label: "Tarjeta",
              checked: visibleCheckT,
              state: "Tarjeta",
              field: "tarjeta",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckChange(item.state)}
                  className="hidden"
                />

                <div
                  className={`w-5 h-5 border-1 flex items-center justify-center
                  ${item.checked
                      ? "bg-black border-black"
                      : "bg-white border-gray-500"
                    }`}
                >
                  {item.checked && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {item.label}
              </label>

              {item.checked && (
                <Form.Control
                  type="text"
                  placeholder={item.label}
                  name={item.field}
                  maxLength={10}
                  required
                  className="mt-2 instrument-serif-regular"
                  value={stateValuesGastos[item.field]}
                  onChange={(e) => {
                    // Solo permitir números y máximo 10 caracteres
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    setStateValuesGastos((prevState) => ({
                      ...prevState,
                      [item.field]: value,
                    }));
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DESCRIPCION */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase text-gray-500">
          * Descripción del gasto
        </label>

        <textarea
          {...register("description")}
          placeholder="Añadí un comentario..."
          maxLength={100}
          className="w-full bg-white border border-gray-200 text-gray-900 text-sm px-3 py-2.5 resize-none"
        />

        <p className="text-red-500 text-left text-xs">* Valores obligatorios</p>
      </div>

      <div>

        {/* BOTON */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={isFormValid() ? "flex items-center gap-2 bg-black text-white text-sm font-semibold tracking-[0.12em] uppercase px-7 py-3 hover:bg-gray-800 transition-colors duration-150" : "flex items-center gap-2 bg-gray-500 text-gray-300 text-sm font-semibold tracking-[0.12em] uppercase px-7 py-3 cursor-not-allowed"}
        >
          <Plus className="w-4 h-4" />
          Ingresar Gasto Fijo
        </button>
      </div>
    </Form>
  );
};

export default FormGastosFij;