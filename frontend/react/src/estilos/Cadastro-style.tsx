// estilização dos componentes da página de cadastro

// import do módulo
import styled from 'styled-components'

//import da imagem de fundo
import img from '../componentes/img/background-img.jpg'

// declarações dos componentes
const Body = styled.body`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background: url(${img}) no-repeat center center fixed;
    background-size: cover;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    @media (max-width: 600px){
        font-size: 0.8em;
    }
    @media (max-width: 540px){
        font-size: 0.7em;
    }
    @media (max-width: 425px){
        font-size: 0.6em
    }
`

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #00000060;
    color: white;
    padding: 10px 40px;
`
const Section = styled.section`

`
const FormInputs = styled.form`
    display: grid;
    grid-template-columns: auto auto;
    gap: 15px 30px;
    max-width: 700px;
`

const Div = styled.div`
    border-left: 2px solid #80C3B0;
    padding-left: 7px;
`
const DivImg = styled.div`
    margin-right: 7px; 
`

const H1 = styled.h1`
    text-align: center;
    font-size: 2.5em;
`



const CadastroInput = styled.input`

`
const Field = styled.fieldset`
    display: flex;
    grid-column: 1 / 3;
    padding: 5px;
    border-radius: 0px;
    border: none;
`

//exportação dos componentes
export { Body, Main, Div, DivImg, Section, FormInputs, H1, CadastroInput, Field }