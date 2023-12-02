// imports
const db = require('../db')
const mongoose = require('mongoose')

// criação do schema
const PostSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    titulo: {
        type: String,
        require: true
    },
    msg: {
        type: String,
        require: true
    },
    data: {
        type: String,
        require: true
    },
    hora: {
        type: String,
        require: true
    },
    editado: {
        type: Boolean,
        require: true
    },
    likes: {
        type: Array,
        require: false
    }
})

// definição do model
mongoose.model('posts', PostSchema)
const post = mongoose.model('posts')

// exportação do model
module.exports = post

