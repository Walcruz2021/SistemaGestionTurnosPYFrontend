import styled, { css } from 'styled-components'

const Label = styled.label`
  text-align: center;
  display: block;
  font-weight: 400;
  padding: 2px;
  width:100%;
  

  ${(props) =>
    props.valido === 'false' &&
    css`
      color: ${colores.error};
    `}
`

const LabelCheck = styled.label`
  //float:left
  display: block;
  font-weight: 400;
  padding: 1px;
  margin-top:7px;
  //margin-left:4.2rem;
  text-align:center

  ${(props) =>
    props.valido === 'false' &&
    css`
      color: ${colores.error};
    `}
`

const Label2 = styled.label`
  text-align: center;
  display: block;
  font-weight: 500;
  padding: 10px;
  color:#000080;

  ${(props) =>
    props.valido === 'false' &&
    css`
      color: ${colores.error};
    `}
`

const Label3 = styled.label`
  
  //display: inline-block;
  font-weight: 500;
  padding: 2px;
  color:blue;
  margin-top:5px;

  ${(props) =>
    props.valido === 'false' &&
    css`
      color: ${colores.error};
    `}
`

const Label4 = styled.label`
  text-align: right;
  //display: inline-block;
  font-weight: 500;
  padding: 10px;
  color:blue; 

  ${(props) =>
    props.valido === 'false' &&
    css`
      color: ${colores.error};
    `}
`

const InputContainer = styled.div`
  margin: 0.5rem 0;
`
const InputContainerCheck = styled.div`
  margin: 0.2rem 0rem;
`

const colores = {
  borde: '#0075FF',
  error: '#bb2929',
  exito: '#1ed12d'
}





export { Label, Label2, InputContainer, Label3, Label4,LabelCheck,InputContainerCheck }
