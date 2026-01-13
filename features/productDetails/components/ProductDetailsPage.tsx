import { useCart } from '@/context/CartContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Swiper from "react-native-swiper";
import Toast from "react-native-toast-message";
import useFetchProductDetails from '../hooks/useFetchProductDetails';
const ProductDetailsPage = () => {

  const {
    error,
    product,
    loading,
    width,
    renderShimmer,
    increase, decrease, quantity
  } = useFetchProductDetails()

  const router = useRouter()
  const { addToCart } = useCart()

  const images = product?.images ?? [];


  if (error) return <Text>Error when getting Product Details</Text>
  if (loading) return renderShimmer()




  return (
   <>
   
    {
      (product)&&
       <ScrollView className="flex-1 p-4 pb-20">

      <TouchableOpacity
        onPress={() => {
          router.push("/")
        }}
      >
        <Ionicons name="chevron-back-circle-outline" size={40} color="#f87171" />
      </TouchableOpacity>

      <Swiper
        showsPagination={true}
        loop={false}
        containerStyle={{ width, height: 300 }}
        paginationStyle={{ bottom: -10 }}
      >
        {images.map((img:string, i:number) => (
          <View
            key={i}
            style={{
              width: width * 0.8,
              marginHorizontal: width * 0.1 / 2,
            }}
          >
            <Image
              source={{ uri: img }}
              style={{ width: "100%", height: 300, borderRadius: 12 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>


      <Text className="text-2xl font-bold mt-6">
        {product?.title}
      </Text>


      <Text className="text-gray-500 mt-1">
        {product?.brand} • {product?.category}
      </Text>


      <Text className="text-2xl text-green-600 font-semibold mt-2">
        ${product?.price}
      </Text>


      <Text className="text-sm text-red-500">
        {product?.discountPercentage}% OFF
      </Text>


      <Text className="text-base mt-3 text-gray-700">
        {product?.description}
      </Text>


      <View className="mt-4 space-y-1">
        <Text>⭐ Rating: {product?.rating}</Text>
        <Text>📦 Stock: {product?.stock}</Text>
        <Text>🚚 {product?.shippingInformation}</Text>
        <Text>🛡 {product?.warrantyInformation}</Text>
      </View>


      <Text className="text-xl font-bold mt-6">
        Reviews
      </Text>

      {product?.reviews.map((review:any, index:number) => (
        <View
          key={index}
          className="bg-gray-100 w-[90%] p-3 rounded-lg mt-3"
        >
          <Text className="font-semibold">
            {review.reviewerName}
          </Text>
          <Text className="text-yellow-500">
            ⭐ {review.rating}
          </Text>
          <Text className="text-gray-700">
            {review.comment}
          </Text>
        </View>
      ))}

      <View className="flex-col gap-5 items-center justify-center w-[90%] mt-7">

        <View className='flex w-full flex-grow justify-between items-center flex-row'>
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 gap-4">
            <TouchableOpacity onPress={decrease}>
              <MaterialCommunityIcons
                name="minus"
                size={22}
                color="#374151"
              />
            </TouchableOpacity>

            <Text className="text-lg font-bold text-gray-800">
              {quantity}
            </Text>

            <TouchableOpacity onPress={increase}>
              <MaterialCommunityIcons
                name="plus"
                size={22}
                color="#374151"
              />
            </TouchableOpacity>
          </View>

          <Text className='font-bold text-lg'>${((product?.price || 1) * quantity).toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            Toast.show({
              type: 'success',
              text1: 'Added to Cart',
              text2: 'Your product has been added successfully',
              position: 'bottom', 
              visibilityTime: 2000, 
            });
            addToCart(product, quantity)
            router.push("/cart")
          }}
          activeOpacity={0.85}
          disabled={quantity+(product?.quantity||0)>(product?.stock||0)}
          className="flex-1  bg-red-400 flex-grow w-full rounded-xl py-4 px-4 items-center"
        >
          <Text className="text-white font-bold text-base">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>


    </ScrollView>
    }
   
   </>
  )
}

export default ProductDetailsPage

