const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

//----register
exports.register = async (req, res) => {
  const { customer_id, customer_name, password} = req.body;

  db.query(
    "SELECT * FROM customer WHERE customer_id = ?",
    [customer_id],
    async (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }

      if (results.length > 0) {
        return res.status(400).send("User Already exists");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        db.query(
          "INSERT INTO customer SET ?",
          { customer_id, customer_name, password: hashedPassword},
          (error, results) => {
            if (error) {
              return res.status(500).json({ error });
            }
            res.send("Register Success");
          }
        );
      }
    }
  );
};

exports.login = async (req, res) => {
  const { customer_id, password } = req.body;

  db.query(
    "SELECT * FROM customer WHERE customer_id = ?",
    [customer_id],
    async (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }

      if (results.length === 0) {
        return res.status(400).send("User Not found!!!");
      } else {
        const customer = results[0];
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
          return res.status(400).send("Password Invalid!!");
        } else {
          const payload = {
            customer: {
              CustomerId: customer.customer_id,
              CustomerName: customer.customer_name
            },
          };

          jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token, payload });
          });
        }
      }
    }
  );
};

//---- currentCustomer
exports.currentCustomer = async (req, res) => {
  try {
    const CustomerId = req.customer.CustomerId; 
    
    
    const sql = "SELECT * FROM customer WHERE customer_id = ?";

    
    db.query(sql, [CustomerId], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error });
      }

      
      const customer = results[0];
      
      
      delete customer.password;

      
      res.json(customer);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
