//documento voltado à estilização dos componentes da página de login

//import dos módulos
import styled from 'styled-components'
import { Link } from "react-router-dom"

//import da imagem de fundo
import img from '../componentes/img/background-img.jpg'

//declaração das constantes e suas respectivas estilizações
const Body = styled.body`
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url(${img}) no-repeat center top fixed;
    background-size: cover;
`

const Main = styled.main`
    background-color: #00000075;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    padding-top: 0px;
    border-radius: 10px;
    border: 1px solid #013759;
`

const DivTitulo = styled.div`
    
`
const H1 = styled.h1`
    font-size: 2.5em;
    margin: 30px;
    text-align: center;
    color: #41A7BD;
`
const PTxt = styled.p`
    font-size: 0.95em;
    color: white;
`

const Div = styled.div`

`

const DivContent = styled.div`
    margin-top: 10px;
`
const Label = styled.label`
    
`
/*
const LoginInput = styled.input`
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
*/
const LoginButton = styled.button`
    width: 100%;
    font-size: 1em;
    padding: 5px 10px;
    margin: 3px 0px;
    background: linear-gradient(to right, #356A8C, #356A8C, #2E9FBD, #50ADBE, #80C3B0, #C9D1AA);
    border: none;
    border-radius: 15px;
    color: white;
    &:hover{
        transform: translate(-1px, -1px);
        transition: ease transform .2s;
        box-shadow: 1px 1px 2px #00000041;
        cursor: pointer;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1em;
    color: #41A7BD;
    &:hover{
        text-decoration: underline;
    }
`

//exportação das tags estilizadas
export { Main, Body, DivTitulo, H1, PTxt, Div,  DivContent, Label, LoginButton, StyledLink };

