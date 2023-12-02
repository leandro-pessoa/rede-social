// estilos gerais

// imports dos módulos
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'

// tipagens do estilo global
export interface DefaultTheme {
    background: string,
    color: string,
    scrollbar: string,
    scrollbarBack: string, 

}

// declaração do estilo global
export const GlobalStyles = createGlobalStyle<{theme: DefaultTheme}>`
    body, main {
        background-color: ${({theme}) => theme.background};
        color: ${({theme}) => theme.color};
    }
    *::-webkit-scrollbar{
        width: 20px;
    }
    *::-webkit-scrollbar-track{
        background: ${({theme}) => theme.scrollbar};
    }
    *::-webkit-scrollbar-thumb{
        background: ${({theme}) => theme.scrollbarBack};
        border-radius: 15px;
        border: 5px solid ;
        
        border-color: ${({theme}) => theme.scrollbar};
    }

    ::-webkit-input-placeholder{
        color: #fff;
    }
`

// declaração dos componentes
const Input = styled.input`
    background-color: transparent;
    font-size: 1em;
    border: none;
    border-bottom: 3px solid #41A7BD;
    color: white;
    padding: 3px 10px;
    outline: none;
    border-radius: 2px;
    margin: 5px;
    transition: .3s;
    &:focus {
        border-bottom: 3px solid transparent;
    }
`

const Invalido = styled.span`
    color: rgb(214, 24, 24);
    font-size: 0.8em;
    font-weight: bold;
`

const TextArea = styled.textarea`
    width: calc(100% - 22px);
    background-color: transparent;
    border: 1px solid;
    border-color: ${({theme}) => theme};
    border-radius: 5px;
    padding: 3px 10px;
    resize: none;
    color: ${({theme}) => theme};
    font-size: 1.1em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: lighter;
    height: 70px;
    margin-top: 3px;
    &:focus{
        outline: 2px solid #41a6bddc;
        border: 1px solid #3a95aadc;
    }
    &::placeholder{
        color: ${({theme}) => theme.color};
    }
    @media (max-width: 500px){
        font-size: 0.9em
    }
`

const InputTittle = styled.input`
    background-color: transparent;
    border: 1px solid;
    border-color: ${({theme}) => theme};
    border-radius: 5px;
    font-size: 1.1em;
    padding: 3px 10px;
    color: ${({theme}) => theme};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: lighter;
    width: 50%;
    &:focus{
        outline: 2px solid #41a6bddc;
        border: 1px solid #3a95aadc;
    }
    &::placeholder{
        color: ${({theme}) => theme.color};
    }
    @media (max-width: 500px){
        font-size: 0.9em
    }
`

const HrMaior = styled.hr`
    width: 90%;
    margin-bottom: 10px;
`

const ConfirmButton = styled.button`
    background-color: transparent;
    color: #80C3B0;
    padding: 10px 15px;
    font-size: 1em;
    border: 2px solid #80C3B0;
    border-radius: 20px;
    margin-right: 20px;
    transition: .3s;
    &:hover{
        background-color: #80C3B0;
        color: white;
        cursor: pointer;
    }
`

const StyledLink = styled(Link)`
    
`



//exportação dos componentes
export { Input, Invalido, TextArea, InputTittle, HrMaior, ConfirmButton, StyledLink }