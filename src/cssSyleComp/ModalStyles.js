import styled from 'styled-components'


export const TitleAndButton = styled.div`
  width:100%;
`

export const CloseButton = styled.div`
  top: 5px;
  width: 50px;
  height: 20px;
  cursor: pointer;
  transition: 0.2s ease all;
  color: rgb(2, 101, 210);
  .fa-window-close {
    width: 30px;
    height: 30px;
  }
  &:hover {
    color: #ff0000;
  }
  
`

// MODAL GENERAL
export const Overlay = styled.div`
  transition: all 0.8s ease;
  width: 100vw;
  //height altura del contenedor donde se posiciona el modal
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: ${(props) => props.padding || '2px'}; //centra el modal
  display: ${(props) => props.display};
  align-items: center;
  justify-content: center;
  margin-top:1.5rem;
  margin-bottom:1.5rem;
`

// FORM DEL MODAL (INTERIOR)
export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || 'center'};
  max-width: ${(props) => props.maxwidth};
  min-width: ${(props) => props.minwidth};
  
  padding: 0.5rem 0.5rem 0.8rem 0.8rem;  
  //0.5arriba 0.5rem abajo 1.5izq y dere
  background: #fff; //color de fondo del modal
  position: relative;
  border-radius: 0.6rem;
  form {
    //ancho conetendor dentro del modal
    width: 100%;
    div {
 
    }
  }
`
export const ButtonModal=styled.button`

width: 100%;
height: 45px;
cursor: pointer;
transition: 0.2s ease all;
color: white;
background: black;
padding:5px;
margin:auto;
margin-top:10px;

// &:hover {
//   color: #060E00;
//   background: 'rgba(0, 0, 255, 1)';
// }
`

