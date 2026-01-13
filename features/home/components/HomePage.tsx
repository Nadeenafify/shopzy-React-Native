import { categories, Product } from '@/types/home'
import React from 'react'
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ProductCard from './ProductCard'
import useFetchProducts from '../hooks/useFetchProducts'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useCategory } from '@/context/CategorySelected'
import { useAuth } from '@/context/AuthContext'


const HomePage = () => {

    const {
        renderShimmer,
        searchProductInput,
        setSearchProductInput,
        products,
        error,
        loading,
        categories,
    } = useFetchProducts()

    const { user } = useAuth()
    console.log("user", user)

    const { category, setCategory } = useCategory()




    return (

        <ScrollView className='w-full'>

            <Text className="text-5xl font-extrabold mt-8 mb-3 ml-4 tracking-wider uppercase flex-row">
                <Text className="text-white bg-red-400 px-1 rounded">S</Text>
                <Text className="text-red-400 rounded-md">hopzy</Text>
            </Text>


            <View className='bg-white my-2  mx-3  flex flex-row items-center px-3 rounded-md'>
                <EvilIcons name="search" size={24} color="gray" />
                <TextInput
                    className=' placeholder:text-gray-400 flex-1  '
                    value={searchProductInput}
                    placeholder='search product'
                    onChangeText={(text) => { setSearchProductInput(text) }}
                />
            </View>


            {loading && renderShimmer()}
            {error && <Text className='text-red-500'>Error when getting Products</Text>}



            <View className='h-10 my-3'>

                <ScrollView
                    horizontal

                >

                    {
                        categories.map((item: categories, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => { setCategory(item.slug) }}
                                    className={` flex ${category === item.slug ? "bg-red-400 " : "bg-gray-200"}  p-2 mx-2 rounded-xl justify-center items-center`}>
                                    <Text className={`${category === item.slug ? "text-white" : "text-gray-500"}  font-bold`}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

            </View>


            {(!loading && !error && products.length > 0) &&

                <FlatList<Product>
                    scrollEnabled={false}
                    data={products}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProductCard item={item} />
                    )}
                    ListEmptyComponent={() => (
                        <View className='flex justify-center h-[90vh] items-center'>
                            <Text className='text-lg font-bold text-red-500'>No Products Available</Text>
                        </View>
                    )}

                />
            }

        </ScrollView>




    )
}

export default HomePage

