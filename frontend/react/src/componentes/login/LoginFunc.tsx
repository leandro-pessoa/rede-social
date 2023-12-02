// imports dos módulos
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'

// import da action
import { setDefaultTheme } from '../../features/reducers'

// import do estilo
import { LoginButton } from '../../estilos/Login-style'

// tipagem dos props
interface Props {
    usuario: string,
    senha: string,
    setUsuarioInvalido: (cond: boolean) => void,
    setSenhaIncorreta: (cond:boolean) => void
}

export default class LoginFunc extends React.Component<Props>{
    // tipagem dos states
    state: {
        dados: object[],
        session: object[]
    }

    //declaração do construtor e dos states
    constructor(props: Props){
        super(props)
        this.state = {
            dados: [],
            session: []
        }
    }

    // pega os dados do banco de dados
    getDados(): void{
        axios.get('http://localhost:3000/get')
            .then((res)=>{
                this.setState({
                    dados: res.data
                })
            })
            .catch((err)=>{
                console.log('!!!ERRO: ' + err)
            })
    }

    // roda a função getDados quando o componente é montado
    componentDidMount(): void {
        this.getDados()
    }

    // quando o login é efetuado, um armazemamento de sessão é criado com os dados do usuário logado
    session(): void{
        let user: object[] = []
        this.state.dados.map(
            (dado: {_id?: string, nome?: string, sobrenome?: string, usuario?: string, email?: string, nascimento?: string}) => {
                if(this.props.usuario == dado.usuario || this.props.usuario == dado.email){
                    user.push({
                        _id: dado._id,
                        nome: dado.nome,
                        sobrenome: dado.sobrenome,
                        usuario: dado.usuario,
                        email: dado.email,
                        nascimento: dado.nascimento
                    })
                }
            }
        )
        sessionStorage.setItem('usuario_logado', JSON.stringify(user))
    }

    // faz a verificação do usuário ou email e da senha
    verification(modo: number): boolean{
        let countUser: number = 0
        let countPass: number = 0
        this.state.dados.map(
            (dado: {usuario?: string, email?: string, senha?: string}) => {
                if(this.props.usuario == dado.usuario || this.props.usuario == dado.email){
                    countUser++
                }
                if(this.props.senha == dado.senha){
                    countPass++
                }
            }
        )
        if(modo == 1){
            if(countUser == 1){
                return true
            }
            else{
                return false
            }
        }
        else{
            if(countPass > 0){
                return true
            }
            else{
                return false
            }
        }
        
    }

    // faz as validações impostas acima
    // caso haja alguma invalidação, as mensagens de erro aparecerão
    login(): void{
        
        if(this.verification(1)){
            this.props.setUsuarioInvalido(false)
            if(this.verification(2)){
                this.props.setSenhaIncorreta(false)
                this.session()
            }
            else{
                this.props.setSenhaIncorreta(true)
            }
        }
        else{
            this.props.setUsuarioInvalido(true)
        }
    }

    // renderiza o button de acordo com as validações
    renderButton(): JSX.Element{
        if(this.verification(1) && this.verification(2)){
            return (
                <Link to='/'>
                    <LoginButton onClick={()=>this.login()}>
                        Entrar
                    </LoginButton>
                </Link>
            )
        }
        else{
            return (
                <LoginButton onClick={()=>this.login()}>
                    Entrar
                </LoginButton>
            )
        }
    }

    // renderização
    render(): React.ReactNode {
        return(
            <> 
                {this.renderButton()}
            </>
        )
    }
}