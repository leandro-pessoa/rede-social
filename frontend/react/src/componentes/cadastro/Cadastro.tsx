// imports de módulos
import React, { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'

// imports dos estilos
import { Body, Main, Div, DivImg, Section, FormInputs, H1, CadastroInput, Field } from '../../estilos/Cadastro-style'
import { Input, Invalido, HrMaior, ConfirmButton } from '../../estilos/Estilos-gerais'
import '../../App.css'

//imports dos ícones
import { CiUser }  from 'react-icons/ci'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { CiMail } from 'react-icons/ci'
import { CiCalendarDate } from 'react-icons/ci'
import { CiLock } from 'react-icons/ci'

// imports de outros documentos
import PasswordVisibility from '../geral/PasswordVisibility'
import ButtonCadastro from './ButtonCadastro'

//tipagem dos props
interface Props{

}

export default class Cadastro extends React.Component<Props>{
  //tipagem dos states
  state: {
    user: string,
    nome: string,
    sobrenome: string,
    email: string,
    nascimento: string,
    senha: string,
    confSenha: string,
    typeSenha: boolean,
    preencha: boolean,
    senhasDiferentes: boolean,
    usuarioExistente: boolean,
    emailExistente: boolean,
    emailIncorreto: boolean,
    nascimentoIncorreto: boolean
  }

  //declaração do construtor e dos states
  constructor(props: Props){
    super(props)
    this.state = {
      user: '',
      nome: '',
      sobrenome: '',
      email: '',
      nascimento: '',
      senha: '',
      confSenha: '',
      typeSenha: false,
      preencha: false,
      senhasDiferentes: false,
      usuarioExistente: false,
      emailExistente: false,
      emailIncorreto: false,
      nascimentoIncorreto: false
    }
  }

  // funções alteradora de states
  setValores(e: ChangeEvent<HTMLInputElement>): void{
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  setTypeSenha(): void{
    this.setState({typeSenha: !this.state.typeSenha})
  }

  //parte destinada às mensagens de erro que aparecem embaixo dos inputs
  setPreencha(cond: boolean): void{
    this.setState({preencha: cond ? true : false})
  }
  setSenhasDiferentes(cond: boolean): void{
    this.setState({senhasDiferentes: cond ? true : false})
  }
  setUsuarioExistente(cond: boolean): void{
    this.setState({usuarioExistente: cond ? true : false})
  }
  setEmailExistente(cond: boolean): void{
    this.setState({emailExistente: cond ? true : false})
  }
  setEmailIncorreto(cond: boolean): void{
    this.setState({emailIncorreto: cond ? true : false})
  }
  setNascimentoIncorreto(cond: boolean): void{
    this.setState({nascimentoIncorreto: cond ? true : false})
  }

  // função que tem a função de limpar os states, deixando-os vazios
  apagarStates(): void{
    this.setState({
      user: '',
      nome: '',
      sobrenome: '',
      email: '',
      nascimento: '',
      senha: '',
      confSenha: ''
    })
  }

  //renderização
  render(): React.ReactNode {
    return(
      <Body>
        <Main>
          <Section>
            <H1>Cadastro</H1>
          </Section>
          <HrMaior/>
          <FormInputs method='POST'>
            <Field>
              <DivImg>
                <CiUser
                  size={28}
                  color='#68B8B7'
                />
              </DivImg>
              <Div>
                <Input
                  type='text'
                  placeholder='Usuário'
                  name='user'
                  value={this.state.user}
                  onChange={(e)=>this.setValores(e)}
                  autoComplete='off'
                  autoFocus
                />
                <br/>
                <Invalido style={{display: this.state.usuarioExistente ? 'block' : 'none'}}>
                  Usuário já existente
                </Invalido>
              </Div>
            </Field>
            <Field>
              <DivImg>
                <CiMoneyCheck1
                  size={28}
                  color='#68B8B7'
                />
              </DivImg>
              <Div>
                <Input
                  placeholder='Nome'
                  name='nome'
                  style={{marginRight: '20px'}}
                  value={this.state.nome}
                  onChange={(e)=>this.setValores(e)}
                  autoComplete='off'
                />
                <Input
                  placeholder='Sobrenome'
                  name='sobrenome'
                  value={this.state.sobrenome}
                  onChange={(e)=>this.setValores(e)}
                  autoComplete='off'
                />
              </Div>
            </Field>
            <Field>
              <DivImg>
                <CiMail
                  size={28}
                  color='#68B8B7'
                />
              </DivImg>
              <Div>
                <Input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={this.state.email}
                  onChange={(e)=>this.setValores(e)}
                  autoComplete='off'
                />
                <br/>
                <Invalido style={{display: this.state.emailExistente ? 'block' : 'none'}}>
                  Email já existente
                </Invalido>
                <Invalido style={{display: this.state.emailIncorreto ? 'block' : 'none'}}>
                  Formato incorreto
                </Invalido>
              </Div>
            </Field>
            <Field>
              <DivImg>
                <CiCalendarDate
                  size={28}
                  color='#68B8B7'
                />
              </DivImg>
              <Div>
                <Input
                  type='text'
                  placeholder='Data de nascimento'
                  name='nascimento'
                  value={this.state.nascimento}
                  onChange={(e)=>this.setValores(e)}
                  autoComplete='off'
                />
                <br/>
                <Invalido style={{display: this.state.nascimentoIncorreto ? 'block' : 'none'}}>
                  Formato incorreto
                </Invalido>
              </Div>
              <Div
                style={{display: 'flex', alignItems: 'center'}}
              >
                AAAA-MM-DD
              </Div>
            </Field>
            <Field>
              <DivImg>
                <CiLock
                  size={28}
                  color='#68B8B7'
                />
              </DivImg>
              <Div>
                <Input
                  type={this.state.typeSenha ? 'text' : 'password'}
                  placeholder='Senha'
                  name='senha'
                  style={{marginRight: '20px'}}
                  value={this.state.senha}
                  onChange={(e)=>this.setValores(e)}
                  autoComplete='off'
                />
                <Input
                  type={this.state.typeSenha ? 'text' : 'password'}
                  placeholder='Confirmar senha'
                  name='confSenha'
                  style={{width: '33%'}}
                  value={this.state.confSenha}
                  onChange={(e)=>this.setValores(e)}
                  autoComplete='off'
                />
                <PasswordVisibility
                  passVisibility={this.state.typeSenha}
                  setPassVisibility={()=>this.setTypeSenha()}
                />
                <br/>
                <Invalido style={{display: this.state.senhasDiferentes ? 'block' : 'none'}}>
                  As senhas estão diferentes
                </Invalido>
              </Div>
            </Field>
            <Field style={{display: this.state.preencha ? 'block' : 'none'}}>
              <Invalido>
                Preencha todos os campos
              </Invalido>
            </Field>
            <Field>
              <ButtonCadastro 
                user={this.state.user}
                nome={this.state.nome}
                sobrenome={this.state.sobrenome}
                email={this.state.email}
                nascimento={this.state.nascimento}
                senha={this.state.senha}
                confSenha={this.state.confSenha}
                setPreencha={(e)=>this.setPreencha(e)}
                setSenhasDiferentes={(e)=>this.setSenhasDiferentes(e)}
                setUsuarioExistente={(e)=>this.setUsuarioExistente(e)}
                setEmailExistente={(e)=>this.setEmailExistente(e)}
                setEmailIncorreto={(e)=>this.setEmailIncorreto(e)}
                setNascimentoIncorreto={(e)=>this.setNascimentoIncorreto(e)}
                apagarStates={()=>this.apagarStates()}
              />
              <Link to='/login'>
                <ConfirmButton>
                  Voltar
                </ConfirmButton>
              </Link>
            </Field>
          </FormInputs>
        </Main>
      </Body>
    )
  }
}