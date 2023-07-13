import React, { useState, useEffect } from 'react';
import { approveOrder, getOrders } from '../../services/order';
import Dashboard from '../Accounts/Dashboard';

const Approval = () => {
  const [orders, setOrders] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getOrders();
        setOrders(result);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };

    fetchOrders();
  }, []);

  const handleApprove = async (userId: string) => {
    try {
      await approveOrder(userId);
      setOrders(orders.filter((order: { userId: string; }) => order.userId !== userId));
      alert('Order approved successfully!');
    } catch (error: any) {
     setErrorMessage(error.message);
    }
  };

  return (
    <Dashboard>
    <div>
      <h1>Approve Orders</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {orders.map((order: { userId: string, garmentId: string }) => (
          <li key={order.userId}>
            Order By: {order.userId}, Garment Type: {order.garmentId}
            <button onClick={() => handleApprove(order.userId)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
    </Dashboard>
  );
};

export default Approval;
