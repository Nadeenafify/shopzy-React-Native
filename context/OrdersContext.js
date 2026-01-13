import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem("orders");
        setOrders(data ? JSON.parse(data) : []);
      } catch {
        console.log("error when getting orders data");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);


  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders, loading]);

 
 
const addOrder = (order, quantity = 1) => {
  setOrders(prevOrder => {
    const existing = prevOrder.find(ele => ele.id === order.id);

    if (existing) {
      return prevOrder.map(ele =>
        ele.id === order.id
          ? { ...ele, quantity: Number(ele.quantity) + Number(quantity) }
          : ele
      );
    }

    return [...prevOrder, { ...order, quantity }];
  });
};


  const removeOrder = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

 
  const clearOrders = () => setOrders([]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        removeOrder,
        clearOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
