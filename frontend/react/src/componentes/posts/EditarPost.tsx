// imports dos módulos
import React, { ChangeEvent } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

// imports dos estilos
import { Post, Div, P, H2, Small, H3, StyledCiEdit, StyledMdOutlineCancel } from '../../estilos/RenderPosts-style'
import { TextArea, InputTittle } from '../../estilos/Estilos-gerais'


// tipagem dos props
interface Props {
    dados: object[],
    setDados: (arg: object[]) => void
    post: {id: string, titulo: string, msg: string}[],
    close: () => void
}

export default class EditarPost extends React.Component<Props>{
    // tipagem dos states
    state: {
        titulo: string,
        msg: string
    }

    // declaração do contrutuor e dos states
    constructor(props: Props){
        super(props)
        this.state = {
            titulo: '',
            msg: ''
        }
    }

    // setagem dos states título e msg
    setValores(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void{
        const { name, value } = e.target
        this.setState({
            [ name ]: value
        })
    }

    // atribui o título e a mensagem do post aos states
    setInputs(): void{
        this.setState({
            titulo: this.props.post[0].titulo,
            msg: this.props.post[0].msg
        })
    }

    // roda a função 'setInputs' quando o componente é montado
    componentDidMount(): void {
        this.setInputs()
    }

    // faz a edição do post
    editar(): void{
        if(this.state.titulo == '' || this.state.msg == ''){
            toast.error('Preencha todos os campos!', {
                theme: 'dark',
                icon: false
            })
        }
        else{
            // envio dos dados para o backend
            axios.put('http://localhost:3000/edit', {
                id: this.props.post[0].id,
                titulo: this.state.titulo,
                msg: this.state.msg,
                editado: true
            })

            // parte destinada à renderização imediata da edição
            const post: any = this.props.post[0]
            let novosDados: object[] = []
            this.props.dados.map(
                (dado: {id?: string}) => {
                    if(dado.id != this.props.post[0].id){
                        novosDados.push(dado)
                    }
                }
            )
            novosDados.push({
                id: post.id,
                usuario: post.usuario,
                email: post.email,
                titulo: this.state.titulo,
                msg: this.state.msg,
                data: post.data,
                hora: post.hora,
                editado: true
            })
            this.props.setDados(novosDados)

            // fecha o modo de edição
            this.props.close()
        }
    }

    // renderiza a caixa de edição, acrescentando inputs ao invés do título e do parágrafo
    renderEdit(): JSX.Element[] | undefined{
        return this.props.post.map(
            (dado: {id?: string, usuario?: string, email?: string, titulo?: string, msg?: string, data?: string, hora?: string}) => 
                <Post>
                    <Div
                        style={{justifyContent: 'space-between'}}
                    >
                        <Div>
                            <H2>{dado.usuario}</H2>
                            <Small>
                                | {dado.data} {dado.hora}
                            </Small>
                        </Div>
                    </Div>
                    <Div
                        style={{flexDirection: 'column'}}
                    >
                        <InputTittle
                            style={{marginBottom: '4px'}}
                            name='titulo'
                            value={this.state.titulo}
                            onChange={(e)=>this.setValores(e)}
                            autoComplete='off'
                        />
                        <TextArea
                            name='msg'
                            value={this.state.msg}
                            onChange={(e)=>this.setValores(e)}
                            autoComplete='off'
                        />
                    </Div>
                    <Div>
                        <StyledCiEdit
                            size={26}
                            color='#d4c365'
                            onClick={()=>this.editar()}
                        />
                        <StyledMdOutlineCancel
                            size={26}
                            color='#d46565'
                            onClick={()=>this.props.close()}
                        />
                    </Div>
                </Post>
            )  
    }

    render(): React.ReactNode {
        return (
            <>
                <ToastContainer/>
                {this.renderEdit()}
            </>
        )
            
    }
}