// imports dos módulos
import React from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

// import de outro componente
import Header from './componentes/geral/Header'
import Enviar from './componentes/posts/Enviar'
import RenderPosts from './componentes/posts/RenderPosts'

// import dos estilos
import { Main, SectionImg, SectionContent } from "./estilos/MainPage-style"
import './App.css'

// tipagem dos props
interface Props {

}

export default class MainPage extends React.Component<Props>{
    // tipagem dos states
    state: {
        sectionImgSize: boolean,
        dados: object[]
    }

    // declaração do construtor e dos states
    constructor(props: Props){
        super(props)

        this.state = {
            sectionImgSize: false,
            dados: []
        }
    }
    
    // funções de setagem de states
    setSectionImgSize(): void {
        this.setState({sectionImgSize: !this.state.sectionImgSize})
    }
    setDados(arg: object[]): void{
        this.setState({
            dados: arg
        })
    }

    // pega os posts salvos no banco de dados
    getPosts(): void{
        axios.get('http://localhost:3000/get-post')
            .then((res)=>{
                this.setState({dados: res.data})
            })
            .catch((err)=>{
                toast.error('Não foi possível carregar os posts',{
                    theme: 'dark',
                    icon: false
                })
            })
    }

    // executa a função 'getPosts' quando o componente é criado
    componentDidMount(): void {
        this.getPosts()
    }

    render(): React.ReactNode {
        return (
            <>
                <ToastContainer/>
                <Header/>
                <SectionImg>
                    <Main>
                        <SectionContent>
                            <RenderPosts
                                dados={this.state.dados}
                                setDados={(e)=>this.setDados(e)}
                            />
                            <Enviar
                                dados={this.state.dados}
                                setDados={(e)=>this.setDados(e)}
                            />
                        </SectionContent>
                    </Main>
                </SectionImg>
            </>
        )
    }
}