// import dos módulos
import React, { ChangeEvent } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

// import dos componentes estilizados
import { SectionEsqueci, Main, P, Div, DivInputs, DivConfirm, H2, Span } from '../../estilos/Esqueci-style'
import { Input, HrMaior, ConfirmButton, StyledLink, Invalido } from '../../estilos/Estilos-gerais'

// import da função getDados
import getUsers from '../../func/getUsers'

// import de outro componente
import PasswordVisibility from '../geral/PasswordVisibility'

// tipagem dos props
interface Props {

}

export default class Esqueci extends React.Component<Props>{
    // tipagem dos states
    state: {
        usuario: string
        nome: string,
        sobrenome: string,
        email: string,
        ano: string,
        modoEdit: boolean,
        novaSenha: string,
        confSenha: string,
        preencha1: boolean,
        preencha2: boolean,
        diferentes: boolean,
        anoInvalido: boolean,
        passVis: boolean
    }

    // declaração do construtor e dos states
    constructor(props: Props){
        super(props)
        this.state = {
            usuario: '',
            nome: '',
            sobrenome: '',
            email: '',
            ano: '',
            modoEdit: false,
            novaSenha: '',
            confSenha: '',
            preencha1: false,
            preencha2: false,
            diferentes: false,
            anoInvalido: false,
            passVis: false
        }
        
    }

    // apaga os inputs
    apagarStates(): void{
        this.setState({
            usuario: '',
            nome: '',
            sobrenome: '',
            email: '',
            ano: ''
        })
    }

    // altera a visibilidade da senha
    setPassVis(): void{
        this.setState({passVis: !this.state.passVis})
    }

    // função de setagem dos states
    setValores(e: ChangeEvent<HTMLInputElement>): void{
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    // faz a verificação dos dados inseridos
    // se estiverem corretos, a parte de alterar a senha aparece
    confirm(): void{

        // variáveis utilizadas nas condições
        let count: number = 0
        let expressaoNascimento: RegExp = /(?:19|20)(?:[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31))|(?:[13579][26]|[02468][048])-02-29)/

        // verifica se há algum campo vazio
        if(this.state.nome == '' || this.state.sobrenome == '' || this.state.usuario == '' || this.state.email == '' || this.state.ano == ''){
            this.setState({preencha1: true})
            count++
        }
        else{
            this.setState({preencha1: false})
        }

        // verifica se a expressão regular está correta 
        if(!expressaoNascimento.test(this.state.ano)){
            count++
            this.setState({anoInvalido: true})
        }
        else{
            count = 0
            this.setState({anoInvalido: false})
        }

        // caso esteja tudo correto, o mode de edição de senha será ativado
        if(count == 0){
            getUsers().map(
                (dado: {nome?: string, sobrenome?: string, usuario?: string, email?: string, nascimento?: string}) => {
                    if(this.state.nome == dado.nome && this.state.sobrenome == dado.sobrenome && this.state.usuario == dado.usuario && this.state.email == dado.email && this.state.ano + 'T00:00:00.000Z' == dado.nascimento){
                        this.setState({modoEdit: true})
                    }
                }
            )
        }
    }

    // faz o cadastro da nova senha
    cadastrar(): void{

        // variável utilizada nas condições
        let count: number = 0

        // verifica se há algum campo vazio
        if(this.state.novaSenha == '' || this.state.confSenha == ''){
            count++
            this.setState({preencha2: true})
        }
        else{
            this.setState({preencha2: false})
        }

        // verifica se a senha está idêntica à sua confirmação
        if(this.state.novaSenha != this.state.confSenha){
            count++
            this.setState({diferentes: true})
        }
        else{
            count = 0
            this.setState({diferentes: false})
        }
        
        // caso tudo esteja correto, faz o envio da nova senha para o backend
        // também retorna um feedback ao usuário
        if(count == 0){
            count = 0
            axios.put('http://localhost:3000/nova-senha', {
                user: this.state.usuario,
                senha: this.state.novaSenha
            })
            this.apagarStates()
            this.setState({modoEdit: false})
            toast.success('Senha alterada com sucesso', {
                theme: 'dark',
                icon: false
            })
        }
    }

    // função que retorna uma mensagem de erro personalizável
    renderErro(cond: boolean, txt: string): JSX.Element | undefined{
        if(cond){
            return (
                <Invalido>
                    {txt}
                </Invalido>
            )
        }
    }

    // renderiza o modo (de confirmação de usuário ou de edição de senha)
    renderModo(): JSX.Element{
        if(this.state.modoEdit){
            return (
                <>
                    <P>
                        Cadastre a sua nova senha
                    </P>
                    <DivInputs>
                        <Div>
                            <Input
                                placeholder='Nova senha'
                                name='novaSenha'
                                value={this.state.novaSenha}
                                onChange={(e)=>this.setValores(e)}
                                type={this.state.passVis ? 'text' : 'password'}
                            />
                        </Div>
                        <Div>
                            <Input
                                placeholder='Confirmar senha'
                                name='confSenha'
                                value={this.state.confSenha}
                                onChange={(e)=>this.setValores(e)}
                                type={this.state.passVis ? 'text' : 'password'}
                            />
                            <Span>
                                <PasswordVisibility
                                    passVisibility={this.state.passVis}
                                    setPassVisibility={()=>this.setPassVis()}
                                />
                            </Span>
                        </Div>
                        <Div>
                            {this.renderErro(this.state.preencha2, 'Preencha todos os campos')}
                            {this.renderErro(this.state.diferentes, 'As senhas estão diferentes')}
                        </Div>
                        <Div style={{gridColumn: '1 / 2'}}>
                            <ConfirmButton onClick={()=>this.cadastrar()}>
                                Confirmar
                            </ConfirmButton>
                            <ConfirmButton onClick={()=>this.setState({modoEdit: false})}>
                                Cancelar
                            </ConfirmButton>
                        </Div>
                    </DivInputs>
                </>
            )
        }
        else{
            return (
                <>
                    <P>Insira seus dados para alterar a senha</P>
                    <DivInputs>
                        <Div>
                            <Input
                                placeholder='Usuário'
                                name='usuario'
                                value={this.state.usuario}
                                onChange={(e)=>this.setValores(e)}
                                autoComplete='off'
                            />
                        </Div>
                        <Div>
                            <Input 
                                placeholder='Nome'
                                name='nome'
                                value={this.state.nome}
                                onChange={(e)=>this.setValores(e)}
                                autoComplete='off'
                            />
                        </Div>
                        <Div>
                            <Input
                                placeholder='Sobrenome'
                                name='sobrenome'
                                value={this.state.sobrenome}
                                onChange={(e)=>this.setValores(e)}
                                autoComplete='off'
                            />
                        </Div>
                        <Div>
                            <Input
                                placeholder='Email'
                                name='email'
                                value={this.state.email}
                                onChange={(e)=>this.setValores(e)}
                                autoComplete='off'
                                
                            />
                        </Div>
                        <Div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Input
                                placeholder='Ano de nascimento'
                                name='ano'
                                value={this.state.ano}
                                onChange={(e)=>this.setValores(e)}
                                autoComplete='off'
                            />
                            {this.renderErro(this.state.anoInvalido, 'Formato inválido')}
                        </Div>
                        <Div>
                            <P>| AAAA-MM-DD</P>
                        </Div>
                        <Div style={{gridColumn: '1 / 2'}}>
                            {this.renderErro(this.state.preencha1, 'Preencha todos os campos')}
                        </Div>
                        <Div style={{gridColumn: '1 / 2'}}>
                            <ConfirmButton onClick={()=>this.confirm()}>
                                Confirmar
                            </ConfirmButton>
                            <StyledLink to='/login'>
                                <ConfirmButton>
                                    Voltar
                                </ConfirmButton>
                            </StyledLink>
                        </Div>
                    </DivInputs>
                </>
            )
        }
    }

    render(): React.ReactNode {
        return(
            <SectionEsqueci>
                <ToastContainer/>
                <Main>
                    <H2>Esqueci minha senha</H2>
                    <HrMaior/>
                    {this.renderModo()}
                </Main>
            </SectionEsqueci>
        )
    }
}

