const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
   creator: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
   product: {type: mongoose.Schema.Types.ObjectId,required: true, ref: 'Product'},
   date: {type: mongoose.Schema.Types.Date, required: true},
   toppings: [{type: mongoose.Schema.Types.String}],
   status: {type: mongoose.Schema.Types.String, default: 'Pending', required: true,}
});

orderSchema.virtual('getDate').get(function () {
    return new Date(this.date).toLocaleString()
 })

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
