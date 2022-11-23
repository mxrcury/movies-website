const { Schema, model } = require('mongoose')

const usersSchema = new Schema({
    username:String,
    email:String,
    password:String,
    savedMovies:Array,
    settings:{
        locale:{type:String,default:"en-US"},
        saveLists:{type:Boolean,default:true},
    }
},{collection:'users'})

module.exports = model('User',usersSchema) 