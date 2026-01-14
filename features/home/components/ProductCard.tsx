import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFavorites } from '@/context/FavoritesContext'
import { ProductCardProps } from '@/types/productDetails'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import Toast from 'react-native-toast-message'


const ProductCard: React.FC<ProductCardProps> = ({ item }) => {

  const discountedPrice = (item.price * (1 - item.discountPercentage / 100)).toFixed(2)
  const shortDescription =
    item.description.length > 60 ? item.description.slice(0, 60) + '...' : item.description
  const router = useRouter()
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth()


  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/product/${item.id}`)
      }}
      className="w-[46%] bg-white mx-2 rounded-xl shadow-md p-3 my-2"
    >

      <View className='w-full  flex justify-end flex-row items-center'>
        <TouchableOpacity
          onPress={() => {
            if (user?.id)
              toggleFavorite(item)
            else {
              Toast.show({
                type: "error",
                text1: "please login or signup first",
                visibilityTime: 2000
              })
              router.push("/account")
            }
          }}
        >
          <MaterialCommunityIcons
            name={user?.id ? isFavorite(item.id) ? "heart" : "heart-outline" : "heart-outline"}
            size={28}
            color={"#F87171"}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: item.images[0] }}
        className="w-full h-[150px] rounded-lg mb-2"
        resizeMode="cover"
      />


      <Text className="font-bold text-sm mb-1">{item.title}</Text>
      <Text className="text-gray-500 text-xs mb-1">{item.brand}</Text>


      <View className="flex-row items-center mb-1">
        <Text className="font-bold text-base text-green-600">${discountedPrice}</Text>
        {item.discountPercentage > 0 && (
          <Text className="text-gray-400 text-xs line-through ml-2">${item.price}</Text>
        )}
        {item.discountPercentage > 0 && (
          <Text className="bg-red-500 text-white text-[10px] px-1 rounded ml-2">
            -{item.discountPercentage.toFixed(0)}%
          </Text>
        )}
      </View>


      <View className="flex-row items-center mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FontAwesome
            key={i}
            name={i < Math.round(item.rating) ? 'star' : 'star-o'}
            size={12}
            color="#facc15"
          />
        ))}
        <Text className="text-gray-400 text-xs ml-1">({item.rating.toFixed(1)})</Text>
      </View>


      <Text
        className={`text-xs font-semibold mb-1 ${item.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-500'
          }`}
      >
        {item.availabilityStatus}
      </Text>


      <Text className="text-gray-600 text-xs">{shortDescription}</Text>

    </TouchableOpacity>
  )
}

export default ProductCard
