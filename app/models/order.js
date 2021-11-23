const mongoose = require('mongoose')

//Variable starting with capital letter is either constructor or class. we will call this in another way.
 const Schema = mongoose.Schema



const orderSchema =  new Schema({
    
    customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User',
                required: true
                },
    items: {type: Object, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    paymentType: {type: String, default: 'COD'},
    status: {type: String, default: 'order_placed'},


 }, {timestamps: true })




// const Menu = mongoose.model('Menu',menuSchema)
// module.exports = Menu
 module.exports = mongoose.model('Order', orderSchema)