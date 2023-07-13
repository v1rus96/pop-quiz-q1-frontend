import { supabase } from "../supabase";

// Create a new order
export const createOrder = async (userId: string, garmentId: string, size: string) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { 
          userId: userId, 
          garmentId: garmentId, 
          size: size, 
          status: 'waiting for approval', 
          orderDate: new Date() 
        },
      ])
  
    if (error) throw error;
    return data;
  };
  
  // Get all orders for a user
  export const getOrdersByUser = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('userId', userId)
  
    if (error) throw error;
    return data;
  };

    // Get all orders
    export const getOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')

        if (error) throw error;
        return data;
    };
  
  // Approve an order
  export const approveOrder = async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'approved' })
      .eq('userId', userId)
  
    if (error) throw error;
    return data;
  };
  
  // Decline an order
  export const declineOrder = async (orderId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'declined', approvalDate: new Date() })
      .eq('id', orderId)
  
    if (error) throw error;
    return data;
  };
  