const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model('order', OrderSchema);
