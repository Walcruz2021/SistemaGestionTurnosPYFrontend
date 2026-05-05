import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import Form from "react-bootstrap/Form";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addGastos } from "../../../reducer/actions/actionsGastos";
import { Plus } from "lucide-react";

const FormGastosVar = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const companySelectdMenu = useSelector(
    (state) => state.company.companySelected
  );

  const { register, handleSubmit, control, reset, watch } = useForm();

  const [visibleCheckE, setVisibleCheckE] = useState(false);
  const [visibleCheckT, setVisibleCheckT] = useState(false);
  const [visibleCheckB, setVisibleCheckB] = useState(false);

  const allValues = watch();

  const handleCheckChange = (type) => {
    if (type === "Efectivo") setVisibleCheckE(!visibleCheckE);
    if (type === "Transferencia") setVisibleCheckB(!visibleCheckB);
    if (type === "Tarjeta") setVisibleCheckT(!visibleCheckT);
  };

  const arrayGastosVar = [
    { value: "REPUESTOS MAQUINARIAS", label: "Repuestos Maquinarias" },
    { value: "MANO DE OBRA TECNICO", label: "Mano de Obra Tecnico" },
    {
      value: "MULTAS ADMINISTRATIVAS",
      label: "Multas Administrativas",
    },
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
      newData.efectivo + newData.transferencia + newData.tarjeta;

    dispatch(
      addGastos({
        año,
        date: newData.date,
        description: newData.description,
        efectivo: newData.efectivo,
        tarjeta: newData.tarjeta,
        transferencia: newData.transferencia,
        categoryGasto: "GASTO VARIABLE",
        value,
        mes,
        typeGasto: newData.category.value,
        idCompany: companySelectdMenu._id,
      })
    );

    MySwal.fire({
      title: "¡Gasto Variable Agendado!",
      icon: "success",
      confirmButtonColor: "rgb(21, 151, 67)",
    });

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
  };

  const isFormValid = () => {
    return (
      allValues.date &&
      allValues.description &&
      allValues.description.trim() !== "" &&
      (Number(allValues.efectivo) > 0 ||
        Number(allValues.transferencia) > 0 ||
        Number(allValues.tarjeta) > 0) &&
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
            Categoría
          </label>
          <Controller
            name="category"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="* Seleccione Categoria"
                options={arrayGastosVar}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase text-gray-500">
            Fecha
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
          Medio de pago
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
                  className={`w-4 h-4 border flex items-center justify-center
                  ${item.checked
                      ? "bg-black border-black"
                      : "bg-white border-gray-300"
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
                <Controller
                  name={item.field}
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Form.Control
                      type="number"
                      placeholder="$"
                      min="0"
                      className="w-full bg-neutral-900 border border-neutral-700 text-gray-200 px-3 py-1.5 text-sm"
                      {...field}
                    />
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DESCRIPCION */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase text-gray-500">
          Descripción del gasto
        </label>

        <textarea
          {...register("description")}
          placeholder="Añadí un comentario..."
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
          Ingresar Gasto Variable
        </button>
      </div>
    </Form>
  );
};

export default FormGastosVar;
