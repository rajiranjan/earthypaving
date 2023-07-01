const orderSchema = new mongoose.Schema({
    order_date: { type: Date, default: Date.now }
  });
  
  // Define the order model
  const Order = mongoose.model('Order', orderSchema);