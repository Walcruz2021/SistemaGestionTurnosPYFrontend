import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const InputContainers = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexdirection || 'column'};
  align-items: ${(props) => props.align || 'center'};
  text-align: center;
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  margin-top:5px
`

export const SelectorStyle=styled.select`
margin:5px;
border-radius: 5px;
border: ${(props) => props.border || '0.2px solid rgb(187, 191, 187)'};
padding: 0px 5px 0px;
color: ${(props) => props.color || 'rgb(99, 102, 99)'};
width:95%;

`
export const Input1 = styled.input`
  background-color: ${(props) => props.bgcolor || 'rgba(255, 255, 255)'};
  width: ${(props) => props.width || '100%'};
  padding: 0 20px 0;
  border-radius: 0px;
  border: ${(props) => props.border || '0.2px solid rgb(187, 191, 187)'};
  color: ${(props) => props.color || 'rgb(99, 102, 99)'};
  font-size: 16px;
  height: 25px;
  &:focus ~ .placeholder {
    transform: translateY(-35px) translateX(-0px) scale(0.9);
  }
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-35px) translateX(-0px) scale(0.9);
  }
  float:right;
`

export const InputCheck = styled.input`
background-color: ${(props) => props.bgcolor || 'rgba(255, 255, 255)'};
width: ${(props) => props.width || '50%'};
padding: 0 5px 0;
border-radius: 0px;
border: ${(props) => props.border || '0.2px solid rgb(187, 191, 187)'};
color: ${(props) => props.color || 'rgb(99, 102, 99)'};
font-size: 16px;
height: 25px;
&:focus ~ .placeholder {
  transform: translateY(-35px) translateX(-0px) scale(0.9);
}
&:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-35px) translateX(-0px) scale(0.9);
}
//float:right;
margin-top:5px;
margin-right:1rem;
margin-left:4rem;
`

export const Check = styled.input`
  background-color: ${(props) => props.bgcolor || 'rgba(255, 255, 255)'};
  width: ${(props) => props.width || '100%'};
  padding: 0 20px 0;
  border-radius: 5px;
  border: ${(props) => props.border || '0.2px solid rgb(187, 191, 187)'};
  color: ${(props) => props.color || 'rgb(99, 102, 99)'};
  font-size: 16px;
  height: 20px;
  margin-top:7px;
  
  &:focus ~ .placeholder {
    transform: translateY(-35px) translateX(-0px) scale(0.9);
  }
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-35px) translateX(-0px) scale(0.9);
  }
  float:right;

`



export const Input2 = styled.input`
  background-color: ${(props) => props.bgcolor || 'rgba(255, 255, 255)'};
  width: ${(props) => props.width || '60%'};
  padding: 0 5px 0;
  border-radius: 0px;
  border: ${(props) => props.border || '0.2px solid rgb(187, 191, 187)'};
  color: ${(props) => props.color || 'rgb(99, 102, 99)'};
  font-size: 14px;
  height: 25px;
  &:focus ~ .placeholder {
    transform: translateY(-35px) translateX(-0px) scale(0.9);
  }
  &:not(:placeholder-shown) ~ .placeholder {
    transform: translateY(-35px) translateX(-0px) scale(0.9);
  }
  float:right;
  margin-top:7px;
`



export const ButtonTurno = styled.button`
  width: ${(props) => props.width || '7.5rem'};
  height: ${(props) => props.height || '2.5rem'};
  align-self: ${(props) => props.alignself || 'unset'};
  background-color: ${(props) => props.bgColor || 'rgba(0, 41, 107, 1)'};
  font-size: ${(props) => props.fontSize || '1.125rem'};
  border-radius: ${(props) => props.borderRadius || '0'};
  border: ${(props) => props.border || 'none'};
  text-transform: ${(props) => props.upper || 'none '};
  padding: 0;
  margin-top:1rem;
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 350ms ease-out;
  &:hover {
    color: rgb(0, 41, 107, 1);
    background-color: rgb(255, 255, 255);
    border: 2px solid rgb(0, 41, 107, 1); 
  };
  
`

export const ButtonTurno2 = styled.button`
  width: ${(props) => props.width || '7.5rem'};
  height: ${(props) => props.height || '2.5rem'};
  align-self: ${(props) => props.alignself || 'unset'};
  background-color: ${(props) => props.bgColor || 'rgba(128,128,128,0.7)'};
  font-size: ${(props) => props.fontSize || '1.125rem'};
  border-radius: ${(props) => props.borderRadius || '0'};
  text-transform: ${(props) => props.upper || 'none '};
  padding: 0;
  color: rgb(255, 255, 255);
  margin-top:1rem;
`

