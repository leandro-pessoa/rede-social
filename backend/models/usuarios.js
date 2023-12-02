// imports
const db = require('../db')
const mongoose = require('mongoose')

// criação do schema
const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    nascimento: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    }
})

//definição do model
mongoose.model('usuarios', usuarioSchema)
const usuario = mongoose.model('usuarios')

//teste
/*
new usuario({
    nome: 'Leandro',
    sobrenome: 'Pessoa',
    usuario: 'LeandroPSR',
    nascimento: 2004-02-27,
    email: 'leandro@gmail.com',
    senha: '12345'
}).save()
*/

// exportação do model
module.exports = usuario