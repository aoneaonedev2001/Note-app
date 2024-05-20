const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan')


//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())




// Route #1
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/notes'))
app.use('/api', require('./routes/historynote'))

app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
  