const Order = require('../../../models/order')

const order = require('../../../models/order')

function orderController() {
    return {
        index(req,res) {
            order.find({status: {$ne:'completed'}}, null, {sort: {'createdAT': -1}}).
            populate('phone','-password').exec((err,orders) => {
                if(req.xhr) {
                    return res.json(orders)
                }
                else {
                 return res.render('admin/orders')
                }

            })

        }
    }
}

module.exports = orderController