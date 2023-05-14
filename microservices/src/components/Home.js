import React, { useState, useEffect } from 'react';
import CustomerDetails from './CustomerDetails';

function Home() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    // fetch collection of customer records
    fetch('/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
        <h1 style={{color: 'white'}}>RESTful Web Service
Implementation with four GET routes</h1>
      <h1 style={{color: 'white'}}>Customers</h1>
      <ul style={{color: 'white'}}>
        {customers.map(customer => (
          <li  key={customer.id} onClick={() => setSelectedCustomerId(customer.id)}>
            {customer.name}
          </li>
        ))}
      </ul>

      {selectedCustomerId && <CustomerDetails customerId={selectedCustomerId} />}
    </div>
  );
}

export default Home;