import {
  Label,
  Label2,
  Label3,
  InputContainer,
  Label4
} from '../../cssSyleComp/StyleForm'
import { Input1, Input2 } from '../../cssSyleComp/LandingStyles'
import Select from 'react-select'
// import { Select } from "../../css/Select";
import React from 'react'
import { useState } from 'react'
import reactSelect from 'react-select'
// FORM RECIBIRA LOS VALORES DE ESTOS PARAMTROS DESDE MODAL QUE A SU VEZ A ESTE(me refiero al modal) SE
// ES PASO EN EL MOMENTO QUE SE LO INVOCO AL MODAL
// EN ESTE CASO DE ACEURDO AL ID QUE TENGA EN EL PARAMETRO EL CUAL SE LO PASARON AL MODALÑ CUANDO LO
// INVOCARON Y EL CUAL EL MODAL SE LO ESTA PASANDO A ESTE ARCHIVO, DE ACUERDO A ESE ID SE RENDERIZARA
// EL CODITIONALFORM INDICADO
// ESTE CONDITIONALFORM ES EL QUE TIENE LOS CAMPOS A LLENAR DE UN FORMULARIO COMUN QUE VARIARA DE
// ACUERDO AL VALOR DEL  ID RECIBIDO

export const ConditionalForm = (
  id,
  stateInput, // el state llamado stateInput que tomara los valores ingresados en el input del formulario
  onChange1, // la funcion que se encargara de editar los cambios que se realizen el stateInput
  {
    label1,
    label2,
    label3,
    label4,
    label5, // notesTurn
    label6,
    label7,
    label8, // time
    label9, // notesCli
    label10, // NEW DOG
    label11, // NEWDOG
    label12 // tipoServ
  },
  arrayClients, // ARRAY DE OBJETOS (CADA CLIENTE)
  onChangeSelect,

  handleChangeCli, // NEW DOG
  handleChangeRaza, // NEW DOG
  handleChangeSize, // DOW DOG
  arrayPerros
) => {
  // console.log(stateInput);
  // estado que va a manejar las elecciones

  // IMPRIME LISTADO DE PERROS SEGUN CLIENTE SELECCIONADO
  // if (arrayPerros) {
  //   console.log(arrayPerros, "-------->perrrrrrros");
  // }

  const [selectedOption, setSelectedOption] = useState(null)

  const [optionDog, setOptionDog] = useState(null)
  const [selectedPerros, setSelectedPerros] = useState(null)
  const [selectedRaza, setSelectedRaza] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  console.log(selectedRaza)

  // console.log(optionsSelect2[0]?optionsSelect2[0].label3[0].nameP:console.log("listado de selecciones"))

  // con esto compruebo que se esta cambiando el esatdo a medida que voy eligiendo la opcion
  // if(selectedSize){
  //   console.log(selectedSize.selectedSize, "listado tamaño");
  // }

  // este json viene con el siguiente formato
  //   {selectedOption: {…}}
  // selectedOption:
  // label: "daniel"
  // label2: 7687878
  // value: "626c6712e9a24e1874bdb438",
  // label3: (2) ['6283a77146538c12e4bc0915', '6283a7c20.....
  // [[Prototype]]: Object
  // [[Prototype]]: Object
  // y es creado en MODAL

  // IMPRIME LA OPCION SELECCIONADA Y PROCEDE A REALIZAR UN TIPO DE ACCION
  function FuncionPhone () {
    if (selectedOption) {
      // console.log(selectedOption.selectedOption.label2, "seleccionado");
      // return selectedOption.selectedOption.label2
      stateInput.phone = selectedOption.selectedOption.label2
      stateInput.name = selectedOption.selectedOption.label

      return stateInput.phone
    }
  }

  function FuncionPerro (e) {
    stateInput.nameDog = e.label
  }

  /// ///////////ESTE SECTOR CARGA EL LISTADO DEL PERRO////////////////
  const optionSelectPerro = []
  if (Array.isArray(arrayPerros)) {
    arrayPerros.map((np) => {
      const option = { value: np._id, label: np.nameP }
      optionSelectPerro.push(option)
      return optionSelectPerro
    })
  }

  //* **************************NEW DOG**************************************

  function SelectClient (selectedOption) {
    if (selectedOption) {
      setSelectedOption({ selectedOption }, () =>
        console.log('Option selected:', selectedOption)
      )
    }
  }

  // permite mostrar el listado de opciones (perros) en SELECT (en teporia no sirve)
  // function SelectPerro(selectedPerros) {
  //   if (selectedPerros) {
  //     setSelectedPerros({ selectedPerros }, () =>
  //       console.log(`Option selected:`, selectedPerros)
  //     );
  //   }
  // }

  function SelectRaza (selectedRaza) {
    if (selectedRaza) {
      setSelectedRaza({ selectedRaza }, () =>
        console.log('Option selected:', selectedRaza)
      )
    }
  }

  function SelectSize (selectedSize) {
    if (selectedSize) {
      setSelectedSize({ selectedSize }, () =>
        console.log('Option selected:', selectedSize)
      )
    }
  }

  // console.log(optionSelectPerro, "listado de perros");
  const ListRazas = ['caniche', 'labrador', 'callejero', 'doberman']
  const selectRazas = []

  if (Array.isArray(ListRazas)) {
    ListRazas.map((raza) => {
      const option = { value: raza, label: raza }
      selectRazas.push(option)
      return selectRazas
    })
  }

  const ListSize = ['pequeño', 'mediano', 'grande']
  const sizeSelect = []

  if (Array.isArray(ListSize)) {
    ListSize.map((tam) => {
      const option = { value: tam, label: tam }
      sizeSelect.push(option)
      return sizeSelect
    })
  }

  //* ***********************************************************************
  // Formulario: "CREAR UN CLIENTE"
  if (id === 1) {
    return (
      <form>
        <Label>{label1}</Label>
        <Input1
          type='text'
          name='name'
          required
          value={stateInput.name}
          onChange={(e) => onChange1(e)}
          size='15'
        />

        <InputContainer>
          <Label>{label3}</Label>
          <Input1
            type='text'
            name='phone'
            required
            value={stateInput.phone}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
        <InputContainer>
          <Label>{label6}</Label>
          <Input1
            type='text'
            name='address'
            required
            value={stateInput.address}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
        <InputContainer>
          <Label>{label9}</Label>
          <Input1
            type='text'
            name='notesCli'
            required
            value={stateInput.notesCli}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
      </form>
    )
  }
  // Formulario: "CREAR UN TURNO"
  if (id === 2) {
    return (
      <form>
        <Select
          placeholder='Seleccione Client'
          onChange={(e) => {
            onChangeSelect(e)
            SelectClient(e) // ELIMINAR NO SIRVE
          }}
          options={arrayClients} // array de objetos(cada cliente con su array de perros)
        />

        <Select
          onChange={(e) => {
            FuncionPerro(e)
          }}
          options={optionSelectPerro} // aqui deberia ir el array de perros
        />

        <Label>{label3}</Label>
        <Input1
          type='text'
          name='phone'
          readonly
          value={FuncionPhone()}
          // value={stateInput.phone}
        />

        <InputContainer>
          <Label>{label5}</Label>

          <Input1
            type='text'
            name='notesTurn'
            required
            value={stateInput.notesTurn}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>

        <InputContainer>
          <Label3>{label4}</Label3>
          <Input2
            type='date'
            name='date'
            required
            value={stateInput.date}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>

        <Label3>{label8}</Label3>
        <Input2
          type='time'
          name='time'
          required
          value={stateInput.time}
          onChange={(e) => onChange1(e)}
        />
      </form>
    )
  }

  /// ///////////ADHERIR A VENTAS////////////////

  if (id === 3) {
    return (
      <form>
        <InputContainer>
          <Label>{label7}</Label>
          <Input1
            type='number'
            name='valorServ'
            required
            value={stateInput.valorServ}
            onChange={(e) => onChange1(e)}
            size='15'
          />
        </InputContainer>
        <Label>{label12}</Label>
        <Input1
          type='text'
          name='tipoServ'
          required
          value={stateInput.tipoServ}
          onChange={(e) => onChange1(e)}
          size='15'
        />

      </form>
    )
  }

  // muestra la Informacion Adicional
  if (id === 4) {
    return (
      <form>
        <InputContainer>
          <Label>Nombre del Cliente</Label>
          <Label2>{stateInput.name}</Label2>
          <Label>Celular Cliente</Label>
          <Label2>{stateInput.phone}</Label2>
          <Label>Notas Adicional</Label>
          <Label2>{stateInput.notesTurn}</Label2>
        </InputContainer>
      </form>
    )
  }

  // INFORMACION ADICIONAL CLIENTE

  if (id === 5) {
    return (
      <form>
        <InputContainer>
          <Label>Notas Adicional</Label>
          <Label2>{stateInput.notesCli}</Label2>
        </InputContainer>
      </form>
    )
  }

  // CREATION DOG

  if (id === 6) {
    return (
      <form>
        <Select
          placeholder='Elegir Raza'
          onChange={(e) => {
            handleChangeRaza(e)
            // SelectRaza(e);
          }}
          options={selectRazas}
        />

        <Select
          placeholder='Size'
          onChange={(e) => {
            handleChangeSize(e)
            SelectSize(e)
          }}
          options={sizeSelect}
        />

        <Select
          placeholder='Seleccione Client'
          onChange={(e) => {
            handleChangeCli(e)
            // SelectClient(e);(eliminar no sirve)
          }}
          options={arrayClients}
        />

        <InputContainer>
          <Label>{label10}</Label>
          <Input1
            type='text'
            name='nameP'
            value={stateInput.nameP}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>

        <InputContainer>
          <Label>{label11}</Label>
          <Input1
            type='text'
            name='notaP'
            value={stateInput.notaP}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
      </form>
    )
  }
  // Formulario: "MODIFICAR UN CLIENTE"
  if (id === 7) {
    return (
      <form>
        <InputContainer>
          <Label>{label1}</Label>
          <Input1
            type='text'
            name='name'
            value={stateInput.name}
            // placeholder={name}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>

        <InputContainer>
          <Label>{label3}</Label>
          <Input1
            type='text'
            name='phone'
            value={stateInput.phone}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
        <InputContainer>
          <Label>{label4}</Label>
          <Input1
            type='text'
            name='address'
            value={stateInput.address}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
        <InputContainer>
          <Label>{label9}</Label>
          <Input1
            type='text'
            name='notesCli'
            value={stateInput.notesCli}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
      </form>
    )
  }

  // MODIFICAR TURNO
  if (id === 8) {
    return (
      <form>

        <InputContainer>
          <Label>{label4}</Label>
          <Input1
            type='date'
            name='date'
            value={stateInput.date}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>

        <InputContainer>
          <Label>{label8}</Label>
          <Input1
            type='time'
            name='time'
            value={stateInput.time}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>

        <InputContainer>
          <Label>{label5}</Label>
          <Input1
            type='text'
            name='notesTurn'
            value={stateInput.notesTurn}
            onChange={(e) => onChange1(e)}
          />
        </InputContainer>
      </form>
    )
  }
}
