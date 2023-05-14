const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const customersData = require('./data.json');


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

// collection of records route
app.get('/customers', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
   res.send(JSON.stringify(customersData.customers));
    //res.json(customersData.customers);
  });
  
  // single record by ID route
  app.get('/customers/:id', (req, res) => {
    const customerId = req.params.id;
    const customer = customersData.customers.find(c => c.id == customerId);
    if (!customer) {
      res.sendStatus(404);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(customer));
        //res.json(customer);
    }
  });
  
  // collection of records for given entity route
  app.get('/customers/:id/orders', (req, res) => {
    const customerId = req.params.id;
    const customer = customersData.customers.find(c => c.id == customerId);
    if (!customer) {
      res.sendStatus(404);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(customer.orders));
        //res.json(customer.orders);
    }
  });
  
  // single record from collection of given entity route
  app.get('/customers/:customerId/orders/:orderId', (req, res) => {
    const customerId = req.params.customerId;
    const customer = customersData.customers.find(c => c.id == customerId);
    if (!customer) {
      res.sendStatus(404);
    } else {
      const orderId = req.params.orderId;
      const order = customer.orders.find(o => o.id == orderId);
      if (!order) {
        res.sendStatus(404);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(order));
        //res.json(order);
      }
    }
  });