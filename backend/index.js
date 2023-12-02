// imports dos módulos
const express = require('express')
const cors = require('cors')
const app = express()

// imports dos models 
const usuario = require('./models/usuarios')
const post = require('./models/posts')

// configurções gerais
app.use(cors())
app.use(express.json())

// rota que recebe os dados do frontend e salva no banco de dados
app.post('/cadastrado', async (req, res)=>{
    const { user } = req.body
    const { nome } = req.body
    const { sobrenome } = req.body
    const { nascimento } = req.body
    const { email } = req.body
    const { senha } = req.body
    new usuario({
        nome: nome,
        sobrenome: sobrenome,
        usuario: user,
        nascimento: nascimento,
        email: email,
        senha: senha
    }).save()
        .then(()=>{
            console.log('Usuário cadastrado com sucesso!')
            res.redirect('/login')
        })
        .catch((err)=>{
            console.log('!!!ERRO: ' + err)
        })
})

app.post('/enviar-post', async (req, res)=>{
    const { id } = req.body
    const { usuario } = req.body
    const { email } = req.body
    const { titulo } = req.body
    const { msg } = req.body
    const { data } = req.body
    const { hora } = req.body
    const { editado } = req.body
    new post({
        id: id,
        usuario: usuario,
        email: email,
        titulo: titulo,
        msg: msg,
        data: data,
        hora: hora,
        editado: editado
    }).save()
        .then(()=>{
            console.log('Post enviado!')
        })
        .catch((err)=>{
            console.log('!!!ERRO: ' + err)
        })
})

// rota que pega os dados dos usuários do banco de dados
app.get('/get', async (req, res)=>{
    const dados = await usuario.find({})
    res.send(dados)
})

// pega os posts do banco de dados
app.get('/get-post', async (req,res)=>{
    const dados = await post.find({})
    res.send(dados)
})

// apaga o post selecionado
app.post('/apagar', async (req, res)=>{
    const { id } = req.body
    post.deleteOne({
        id: id
    })
        .then(()=>{
            console.log('Post apagado.')
        })
        .catch((err)=>{
            console.log('!!!ERRO: ' + err)
        })
})

app.put('/edit', async (req, res)=>{
    const { id } = req.body
    const { titulo } = req.body
    const { msg } = req.body
    const { editado } = req.body
    post.updateOne({
        id: id
    },
    {
        titulo: titulo,
        msg: msg,
        editado: editado
    })
        .then(()=>{
            console.log('Post editado!')
        })
        .catch((err)=>{
            console.log('!!!ERRO: ' + err)
        })
})

app.put('/like-deslike', (req, res)=>{
    const { id } = req.body
    const { likes } = req.body
    post.updateOne({
        id: id
    },
    {
        likes: likes
    })
        .then(()=>{
            console.log('Like / Deslike!')
        })
        .catch((err)=>{
            console.log('!!!ERRO: ' + err)
        })

})

app.put('/nova-senha', (req, res)=>{
    const { senha } = req.body
    const { user } = req.body
    usuario.updateOne({
        usuario: user
    },
    {
        senha: senha
    })
        .then(()=>{
            console.log('Senha Alterada!')
        })
        .catch((err)=>{
            console.log('!!!ERRO: ' + err)
        })
})

// outros
const porta = process.env.PORT || 3000
app.listen(porta, ()=>{console.log('Servidor rodando na porta ' + porta)})