// imports dos módulos
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// import da imagem de fundo
import Img from '../componentes/img/background-img.jpg'

// tipagem dos props
interface Props {
    
}

// declaração dos estilos
const Main = styled.main`
    display: flex;
    flex-direction: row;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: ${({theme}) => theme};
    height: 91vh;
    width: 75%;
    margin: auto;
    color: ${({theme}) => theme};
    border: none;
    @media (max-width: 700px){
        font-size: 0.9em;
        width: 100%;
    }
    @media (max-width: 500px){
        height: calc(90vh - 19px);
    }
`
const SectionImg = styled.section`
    background: url(${Img}) center center no-repeat fixed;
    background-size: cover;
`
const SectionContent = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const DivPost = styled.div`

`


// exportação dos estilos
export { Main, SectionImg, SectionContent, DivPost }
