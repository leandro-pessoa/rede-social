// imports de módulos e imagens
import React, { ChangeEvent } from 'react'
import  { CiLock } from 'react-icons/ci'
import { CiUser } from 'react-icons/ci'

// imports dos estilos
import { Main, Body, DivTitulo, H1, PTxt, Div,  DivContent, Label, LoginButton, StyledLink} from '../../estilos/Login-style'
import { Input, Invalido } from '../../estilos/Estilos-gerais'
import '../../App.css'

//imports de outros documentos
import PasswordVisibility from '../geral/PasswordVisibility'
import LoginFunc from './LoginFunc'

//tipagem dos props
interface Props{

}

export default class Login extends React.Component<Props>{
  //tipagem dos states
  state: {
    user: string,
    pass: string,
    passVisibility: boolean
    usuarioInvalido: boolean,
    senhaIncorreta: boolean
  }

  //declaração do construtor e dos states
  constructor(props: Props){
    super(props)
    this.state = {
      user: '',
      pass: '',
      passVisibility: false,
      usuarioInvalido: false,
      senhaIncorreta: false
    }
  }

  //setagem dos states
  setValores(e: ChangeEvent<HTMLInputElement>): void{
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  setPassVisibility(): void{
    this.setState({passVisibility: !this.state.passVisibility})
  }

  setUsuarioInvalido(cond: boolean): void{
    this.setState({usuarioInvalido: cond ? true : false})
  }
  setSenhaIncorreta(cond: boolean): void{
    this.setState({senhaIncorreta: cond ? true : false})
  }


  render(): React.ReactNode {
    return(
      <Body>
        <Main>
          <DivTitulo>
            <H1>Login</H1>
            <PTxt>
              Insira seus dados para acessar o seu perfil
            </PTxt>
          </DivTitulo>
          <DivContent>
            <Div>
              <Label htmlFor='user'>
                <CiUser
                  size={28}
                  color='#41A7BD'
                />
              </Label>
              <Input 
                id='user'
                name='user'
                placeholder='Usuário ou E-mail'
                value={this.state.user}
                onChange={(e)=>this.setValores(e)}
                autoComplete='off'
              />
              <br/>
              <Invalido style={{display: this.state.usuarioInvalido ? 'block' : 'none', marginLeft: '35px'}}>
                Usuário ou Email inexistente
              </Invalido>
            </Div>
            <Div>
              <Label htmlFor='pass'>
                <CiLock
                  size={28}
                  color='#41A7BD'
                />
              </Label>
              <Input 
                id='pass'
                name='pass'
                placeholder='Senha'
                value={this.state.pass}
                onChange={(e)=>this.setValores(e)}
                type={this.state.passVisibility ? 'text' : 'password'}
                style={{
                  width: '62%'
                }}
              />
              <PasswordVisibility 
                passVisibility={this.state.passVisibility}
                setPassVisibility={()=>this.setPassVisibility()}
              />
              <br/>
              <Invalido style={{display: this.state.senhaIncorreta ? 'block' : 'none', marginLeft: '35px'}}>
                Senha incorreta
              </Invalido>
            </Div>
            <Div style={{marginTop: '6px'}}>
              <LoginFunc
                usuario={this.state.user}
                senha={this.state.pass}
                setUsuarioInvalido={(e)=>this.setUsuarioInvalido(e)}
                setSenhaIncorreta={(e)=>this.setSenhaIncorreta(e)}
              />
            </Div>
            <hr
              style={{margin: '10px 0px'}}
              color='#5dc5c5'
            />
            <Div style={{textAlign: 'center', margin: '10px'}}>
              <StyledLink to='/esqueci_minha_senha'>
                Esqueci minha senha
              </StyledLink>
            </Div>
            <Div style={{textAlign: 'center'}}>
              <StyledLink to='/cadastro' className='login'>Novo usuário</StyledLink>
            </Div>
          </DivContent>
        </Main>
      </Body>
    )
  }
}