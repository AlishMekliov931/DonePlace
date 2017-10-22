const Product = require('mongoose').model('Product')
const User = require('mongoose').model('User')
const Order = require('mongoose').model('Order')

module.exports = {
    createGet: (req, res) => {
        res.render('product/add');      
    },
    createPost: (req, res) => {
        let inputData = req.body
        if (inputData.toppings) {
           inputData.toppings = inputData.toppings.split(',') 
        } else{
            inputData.toppings = []
        }
        Product.create({
            category: inputData.category,
            size: +inputData.size,
            imageUrl: inputData.imageUrl,
            toppings: inputData.toppings
        }).then(() => {
            res.locals.successMessage = 'Product created.';
            res.render('product/add');
        }).catch((e) => {
            console.log(e);
            res.locals.globalError = e;
            res.render('product/add');
        })
    },
    orderGet: (req, res) => {
        let productId = req.params.id
        Product.findById(productId).then(product => {
            res.render('product/order', product)
        }).catch(console.log)
    },
    orderPost: (req, res) => {
        let productId = req.params.id
        let userId = req.user.id
        let inputData = req.body
        let toppings = []       
        for (let key in inputData) {
           toppings.push(key)
        }
        
        Order.create({
            creator: userId,
            product: productId,
            date: Date.now(),
            toppings: toppings
        }).then((order) => {
            Order.findById(order).populate('product').then(order => {
                let pStat = setPstatus(order.status)
                res.render('product/details', {order, pStat})
            }).catch(console.log)          
        }).catch(console.log)
    },
    orderStatusGet: (req, res) => {
        let userID = req.user.id
        if (req.user.isAdmin){
            let orderStatus = ['Pending', 'In Progress', 'In Transit', 'Delivered']
            Order.find({}).populate('product').then(orders => {
                for (let o of orders) {
                   o.statusOption = orderStatus.filter(s => s != o.status)
                }
                res.render('product/orderStatusAdmin', {orders})
            }).catch(console.log)
        }else{
            Order.find({creator: userID}).populate('product').then(orders => {
                res.render('product/orderStatus', {orders})
            }).catch(console.log)
        }     
    },
    orderStatusPost: async (req, res) => {
        let ordersId = []
        let statuses = []
        try {
            for (let order in req.body) {
                await Order.findByIdAndUpdate(order, {status: req.body[order]})
             } 
        } catch (error) {
            console.log(err)
        }
        
        res.redirect('back')
    },
     details: (req, res) => {
        let orderId = req.params.id
        Order.findById(orderId).populate('product').then(order => {
           let pStat = setPstatus(order.status)
            res.render('product/details', {
                order,
                pStat
            })
        }).catch(console.log)
    },
    delete: (req, res) => {
        Product.findByIdAndRemove(req.params.id).then(product => { 
            Order.find({product: product.id}).remove().then(() => {
                res.redirect('/')
            }).catch(console.log)               
        }).catch(console.log)
    },
    editGet: (req, res) => {
        Product.findById(req.params.id).then(prouct => {
            res.render('product/add', prouct)
        })
       
    }
};

function setPstatus(stat) {
     let pStat = {}
    switch (stat) {
        case 'Pending':
            pStat.Painding = true
            return pStat
            
        case 'In Progress':
            pStat.inProgress = true
           return pStat
           
        case 'In Transit':
            pStat.inTransit = true
           return pStat
           
        case 'Delivered':
            pStat.Delivered = true
           return pStat
        default:
            break;
    }
}