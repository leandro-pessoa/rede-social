// imports dos módulos
import React from 'react'

// imports dos estilos
import { DivPosts, Post, Div, H2, Small, P, Button, H3, Svg, Path } from '../../estilos/RenderPosts-style'
import { TextArea } from '../../estilos/Estilos-gerais'

// imports de outros componentes
import ApagarPost from './ApagarPost' 
import EditarPost from './EditarPost'
import Like from './Like'

// tipagem dos props
interface Props {
    dados: object[],
    setDados: (arg: object[]) => void 
}

export default class RenderPosts extends React.Component<Props>{
    // tipagem dos states
    state: {
        user: any,
        modoEdit: boolean,
        post: {id: string, titulo: string, msg: string}[],
        titulo: string,
        msg: string,
        comentario: boolean
    }

    // declaração do construtor e dos states
    constructor(props: Props){
        super(props)
        this.state = {
            user: [],
            modoEdit: false,
            post: [],
            titulo: '',
            msg: '',
            comentario: false
        }
    }

    // função de setagem do state dados, que pode ser usada em outro componente
    setDados(array: object[]): void{
        this.setState({
            dados: array,
        })
    }

    // coloca o post em modo de edição 
    setModoEdit(e: any): void{
        const post: object[] = []
        this.props.dados.map(
            (dado: {id?: string}) => {
                if(e.target.dataset.indice == dado.id){
                    post.push(dado)
                }
            }
        )
        this.setState({
            modoEdit: true,
            post: post
        })
    }

    // fechamento do modo de edição
    closeModoEdit(): void {this.setState({modoEdit: false})}

    // pega o usuário logado do sessionStorage e o coloca no state 'user'
    getUsuarioLogado(): void{
        if(sessionStorage.getItem('usuario_logado')){
          this.setState({
            user: JSON.parse(String(sessionStorage.getItem('usuario_logado')))[0]
          })
        }
    }
    
    // roda a função 'getPosts' quando o componenete é criado
    componentDidMount(): void {
        this.getUsuarioLogado()
    }

    // renderiza os buttons de edição e de apagar se o usuário logado for o mesmo que publicou o post
    renderCrud(email: string | undefined, indice: string | undefined): JSX.Element | undefined{
        const user: any = this.state.user
        if(email == user.email){
            return (
                <P>
                    <Button>
                        <Svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            height="24" 
                            viewBox="0 96 960 960" 
                            width="24"
                            fill='#d4c365'
                            onClick={(e)=>this.setModoEdit(e)}
                            data-indice={indice}
                        >
                            <Path d="M80 1056v-48h800v48H80Zm132.667-185.333V796l352-350 72.666 72.667-350 352h-74.666Zm24-24H274L602.667 518l-37.334-37.333-328.666 328v38Zm433.666-366L597.667 410l40-40.667q11-11 26.333-11.333 15.333-.333 27 11.333L708.333 386q11 11.667 11.667 27 .667 15.333-9.667 27l-40 40.667Zm-433.666 366Z" data-indice={indice}/>
                        </Svg>
                    </Button>
                    <ApagarPost 
                        indice={indice}
                        dados={this.props.dados}
                        setDados={(e)=>this.props.setDados(e)}
                    />
                </P>
            )
        }
    }

    // renderiza os posts, ou, caso o modo de edição estiver ativo, renderiza o post a ser editado
    renderPosts(): JSX.Element[] | JSX.Element | undefined{
        if(this.state.modoEdit){
            return (
                <EditarPost
                    dados={this.props.dados}
                    setDados={(e)=>this.props.setDados(e)}
                    post={this.state.post}
                    close={()=>this.closeModoEdit()}
                />
            )
        }
        else{
            return this.props.dados.map(
                (post: {id?: string, usuario?: string, email?: string, titulo?: string, msg?: string, data?: string, hora?: string, editado?: boolean, likes?: string[]}) => 
                    <Post>
                        <Div
                            style={{justifyContent: 'space-between'}}
                        >
                            <Div>
                                <H2>{post.usuario}</H2>
                                <Small>
                                    | {post.data} {post.hora}
                                </Small>
                                <Small>
                                    {post.editado ? '| Editado' : ''}
                                </Small>
                            </Div>
                            {this.renderCrud(post.email, post.id)}
                        </Div>
                        <Div
                            style={{flexDirection: 'column'}}
                        >
                            <H3>
                                {post.titulo}
                            </H3>
                            <P
                                style={{textIndent: '10px'}}
                            >
                                {post.msg}
                            </P>
                        </Div>
                        <Div style={{gap: '10px'}}>
                            <Like
                                id={post.id}
                                email={post.email}
                                numLikes={
                                    typeof post.likes?.length == 'number' ? post.likes?.length : 0
                                }
                            />
                        </Div>
                    </Post>
                )  
        }
    }

    render(): React.ReactNode {
        return (
            <DivPosts
                style={{height: this.state.modoEdit ? '100%' : 'auto'}}
            >
                {this.renderPosts()}
            </DivPosts>
        )
    }
}