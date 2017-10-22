const mongoose = require('mongoose');
const minMaxMsg = 'Size should be between 17 and 24 cm';
const min = [17, minMaxMsg];
const max = [24 , minMaxMsg];

const productSchema = new mongoose.Schema({
   category: {type: mongoose.Schema.Types.String, required: true},
   size: {type: mongoose.Schema.Types.Number, min, max},
   imageUrl: {type: mongoose.Schema.Types.String, required: true},
   toppings: [{type: mongoose.Schema.Types.String}]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
