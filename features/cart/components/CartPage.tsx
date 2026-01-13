import { useCart } from '@/context/CartContext';
import { Product } from '@/types/home';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {  ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CartItem from './CartItem';
import { useRouter } from 'expo-router';

const CartPage = () => {

    const { cart, clearCart } = useCart()
    const router = useRouter()


    const totalPrice = cart.reduce((acc: number, item: Product) => {
        console.log("acc",acc,"price",item.price)
        return ((Number(acc) + Number(item.price))*item.quantity).toFixed(2)
    }, 0)



    return (
        <ScrollView className='rounded-md w-full px-3'>
            <View className="flex-row items-center gap-3 mt-4">
                <Text className="text-3xl font-bold text-gray-800">
                    Cart
                </Text>

                <View className="bg-red-100 px-3 py-1 rounded-full">
                    <Text className="text-red-500 font-semibold">
                        {cart.length}
                    </Text>
                </View>
            </View>
            {
                cart.length > 0 ?
                    <View>


                        {
                            cart.map((item: Product) => {
                                return (
                                    <CartItem item={item} key={item.id} />
                                )
                            })
                        }


                        <View className="mt-5 p-4 bg-gray-100 rounded-xl flex-row justify-between items-center">
                            <Text className="text-base text-gray-600">Total</Text>
                            <Text className="font-bold text-lg text-black">
                                ${Number(totalPrice)}
                            </Text>
                        </View>


                        <View className='flex flex-row justify-end gap-3'>



                            <TouchableOpacity
                                onPress={() => {
                                     router.push("/address?order=1")
                                }}
                                activeOpacity={0.8}
                                className="flex-row mb-5  items-center justify-center gap-2 bg-red-500 rounded-xl px-5 py-3 mt-5 shadow-md"
                            >
                                <MaterialCommunityIcons
                                    name="clipboard-text-outline"
                                    size={20}
                                    color="white"
                                />

                                <Text className="text-white font-semibold text-base">
                                    Order
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={clearCart}
                                activeOpacity={0.8}
                                className="flex-row mb-5 items-center justify-center gap-2 bg-red-500 rounded-xl px-5 py-3 mt-5 shadow-md"
                            >
                                <MaterialCommunityIcons
                                    name="trash-can-outline"
                                    size={20}
                                    color="white"
                                />
                                <Text className="text-white font-semibold text-base">
                                    Clear Cart
                                </Text>
                            </TouchableOpacity>



                        </View>



                    </View>
                    :
                    <View className='h-[90vh] w-full  flex justify-center items-center'>
                        <Text className='text-red-500 text-xl font-bold'>No Elements Founded in Cart</Text>
                    </View>




            }
        </ScrollView>
    )
}

export default CartPage
