
const Menu = require('../../models/menu')


function homeController(){


//We have created this to write the logic of Homepage.And the same way we will write the logic in resrective 
//- Controller page
// We will take use of factory function.
//Factory function is a function which returns the object. So, we will return the object from return() function

    return{

//        index : function () {
//        }
// The above function can be written as below function.

// we can make from async await also..
//        index(req,res){
//            Menu.find().then(function(pizzas){
//                console.log(pizzas)
//                res.render('home', {pizzas: pizzas})

//            })
//

//        at starting inside the index function..   res.render('home')

// Another method to match database with our page.
         async index(req,res) {
             const pizzas =  await Menu.find()
//             console.log(pizzas) // we use to display on terminal.But later on we comment the console
             return res.render('home', {pizzas: pizzas})
         }        


        }

    }



//}

// We will export the module(local or own made.)
module.exports = homeController

// NOTE: At first we will create the function here and we have another function in web.js
// which contain home routes created by the function and the function contain req,res
// but now we will import the homeController function in web.js and we can get the (req,res) in index function here.

//E.g   app.get('/', (req,res) => {
//        res.render('home')      
//      })
// We have the function in  web.js and this function contain '/' 1 string and a Function which have two parameters.
// (req,res) but Now we will create a homeController function.
//  function homeController(){
//  return{
//index(){
//res.render('home)
//}
//}
//}

// AFTER CREATING THE FUNCTION we will import the homeController function in web.js file 
// const homeController = require('../app/http/controllers/homeController)

// AND WE WILL CHANGE THE FUNCTION AS     app.get('/',homecontroller().index)
//AND NOW WE CAN GET index(req,res){
//                    res.render('home')    
//}