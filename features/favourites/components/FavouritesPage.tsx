import { FlatList, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { useFavorites } from '@/context/FavoritesContext'
import FavoriteItem from './FavouriteItem'



const FavouritesPage = () => {

    const { favorites } = useFavorites()

  

    return (
        <ScrollView className='mt-4 px-3 '>
            <Text className="text-3xl font-bold text-gray-800">
                Favourites
            </Text>

            <FlatList
                scrollEnabled={false}
                className='h-full'
                contentContainerStyle={{
                    paddingBottom: 10,
                }}
                data={favorites}
                renderItem={({ item }) => {
                    return <FavoriteItem item={item} />
                }}
                ListEmptyComponent={() => {
                    return (
                        <View className='flex justify-center h-[90vh] items-center'>
                            <Text className='font-bold text-red-500 text-xl'>No Favourites Elements Found</Text>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.id}
                numColumns={2}

            />

         


        </ScrollView>
    )
}

export default FavouritesPage

