const Product = require('mongoose').model('Product')
module.exports = {
    index: (req, res) => {
     
        Product.find({}).then(productsInput => {
            let products = {
                chicken: productsInput.filter(p => p.category =='Chicken'),
                beef: productsInput.filter(p => p.category =='Beef'),
                lamb: productsInput.filter(p => p.category =='Lamb'),
            }
            res.render('home/index', {products});
        }).catch(console.log)
       
        
    }
};