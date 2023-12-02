// imports de módulos
import React from 'react'

//import do estilo
import { Heade, SectionTittle, DivLinks, SectionUser, DivUser, DivMenu, H2, StyledLink, StyledLink2, Div, User } from '../../estilos/HeaderStyle'

// import do ícone
import { CiLogout } from 'react-icons/ci'

// import de outro componente
import ToggleBackground from './ToggleBackground'


// tipagem dos props
interface Props{
  
}

export default class Header extends React.Component<Props>{
  // tipagem dos states
  state: {
    user: object | string,
    divMenuDisplay: boolean
  }

  // declaração do construtor e dos states
  constructor(props: Props){
    super(props)

    this.state = {
      user: '',
      divMenuDisplay: false
    }
  }

  // alterna a visibilidade do menu do usuário
  setDivMenu(modo: number): void{
    if(modo == 1){
      this.setState({
        divMenuDisplay: !this.state.divMenuDisplay
      })
    }
    else{
      this.setState({
        divMenuDisplay: false
      })
    }
  }

  // pega o usuario logado do sessionStorage e o coloca no state user
  getUsuarioLogado(): void{
    if(sessionStorage.getItem('usuario_logado')){
      this.setState({
        user: JSON.parse(String(sessionStorage.getItem('usuario_logado')))[0]
      })
    }
  }

  // quando o compnente é montado, a função getUsuarioLogado é executada
  componentDidMount(): void {
    this.getUsuarioLogado()
  }

  // retira o usuario_logado do sessionStorage
  logout(): void{
    sessionStorage.removeItem('usuario_logado')
  }

  // serve para a renderização do canto direito
  // caso não exista usuário logado, aparecerão os links
  // caso contrário, aparecerá o usuário e o email dele
  renderUsuario(): JSX.Element{
    const user: any = this.state.user
    if(user == '' || user == undefined || user == null){
      return (
        <DivLinks>
          <StyledLink to='/login'>Entrar</StyledLink>
          <StyledLink to='/cadastro'>Cadastrar</StyledLink>
        </DivLinks>
      )
    }
    else{
      return (
        <SectionUser
          onClick={()=>this.setDivMenu(1)}
        >
          <DivUser
            style={{color: '#80C3B2'}}
          > 
            {user.usuario}
          </DivUser>
          <DivUser 
            style={{
              fontSize: '0.8em',
              marginTop: '3px'
            }}
          >
            {user.email}
          </DivUser>
          <DivMenu
            divMenu={this.state.divMenuDisplay ? 'block' : 'none'}
          >
            <StyledLink2 to='/login' onClick={()=>this.logout()}>
                <Div>
                  <CiLogout
                    size={21}
                    color='#41A7BD'
                    style={{marginRight: '5px', transform: 'translate(0px, 0px)'}}
                  />
                  Logout
                </Div>
            </StyledLink2>
          </DivMenu>
        </SectionUser>
      )
    }
  }

  render(): React.ReactNode {
    return(
      <Heade>
        <SectionTittle
          style={{
            display: 'flex'
          }}
        >
          <H2>Rede social</H2>
        </SectionTittle>
          <User>
            <ToggleBackground/>
            {this.renderUsuario()}
          </User>
      </Heade>
    )
  }
}


