const { model, Schema } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        require:true,
        trim:true
    },
    email: {
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password: {
        type:String,
        require:true
    },
    role: Number,
    active: Boolean
},{
    timestamps: true // created_at, updated_at
})

module.exports = model("user", userSchema)// va a test-> user


// { Otra forma de hacerlo, con required y que Mongo se encargue de validar
//     name: {
//         type:String,
//         require:true,
//         trim:true
//     },
//     email: {
//         type:String,
//         require:true,
//         unique:true
//     },
//     password: {
//         type:String,
//         require:true
//     },
//     role: String,
//     active: Boolean
// }
// {
//     "id_dni":90000000,
//     "name":"Complexa-Reader",
//     "email":"complexa_reader@gmail.com",
//     "password":"complexa",
//     "role":"reader" ,
//     "area":"administracion"
// }
// {
//     "name":"Complexa-Editor", o Admin??
//     "email":"complexa_editor@gmail.com",
//     "password":"complexa",
//     "role":"editor" 
// }
// {
//     "name":"Complexa-Owner",
//     "email":"complexa_owner@gmail.com",
//     "password":"complexa",
//     "role":"owner" 
// }


//Antes q se me cerrara la base de datos, usaba estas credenciales:
// {
//     "name":"Ruben",
//     "email":"ruben@gmail.com",
//     "password":"mateo",
//     "role":"admin" 
// }