// require('dotenv').config();

// const mongoose = require('mongoose');

// // const connectionStr = "mongodb+srv://:${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster@.sl";
// const connectionStr = 'mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.3wsezud.mongodb.net/Testing?retryWrites=true&w=majority'

// mongoose.connect(connectionStr, {useNewUrlparser: true})
// .then(() => console.log('connected to mongodb'))
// .catch(err => console.log(err))

// mongoose.connection.on('error', err => {
//   console.log(err)
// })


const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
