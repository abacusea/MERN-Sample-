const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const logger = require('morgan');
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');

const app = express();

require('dotenv').config();

const dataRoutes = require('./routes/api/data');

const uri = process.env.ATLAS_URI;

const port = process.env.PORT || 5000;
const router = express.Router();

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true 
});

mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.once('open', () => console.log("MongoDB database connection established successfully"));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(logger('dev'));
const server = http.createServer(app);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use('/api', dataRoutes);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});






const server = http.createServer(app);


// app.use('/api', router);

server.listen(port, () => console.log(`Server is running on port: ${port}`));