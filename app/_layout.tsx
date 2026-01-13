
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css";
import { CartProvider } from '@/context/CartContext';
import Toast from "react-native-toast-message";
import { FavoritesProvider } from "@/context/FavoritesContext"
import { CategoryProvider } from "@/context/CategorySelected"
import { AuthProvider } from "@/context/AuthContext"
import { OrdersProvider } from '@/context/OrdersContext';
import { AddressProvider } from "@/context/AdressContext"
export default function RootLayout() {


  return (
    <CartProvider>
      <FavoritesProvider>
        <CategoryProvider>
          <AuthProvider>
            <OrdersProvider>
              <AddressProvider >
              <Stack screenOptions={{ headerShown: false }} />
              </AddressProvider>
              <Toast />
            </OrdersProvider>
          </AuthProvider>
        </CategoryProvider>
      </FavoritesProvider>
    </CartProvider>

  );
}
