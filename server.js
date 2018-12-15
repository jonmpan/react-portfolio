var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

// Create server instance
const server = http.createServer(app);

// // Set up promises with mongoose
// mongoose.Promise = global.Promise;
// Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost/portfolio-react'
// );

// mongoose.connection.on('connected', () => {
//   console.log('Connected to Database');
// });
// // On Error
// mongoose.connection.on('error', err => {
//   console.log('Database error ' + err);
// });

// SSL Redirect
app.use(sslRedirect());

// Set Static Folder
app.use(express.static('client/build'));

// Body Parser Middleware
app.use(bodyParser.json());

// Send every request to the React app
// Define any API routes before this runs
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

server.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
