import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem("favorites");
        setFavorites(data ? JSON.parse(data) : []);
      } catch (err) {
        console.log("Error loading favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, loading]);


  const addToFavorites = (product) => {
    setFavorites((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };


  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  
  const toggleFavorite = (product) => {
    if (favorites.find((item) => item.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

 
  const isFavorite = (id) => favorites.some((item) => item.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};


export const useFavorites = () => useContext(FavoritesContext);
