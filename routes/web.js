// HERE we will rerquire homecontroller function.
const homeController = require('../app/http/controllers/homeController')

const authController = require('../app/http/controllers/authController')

const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')

const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')


const AdminOrderController = require('../app/http/controllers/admin/orderController')

function initRoute(app) {


// AFTER IMPORTING homeController function our function changes into
//     THIS
//    app.get('/', (req,res) => {
//        res.render('home')      
//    })
//       TO
    app.get('/', homeController().index)
        
    app.get('/cart', cartController().cart)
    app.post('/update-cart', cartController().update)
        
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)

    // Logout Route
    app.get('/logout',admin, authController().logout)
    app.post('/logout', authController().logout)
        
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)

// for order 
//    app.post('/orders', orderController().store)

    // CUSTOMER ROUTES
    // for order 
    app.post('/orders',auth, orderController().store)
    app.get('/customer/orders',auth, orderController().index)

    // Admin routes
    app.get('/admin/orders',admin, AdminOrderController().index)
    // admin/order/status
    



}

// This is our page or module so we export from here and import in server.js page
module.exports = initRoute