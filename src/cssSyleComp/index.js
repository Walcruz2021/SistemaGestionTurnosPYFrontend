import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Paginado = styled.div`
  text-align: center;
  margin-top: 10px;
`

export const Body = styled.section`
  width: 100%;
  height: 50%;
  padding: ${(props) => props.padding || '3rem'};
  display: ${(props) => props.display || 'grid'};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifycontent || 'unset'};
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.gap || '3rem 0'};
`

export const Header = styled.header`
  padding: 1rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
  background-color: rgb(61, 61, 61);
  @media screen and (max-width: 524px) {
    padding: 1.2rem 2rem;
  }
`

export const StyledLink = styled(Link)`
  color: rgb(255, 255, 255);
  text-decoration: none;
  margin-right: ${(props) => props.margin || 0};
  grid-row: ${(props) => props.gridrow || 'unset'};
  grid-column: ${(props) => props.gridColumn || 'unset'};
  width: ${(props) => props.width || 'unset'};
  justify-self: ${(props) => props.justifySelf || 'unset'};
  &:hover {
    text-decoration: ${(props) => props.hoverUnderline || 'none'};
  }
`

export const Button = styled.button`
  width: ${(props) => props.width || 'unset'};
  padding: ${(props) => props.padding || 'unset'};
  height: ${(props) => props.height || 'unset'};
  margin: ${(props) => props.margin};
  margin-left: ${(props) => props.marginLeft || 'unset'};
  font-size: ${(props) => props.textSize};
  display: ${(props) => props.display || 'flex'};
  align-items: center;
  align-self: ${(props) => props.alignself};
  justify-self: ${(props) => props.justifySelf};
  justify-content: ${(props) => props.justify || 'center'};
  color: ${(props) => props.color || 'rgb(255, 255, 255)'};
  background-color: ${(props) => props.buttonColor || 'rgb(0, 250, 154)'};
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: 700;
  transition: all 350ms ease-out;
  position: ${(props) => props.position};
  bottom: ${(props) => props.bottom};
  &:hover {
    background-color: ${(props) => props.hoverBgColor};
    color: ${(props) => props.hoverColor};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
`

// export const Title = styled.h1`
//   color: ${(props) => props.color || 'rgb(255, 255, 255)'};
//   font-size: 2rem;
//   margin: 0;
//   grid-column: 1 / -1;
//`

export const OptionsBar = styled.div`
  padding: 0 4rem;
  display: flex;
  gap: 0 1.56rem;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(208, 208, 208);
  height: 4rem;
`

export const Loading = styled.div`
  color: rgba(0, 0, 0, 0.3);
  grid-column: ${(props) => props.gridcolumn};
  grid-row: ${(props) => props.gridrow};
  text-align: center;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-weight: bolder;
  }
`
