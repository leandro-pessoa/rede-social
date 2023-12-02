// import do módulo
import styled from 'styled-components'

// import do ícone
import { IoMdSend } from 'react-icons/io'

// tipagem dos props
interface Props {
    ativo: boolean
}

// função facilitadora
const propsAtivo = (arg1: string, arg2: string) => {
    return (props: Props) => props.ativo ? arg1 : arg2
}

// declaração dos componentes estilizados

const ButtonAtivar = styled.button`
    width: 80%;
    border: none;
    background-color: transparent;
    &:hover{
        cursor: pointer;
    }
    @media (min-width: 800px){
        width: 65%;
    }
`

const DivEnviar = styled.div`
    margin: ${propsAtivo('20px', '0px')};
    margin-top: 5px;
    border: ${propsAtivo('1px solid black', 'none')};
    border-color: ${({theme}) => theme};
    border-radius: 10px;
    padding: ${propsAtivo('10px 16px', '5px')};
    width: 80%;
    display: flex;
    flex-direction: column;
    height: ${propsAtivo('auto', '0px')};
    gap: 5px;
    @media (min-width: 800px){
        width: 65%;
    }
`

const DivCampo = styled.div`
    display: ${propsAtivo('block', 'none')};
`

const ButtonSend = styled.button`  
    background-color: transparent;
    border: none;
`

const StyledIoMdSend = styled(IoMdSend)`
    &:hover{
        cursor: pointer;
        transform: translate(0px, 4px);
        transition: ease transform .3s;
    }
    &:active{
        transform: translate(0px, 5px);
        transition: ease transform .2s;
    }
    @media (max-width: 550px){
        width: 20px;
    }
`

const Logue = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.1em;
    padding: 40px;
    border-top: 1px solid;
    border-color: ${({theme}) => theme};
    width: calc(80% - 40px);
    text-align: center;
    @media (max-width: 600px){
        font-size: 1em;
    }
`

const Div = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
`

// exportação dos componentes
export { ButtonAtivar, DivEnviar, DivCampo, ButtonSend, StyledIoMdSend, Logue, Div }