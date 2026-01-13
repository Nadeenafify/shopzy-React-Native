import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFavorites } from "@/context/FavoritesContext"; // your FavoritesProvider
import { Product } from "@/types/home";

type FavoriteItemProps = {
  item: Product
};

const FavoriteItem: React.FC<FavoriteItemProps> = ({ item }) => {
  const { removeFromFavorites } = useFavorites();

  return (
    <View className="bg-white w-[47%] mx-1  rounded-xl shadow-md p-2 mt-2 gap-4">

     
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

        <Text className="text-xs text-gray-400 mt-1">{item.brand}</Text>

        <Text className="text-xs text-yellow-500 mt-1">
          ⭐ {item.rating} ({item.reviews?.length || 0})
        </Text>

        <View className="flex-row  items-center gap-2 mt-2">
          <Text className="text-sm font-bold text-gray-900">
            ${item.price}
          </Text>
          <Text className="text-sm text-gray-400 line-through">
            ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
          </Text>
          
        </View>

       <View className="flex flex-row justify-between items-center">
         <Text className="text-xs text-green-600 mt-1">
          {item.availabilityStatus}
        </Text>
        <View className="bg-red-100 px-2 py-0.5 rounded-full">
            <Text className="text-xs text-red-500">-{item.discountPercentage}%</Text>
          </View>
       </View>
      </View>

     
      <View className="justify-start items-end">
        <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
          <MaterialCommunityIcons name="delete-outline" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default FavoriteItem;
