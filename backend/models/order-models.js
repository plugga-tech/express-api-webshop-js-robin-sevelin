const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
  },
  products: [
    {
      productId: mongoose.Types.ObjectId,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('order', OrderSchema);
