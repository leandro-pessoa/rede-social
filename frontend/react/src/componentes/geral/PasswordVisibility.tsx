//import do módulo
import React from 'react'

//imports das imagens
import { Button, BsEyeStyled, BsEyeSlashStyled } from '../../estilos/Eye-style'


//tipagem dos props
interface Props {
    passVisibility: boolean,
    setPassVisibility: () => void
}

export default class PasswordVisibility extends React.Component<Props>{
    //tipagem do state
    state: {
        ativado: boolean
    }

    //declaração do construtor e do state
    constructor(props: Props){
        super(props)
        this.state = {
            ativado: false
        }
    }

    //função que renderiza a imagem conforme a condição
    renderEye(): JSX.Element{
        if(this.props.passVisibility){
            return(
                <Button onClick={()=>this.props.setPassVisibility()}
                    type='button'
                >
                    <BsEyeSlashStyled color='#41A7BD' size={20}/>
                </Button>
            )
        }
        else{
            return(
                <Button onClick={()=>this.props.setPassVisibility()}
                    type='button'
                >
                    <BsEyeStyled color='#41A7BD' size={20}/>
                </Button>
            )
        }
    }

    render(): React.ReactNode {
        return(
            <>
                {this.renderEye()}
            </>
        )
    }
}