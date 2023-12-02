// estilização do ícone de visibilidade de senhas

//import do módulo
import styled from 'styled-components'

//imports das imagens
import { BsEye } from 'react-icons/bs'
import { BsEyeSlash } from 'react-icons/bs'

//declaração das constantes que estilizam as imagens

const Button = styled.button`
    background-color: transparent;
    border: none;
`

const BsEyeStyled = styled(BsEye)`
    transform: translate(0px, 6px);
    &:hover{
        cursor: pointer
    }
`
const BsEyeSlashStyled = styled(BsEyeSlash)`
    transform: translate(0px, 6px);
    &:hover{
        cursor: pointer
    }
`

//exportação das imagens estilizadas
export { Button, BsEyeStyled, BsEyeSlashStyled }