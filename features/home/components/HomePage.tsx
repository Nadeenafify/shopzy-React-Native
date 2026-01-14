import { categories, Product } from '@/types/home'
import React, { memo, useCallback } from 'react'
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ProductCard from './ProductCard'
import useFetchProducts from '../hooks/useFetchProducts'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useCategory } from '@/context/CategorySelected'
import { useAuth } from '@/context/AuthContext'
import CategoryButton from './CategoryButton'


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



    const handleSelectCategory = useCallback((slug: string) => {
        setCategory(slug);
    }, []);


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

                <FlatList<categories>
                    horizontal
                    data={categories}
                    keyExtractor={(item) => (item?.slug).toString()}
                    renderItem={({ item }) => (
                        <CategoryButton item={item} category={category} onSelect={handleSelectCategory} />
                    )}
                    showsHorizontalScrollIndicator={false}
                />


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

