// componente referente à função de cadastro da página de cadastro

// imports dos módulos
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import do estilo
import { ConfirmButton }  from '../../estilos/Estilos-gerais'

// tipagem dos props
interface Props {
    user: string,
    nome: string,
    sobrenome: string,
    email: string,
    nascimento: string,
    senha: string,
    confSenha: string,
    setPreencha: (cond: boolean) => void
    setSenhasDiferentes: (cond: boolean) => void,
    setUsuarioExistente: (cond: boolean) => void,
    setEmailExistente: (cond: boolean) => void,
    setEmailIncorreto: (cond: boolean) => void,
    setNascimentoIncorreto: (cond: boolean) => void,
    apagarStates: () => void
}

export default class ButtonCadastro extends React.Component<Props>{

    // tipagem dos states
    state: {
        dados: object[]
    }
    
    // declaração do construtor e dos states 
    constructor(props: Props){
        super(props)
        this.state = {
            dados: []
        }
    }

    // função que recebe os dados do backend
    getDados(): void{
        axios.get('http://localhost:3000/get')
            .then((res)=>{
                this.setState({
                    dados: res.data
                })
        })
    }

    // quando o componente é criado, a função getDados é chamada
    componentDidMount(): void {
        this.getDados()
    }

    // verificação de nomes de usuários iguais ou emails repetidos
    usuarioInvalido(): boolean{
        let teste: boolean = false 
        this.state.dados.map(
            (dado: {usuario?: string}) => {
                if(this.props.user == dado.usuario){
                    teste = true
                }
            }
        )
        return teste
    }
    emailInvalido(): boolean{
        let teste: boolean = false
        this.state.dados.map(
            (dado: {email?: string}) => {
                if(this.props.email == dado.email){
                    teste = true
                }
            }
        )
        return teste
    }

    // faz condições para o cadastro
    conditions(): boolean{
        let count: number = 0

        // verifica se algum campo está vazio
        if(this.props.user == '' || this.props.nome == '' || this.props.sobrenome == '' || this.props.email == '' || this.props.nascimento == '' || this.props.senha == '' || this.props.confSenha == ''){
                count++
                this.props.setPreencha(true)
        }
        else{
            this.props.setPreencha(false)
        }
    
        //verifica se a confirmação da senha está igual à senha
        if(this.props.senha != this.props.confSenha){
            count++
            this.props.setSenhasDiferentes(true)
        }
        else{
            this.props.setSenhasDiferentes(false)
        }

        //verifica se o nome do usuário já existe
        if(this.usuarioInvalido()){
            count++
            this.props.setUsuarioExistente(true)
        }
        else{
            this.props.setUsuarioExistente(false)
        }

        //verifica se o email inserido já foi cadastrado
        if(this.emailInvalido()){
            count++
            this.props.setEmailExistente(true)
        }
        else{
            this.props.setEmailExistente(false)
        }

        // verifica se o formato inserido no input 'nascimento' corresponde ao exigido
        let expressaoNascimento: RegExp = /(?:19|20)(?:[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31))|(?:[13579][26]|[02468][048])-02-29)/
        if(!expressaoNascimento.test(this.props.nascimento)){
            count++
            this.props.setNascimentoIncorreto(true)
        }
        else{
            this.props.setNascimentoIncorreto(false)
        }

        // verifica se o formato inserido no input 'email' corresponde ao exigido
        let expressaoEmail: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!expressaoEmail.test(this.props.email)){
            count++
            this.props.setEmailIncorreto(true)
        }
        else{
            
            this.props.setEmailIncorreto(false)
        }

        // se todas as condições foram cumpridas, a função retorna verdadeiro
        if(count == 0){
            return true
        }
        else{
            return false
        }
        
    }

    // função do cadastro
    cadastrar(): void{
        
        // se a função conditions retornar verdadeiro, o novo usuário é cadastrado
        if(this.conditions()){
            toast.success('Usuário cadastrado com sucesso', {
                theme: 'dark',
                icon: false
            })
            axios.post('http://localhost:3000/cadastrado', {
                user: this.props.user,
                nome: this.props.nome,
                sobrenome: this.props.sobrenome,
                email: this.props.email,
                nascimento: this.props.nascimento,
                senha: this.props.senha
            })
            this.props.apagarStates()
        }
    }

    render(): React.ReactNode {
        return(
            <>
                <ToastContainer/>
                <ConfirmButton onClick={()=>this.cadastrar()} type='button'>
                    Cadastrar
                </ConfirmButton>
            </>
        )
    }
}