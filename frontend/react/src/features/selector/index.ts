// import do módulo
import { useAppSelector } from "../../app/hooks"

// tipagem do state
interface State {
    color: {
        theme: string
    }
}

export default function Color(){
    const color = useAppSelector((state: State) => state.color.theme)
    return color
}

// export do state selecionado
// export const color = useAppSelector((state: State) => state.color.color)

