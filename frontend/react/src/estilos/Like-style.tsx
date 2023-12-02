// import do módulo
import styled from "styled-components"

// tipagem dos props
interface Props {
    buttonColor: string
}

// declaração dos componentes estilizados 

const Button = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-top: -5px;
    width: 7%;
    &:hover{
        cursor: pointer;
    }
    color: ${(props: Props) => props.buttonColor};
`

const Span = styled.span`
    @media (max-width: 500px){
        font-size: 0.7em;
    }
`

// exportação dos componentes
export { Button, Span }