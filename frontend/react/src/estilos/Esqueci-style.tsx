// import do componente
import styled from "styled-components"

//import da imagem
import Img from '../componentes/img/background-img.jpg'

// declaração dos componentes estilizados

const SectionEsqueci = styled.section`
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background: url(${Img}) center center no-repeat fixed;
    background-size: cover;
    @media (max-width: 600px){
        font-size: 0.9em;
    }
    @media (max-width: 500px){
        font-size: 0.8em;
    }
`

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #00000060;
    color: white;
    padding: 20px 30px;
`

const P = styled.p`
    text-align: center;
    margin: 10px;
`

const DivInputs = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    @media (max-width: 500px){
        grid-template-columns: auto;
    }
`

const Div = styled.div`
    display: flex;
`
const DivConfirm = styled.div`
    width: 100%;
    margin-top: 20px;
    @media (min-width: 1000px){
        width: 50%;
    }
`

const H2 = styled.h2`
    font-weight: normal;
    text-align: center;
    margin: 5px;
`

const Span = styled.span`
    margin: 5px;
`

// export dos components
export { SectionEsqueci, Main, P, DivInputs, Div, DivConfirm, H2, Span } 