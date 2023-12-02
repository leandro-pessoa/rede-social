// imports dos módulos
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

// import da action criada
import { toggleTheme } from '../../features/reducers'

// import dos componentes estilizados
import { MaterialUISwitch } from '../../estilos/ToggleBackground-style'

export default function ToggleBackground() {

    // declaração do dispatch e do state global
    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.theme.theme)

    return (
        <>
            <MaterialUISwitch
                onChange={()=>dispatch(toggleTheme())}
                checked={theme === 'dark' ? '' : 'checked'}
            />
        </>
    )
}


