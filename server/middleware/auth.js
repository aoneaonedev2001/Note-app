const jwt = require("jsonwebtoken");
const db = require('../db');

// authCheck  (decodes the token)
exports.authCheck = (req, res, next) => { 
  try {
    const token = req.headers["authtoken"]; // get the token sent from the header
    //console.log(token);
    if (!token) { // if don't have token
      return res.status(401).send("No token, authorization denied");
    }               
    const decoded = jwt.verify(token, "jwtSecret"); // verify the token
    req.customer = decoded.customer; // set the user property in request
    
    next(); // go to the next middleware
  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invalid!!");
  }
};

