import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadData = async () => {

      try {
        setLoading(true)
        const data = await AsyncStorage.getItem("cart")
        setCart(data ? JSON.parse(data) : [])
      }
      catch {
        console.log("error when getting cart data")
      }
      finally {
        setLoading(false)
      }
    }

    loadData()

  }, [])

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart,loading]);


const addToCart = (product, quantity = 1) => {
  setCart(prevCart => {
    const existing = prevCart.find(ele => ele.id === product.id);

    if (existing) {
      return prevCart.map(ele =>
        ele.id === product.id
          ? { ...ele, quantity: Number(ele.quantity) + Number(quantity) }
          : ele
      );
    }

    return [...prevCart, { ...product, quantity }];
  });
};


  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
      }}

    >

      {children}
    </CartContext.Provider>
  )

}


export const useCart = () => useContext(CartContext);





