// imports dos módulos
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { Provider } from 'react-redux'
import { useAppSelector } from './app/hooks'
import { ThemeProvider } from 'styled-components'

// imports dos componentes
import Login from './componentes/login/Login'
import Cadastro from './componentes/cadastro/Cadastro'
import MainPage from './MainPage'
import Esqueci from './componentes/novaSenha/Esqueci'
import { GlobalStyles } from './estilos/Estilos-gerais'

// imports dos temas 
import { darkTheme } from './estilos/theme'
import { lightTheme } from './estilos/theme'

// import da store
import { store } from './features/store'

export default function App(){

  const theme = useAppSelector(state => state.theme.theme)
  const selectedTheme = theme === 'light' ? darkTheme : lightTheme

  return(
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/cadastro' element={ <Cadastro/> }/>
          <Route path='/' element={ <MainPage/> }/>
          <Route path='/esqueci_minha_senha' element={ <Esqueci/> }/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
