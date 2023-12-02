// imports dos módulos
import React from 'react'
import axios from 'axios'

// import dos estilos
import { Button, StyledCiTrash } from '../../estilos/RenderPosts-style'

// tipagem dos props
interface Props {
    indice: string | undefined,
    dados: object[],
    setDados: (array: object[]) => void
}

export default class ApagarPost extends React.Component<Props>{
    // declaração do construtor
    constructor(props: Props){
        super(props)

    }

    // responsável por apagar o post selecionado
    apagar(e: any): void{
        let id: string = e.target.dataset.indice
        const dados: object[] = this.props.dados
        const novosDados: object[] = []

        axios.post('http://localhost:3000/apagar', {
            id: id
        })
        dados.map(
            (dado: {id?: string}) => {
                if(dado.id != id){
                    novosDados.push(dado)
                }
            }
        )
        this.props.setDados(novosDados)
    }

    render(): React.ReactNode {
        return (
            <>
                <Button>
                    <StyledCiTrash
                        size={23}
                        color='#d46565'
                        onClick={(e)=>this.apagar(e)}
                        data-indice={this.props.indice}
                    />
                </Button>
            </>
        )
    }
}