import { useOrders } from "@/context/OrdersContext";
import { Product } from "@/types/home";
import {  MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";


interface OrderCardProps {
    item: Product;
}

const OrderCard = ({ item }: OrderCardProps) => {

    const { removeOrder } = useOrders()

    return (
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">


            <View className="flex-row gap-4">
                <Image
                    source={{ uri: item.thumbnail }}
                    className="w-20 h-20 rounded-xl"
                    resizeMode="cover"
                />

                <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-900" numberOfLines={2}>
                        {item.title}
                    </Text>

                    <Text className="text-sm text-gray-500 mt-1">
                        {item.brand} • {item.category}
                    </Text>

                    <Text className="text-sm text-gray-500 mt-1">
                        ${item.price} × {item.quantity}
                    </Text>
                </View>


                <TouchableOpacity
                    onPress={() => removeOrder(item.id)}
                    className="p-2"
                >
                    
                    <MaterialCommunityIcons
                        name="delete-outline"
                        size={24}
                        color="#EF4444"
                    />
                </TouchableOpacity>
            </View>


            <View className="flex-row justify-between items-center mt-4 border-t border-gray-100 pt-3">
                <Text className="text-sm text-gray-500">Total</Text>
                <Text className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                </Text>
            </View>

        </View>
    );
};

export default OrderCard;
