import { useCart } from '@/context/CartContext'
import { Product } from '@/types/home'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const CartItem: React.FC<{ item: Product }> = ({ item }) => {


    const { addToCart, removeFromCart } = useCart()


    return (
        <View
            key={item.id}
            className="bg-white  rounded-xl shadow-md p-4 mt-4 flex-row gap-4">

            <Image
                source={{ uri: item.thumbnail }}
                style={{ width: 90, height: 90 }}
                resizeMode="cover"
                className="rounded-lg"
            />


            <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800" numberOfLines={2}>
                    {item.title}
                </Text>

                <Text className="text-xs text-gray-400 mt-1">
                    {item.brand}
                </Text>

                <Text className="text-xs text-yellow-500 mt-1">
                    ⭐ {item.rating} ({item.reviews.length})
                </Text>


                <View className="flex-row items-center gap-2 mt-2">
                    <Text className="text-lg font-bold text-gray-900">
                        ${item.price}
                    </Text>

                    <Text className="text-sm text-gray-400 line-through">
                        ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                    </Text>

                    <View className="bg-red-100 px-2 py-0.5 rounded-full">
                        <Text className="text-xs text-red-500">
                            -{item.discountPercentage}%
                        </Text>
                    </View>
                </View>


                <Text className="text-xs text-green-600 mt-1">
                    {item.availabilityStatus}
                </Text>


                <Text className="text-xs text-gray-400 mt-1">
                    🚚 {item.shippingInformation}
                </Text>
            </View>


            <View className="justify-between items-end">
                <TouchableOpacity
                    onPress={() => {
                        removeFromCart(item.id)
                    }}
                >
                    <MaterialCommunityIcons
                        name="delete-outline"
                        size={24}
                        color="#EF4444"
                    />
                </TouchableOpacity>


                <View className="flex-row items-center gap-2 mt-4">
                    <TouchableOpacity
                        disabled={item.quantity === 1}
                        onPress={() => { addToCart(item, -1) }}
                        className="px-2 py-1 bg-gray-200 rounded">
                        <Text>-</Text>
                    </TouchableOpacity>

                    <Text className="font-semibold">{item.quantity}</Text>

                    <TouchableOpacity
                        disabled={item.quantity >= item.stock}
                        onPress={() => { addToCart(item, 1) }}
                        className="px-2 py-1 bg-gray-200 rounded">
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CartItem
