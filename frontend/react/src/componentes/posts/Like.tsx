// imports dos módulos
import React from 'react'
import axios from 'axios'

// import dos componentes esitlizados
import { Button, Span } from '../../estilos/Like-style'

// tipagem dos props
interface Props {
    id?: string,
    email?: string,
    numLikes?: number
}

export default class Like extends React.Component<Props>{
    // tipagem dos states
    state: {
        posts: any,
        user: any,
        liked: boolean,
        likes: any
    }

    // declaração do construtor e dos states
    constructor(props: Props){
        super(props)
        this.state = {
            posts: [],
            user: [],
            liked: false,
            likes: this.props.numLikes
        }

    }

    // pega o usuário logado do sessionStorage e o coloca no state 'user'
    getUsuarioLogado(): void{
        if(sessionStorage.getItem('usuario_logado')){
          this.setState({
            user: JSON.parse(String(sessionStorage.getItem('usuario_logado')))[0]
          })
        }
    }

    // pega os posts do backend e verifica se o post está com like ou não
    verificarPosts(): void {
        axios.get('http://localhost:3000/get-post')
            .then((res)=>{
                this.setState({posts: res.data})
                let count: number = 0
                res.data.map(
                    (post: {id?: string, likes: string[]}) => {
                        if(this.props.id == post.id){
                            post.likes.map(
                                (usuario) => {
                                    if(usuario == this.state.user.usuario){
                                        count++
                                    }
                                }
                            )
                        }
                    }
                )
                if(count > 0){
                    this.setState({liked: true})
                }
                else{
                    this.setState({liked: false})
                }
            })
            .catch((err)=>{
                console.log('!!!ERRO: ' + err)
            })
    }

    // executa as funções 'getPosts' e 'getUsuarioLogado' quando o componente é montado
    componentDidMount(): void {
        this.verificarPosts()
        this.getUsuarioLogado()
    }

    // faz o registro do like no banco de dados
    like(e: any): void{
        this.state.posts.map(
            (post: {id?: string, likes: string[]}) => {
                if(post.id == e.target.dataset.indice){
                    const likes: string[] = post.likes
                    likes.push(this.state.user.usuario)
                    axios.put('http://localhost:3000/like-deslike', {
                        id: post.id,
                        likes: likes
                    })
                }
            }
        )
        this.setState({
            liked: true,
            likes: this.state.likes + 1
        })
    }

    // retira o registro do like do banco de dados e atualiza o state posts
    deslike(e: any): void{
        let novosLikes: string[] = []
        let novosPosts: object[] = []
        this.state.posts.map(
            (post: {id?: string, usuario?: string, email?: string, titulo?: string, msg?: string, data?: string, hora?: string, editado?: boolean, likes: string[]}) => {
                if(post.id == e.target.dataset.indice){
                    post.likes.map(
                        (user) => {
                            if(user != this.state.user.usuario){
                                novosLikes.push(user)
                            }
                        }
                    )
                    axios.put('http://localhost:3000/like-deslike', {
                        id: post.id,
                        likes: novosLikes
                    })
                }
                if(post.id != e.target.dataset.indice){
                    novosPosts.push(post)
                }
                else{
                    novosPosts.push({id: post.id, usuario: post.usuario, email: post.email, titulo: post.titulo, msg: post.msg, data: post.data, hora: post.hora, editado: post.editado, likes: novosLikes})
                }
            }
        )
        this.setState({
            liked: false,
            posts: novosPosts,
            likes: this.state.likes - 1
        })
    }

    // renderiza coração preenchido (quando foi dado o like)
    renderLiked(id?: string): JSX.Element{
        return (
            <Button 
                data-indice={id}
                onClick={(e)=>this.deslike(e)}
                buttonColor='#f85d5d'
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 96 960 960" width="27" data-indice={id} fill='#f85d5d'>
                    <path d="m480 866-17-16q-99-90-163-154.5t-101.5-113q-37.5-48.5-52-87T132 419q0-70 47.5-117.5T297 254q54 0 100.5 30t82.5 88q38-59 83.5-88.5T663 254q70 0 117.5 47.5T828 419q0 38-14.5 76.5t-52 87Q724 631 660 695.5T497 850l-17 16Z" data-indice={id}/>
                </svg>
                <Span>
                    {this.state.likes}
                </Span>
            </Button>
        )
    }

    // renderiza o coração vazio (quando não há like)
    renderUnliked(id?: string): JSX.Element | undefined{
        if(this.state.user.email != '' && this.state.user.email != undefined && this.state.user.email != null){
            return (
                <Button
                    data-indice={id}
                    onClick={(e)=>this.like(e)}
                    buttonColor='#71747C'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 96 960 960" width="27" data-indice={id} fill='#71747C'>
                        <path d="m480 866-17-16q-98.768-90.121-162.884-154.561Q236 631 198.5 582.5t-52-87.172Q132 456.657 132 419q0-69.718 47.5-117.359Q227 254 297 254q54 0 100.5 30t82.5 88q38-59 83.356-88.5Q608.712 254 663 254q70 0 117.5 47.641T828 419q0 37.657-14.5 76.328Q799 534 761.614 582.285q-37.385 48.285-101.616 112.939Q595.768 759.879 497 850l-17 16Zm0-30q97.291-88.549 160.125-151.656t99.854-110.226Q777 527 791.5 490.709q14.5-36.291 14.5-71.564Q806 358 765 317q-41-41-101.775-41-50.524 0-91.875 29Q530 334 490 398h-20q-41-64-82.331-93-41.33-29-90.894-29Q237 276 195.5 317 154 358 154 419.647q0 34.96 14.66 71.197 14.66 36.238 51 83.197T319.5 684Q383 747 480 836Zm0-280Z" data-indice={id}/>
                    </svg>
                    <Span>
                        {this.state.likes}
                    </Span>
                </Button>
            )
        }
    }

    // usa o state 'posts' para renderizar o coração vazio ou preenchido 
    renderLike(): JSX.Element | undefined{
        if(this.state.liked){
            return this.renderLiked(this.props.id)
        }
        else{
            return this.renderUnliked(this.props.id)
        }
    }

    render(): React.ReactNode {
        return(
            <>
                {this.renderLike()}
            </>
        )
    }
}