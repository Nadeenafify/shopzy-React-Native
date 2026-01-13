import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddressContext = createContext();


export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]); 
  const [selectedAddress, setSelectedAddress] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem("addresses");
        const savedAddresses = data ? JSON.parse(data) : [];
        setAddresses(savedAddresses);
        if (savedAddresses.length > 0) {
          setSelectedAddress(savedAddresses[0]);
        }
      } catch (error) {
        console.log("Error loading addresses", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("addresses", JSON.stringify(addresses));
    }
  }, [addresses,loading]);


  const addAddress = (address) => {
    setAddresses(prev => [...prev, address]);
 
  };

  const removeAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const updateAddress = (updated) => {
    setAddresses(prev =>
      prev.map(a => (a.id === updated.id ? updated : a))
    );

  };

 
  const selectAddress = (address) => {
    setSelectedAddress(address);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        addAddress,
        removeAddress,
        updateAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};


export const useAddresses = () => useContext(AddressContext);
