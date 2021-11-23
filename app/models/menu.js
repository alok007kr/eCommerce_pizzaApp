// Here we will make plural name of the file eg. OUR FILE NAME IS MENU.js So, WE CREATE menus table.
const mongoose = require('mongoose')

//Variable starting with capital letter is either constructor or class. we will call this in another way.
 const Schema = mongoose.Schema



const menuSchema =  new Schema({
     
     name:{ type: String, required: true},
     image:{ type: String, required: true},
     price:{ type: Number, required: true},
     size:{ type: String, required: true}
 })




// const Menu = mongoose.model('Menu',menuSchema)
// module.exports = Menu
 module.exports = mongoose.model('Menu',menuSchema)
