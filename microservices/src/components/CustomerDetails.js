import React, { useState, useEffect } from 'react';

function CustomerDetails({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    // fetch single customer record by ID
    fetch(`/customers/${customerId}`)
      .then(res => res.json())
      .then(data => setCustomer(data))
      .catch(error => console.log(error));
  }, [customerId]);

  const fetchOrders = () => {
    // fetch collection of orders for customer with ID
    fetch(`/customers/${customerId}/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(error => console.log(error));
  }

  const handleCustomerClick = () => {
     setOrders([]); // Clear orders state before fetching new customer's orders
  fetchOrders();
  setSelectedOrderId(null);
  }

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  return (
    <div>
      <h2 onClick={handleCustomerClick}>{customer.name}</h2>
      <p>ID: {customer.id}</p>
      <p>Email:{customer.email}</p>

      {orders.length > 0 && (
        <div>
          <h3 style={{color: 'white'}}>Orders</h3>
          <ul style={{color: 'white'}}>
            {orders.map(order => (
              <li key={order.id} onClick={() => handleOrderClick(order.id)}>
                {order.products.map(product => product.name).join(', ')}
              </li>
            ))}
          </ul>

          {selectedOrderId && (
            <div>
              <h3 style={{color: 'white'}}>Order Details</h3>
              <p>ID: {selectedOrderId}</p>
              <ul style={{color: 'white'}}>
                {orders
                  .find(order => order.id === selectedOrderId)
                  ?.products.map(product => (
                    <li key={product.id}>
                      {product.name}: Price = ${product.price}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;
