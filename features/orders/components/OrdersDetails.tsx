import {  Text, View } from 'react-native'
import React from 'react'
import { useOrders } from '@/context/OrdersContext';
import { Product } from '@/types/home';

const OrdersDetails = () => {

    const { orders } = useOrders();

    const totalPrice = orders.reduce((acc: number, item: Product) => {
        return ((Number(acc) + Number(item.price)) * item.quantity).toFixed(2)
    }, 0)
    const NumberOfItems = orders.reduce((acc: number, item: Product) => {
        return Number(acc) + item.quantity
    }, 0)

    return (
        <View className="mt-5 p-5 bg-white rounded-xl shadow-md mb-5">
            <Text className="text-lg font-semibold mb-2">Order Summary</Text>

            <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Items:</Text>
                <Text className="text-gray-800 font-medium">{NumberOfItems}</Text>
            </View>

            <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Subtotal:</Text>
                <Text className="text-gray-800 font-medium">${Number(totalPrice).toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-1">
                <Text className="text-gray-600">Delivery:</Text>
                <Text className="text-gray-800 font-medium">$50.00</Text>
            </View>

            <View className="flex-row justify-between border-t border-gray-200 pt-2 mt-2 mb-1">
                <Text className="text-gray-700 font-semibold">Total:</Text>
                <Text className="text-gray-900 font-bold">${(Number(totalPrice) + 50).toFixed(2)}</Text>
            </View>

            <View className="mt-2">
                <Text className="text-gray-600">Payment: <Text className="text-gray-800 font-medium">Cash on Delivery</Text></Text>
            </View>
        </View>
    )
}

export default OrdersDetails
