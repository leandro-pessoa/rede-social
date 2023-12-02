// import do módulo
import axios from "axios"

// declaração da variável
let values: object[] = []

// função que pega os dados do backend e os coloca na variável
const getUsers = (): object[] => {
    axios.get('http://localhost:3000/get')
        .then((res)=>{
            values = res.data
        })
        .catch((err)=>{
            console.log('!!!ERRO: ' + err)
        })
    return values
}

// export da função
export default getUsers