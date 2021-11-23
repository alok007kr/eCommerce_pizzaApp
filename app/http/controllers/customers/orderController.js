const Order = require('../../../models/order')

const moment = require('moment')

function orderController () {
    return {
        store(req,res) {

            // VALIDATE REQUEST
            const {phone,address} = req.body

            if(!phone || !address) {
                req.flash('error', 'All fields are required.')
                return res.redirect('/cart')

            }

            const order = new Order({
                // we can get user id by help of passport by req.user._id
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })
            order.save().then(result => {
                req.flash('success', 'Order placed successfully')
                delete req.session.cart
                return res.redirect('/customer/orders')

            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })


        },
        async index(req,res) {
            const orders = await Order.find({customerId: req.user._id},null, {sort: {'createdAt':-1 }})
            res.render('customer/orders', {orders: orders, moment:moment })
            console.log(orders)
        }
    }


}

module.exports = orderController