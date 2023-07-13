import React, { useState } from 'react';
import { createOrder } from '../../services/order';
import useUser from '../../hooks/useAuth';
import Dashboard from '../Accounts/Dashboard';

const Order = () => {
  const [garmentType, setGarmentType] = useState('');
  const [bodyMeasurement, setBodyMeasurement] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    const session = useUser() as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cost = await createOrder(session.session.user.id,garmentType, bodyMeasurement);
      alert(`Order placed successfully! Your cost is $${cost}`);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Dashboard>
    <div>
      <h1>Place Order</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Garment Type:
          <select value={garmentType} onChange={(e) => setGarmentType(e.target.value)} required>
            <option value="">--Please choose an option--</option>
            <option value="shirt">Shirt</option>
            <option value="dress">Dress</option>
            <option value="trouser">Trouser</option>
          </select>
        </label>
        <br />
        <label>
          Body Measurement:
          <input
            type="text"
            value={bodyMeasurement}
            onChange={(e) => setBodyMeasurement(e.target.value)}
            required
          />
        </label>
        <br />
        <input type="submit" value="Place Order" />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    </Dashboard>
  );
};

export default Order;
