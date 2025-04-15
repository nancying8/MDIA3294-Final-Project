const express = require('express');
const cors = require('cors'); 
const app = express();
const bodyParser = require('body-parser');
const itemsRouter = require('./routers/items');
const port = 3000;
 
app.use(cors()); // enable CORS for all routes

app.use(bodyParser.json()); // parse JSON request bodies

app.use(express.static('public')); // serve static files from the 'public' directory

app.use('/items', itemsRouter); // router for handling routes related to guitars

app.listen(port, () => { // starts the server
  console.log(`Example app listening on port ${port}`)
});