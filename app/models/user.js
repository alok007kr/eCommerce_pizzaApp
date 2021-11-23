// Here we will make plural name of the file eg. OUR FILE NAME IS MENU.js So, WE CREATE menus table.
const mongoose = require('mongoose')

//Variable starting with capital letter is either constructor or class. we will call this in another way.
 const Schema = mongoose.Schema



const userSchema =  new Schema({
     
     name:{ type: String, required: true},
     email:{ type: String, required: true, unique: true },
     password:{ type: String, required: true},
     role:{ type: String, default: 'customer'}
 }, {timestamps: true })




// const Menu = mongoose.model('Menu',menuSchema)
// module.exports = Menu
 module.exports = mongoose.model('User',userSchema)