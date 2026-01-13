import { FlatList, ScrollView,  Text,  View } from 'react-native'
import React from 'react'
import { useOrders } from "@/context/OrdersContext"
import OrderCard from './OrderCard'
import OrdersDetails from './OrdersDetails'
import SelectedAddressCard from './SelectedAddressCard'

const OrdersScreen = () => {

  const { orders } = useOrders();
 console.log(orders)
 

  return (
    <ScrollView className='px-2'>

      <Text className="text-3xl font-bold text-gray-800 mb-4 ">Orders</Text>
      <FlatList
        scrollEnabled={false}
        data={orders}
        keyExtractor={({ item }) => item?.id.toString()}
        renderItem={({ item }) => <OrderCard  item={item} />}
        ListEmptyComponent={() => {
          return (
            <View className='flex justify-center h-[90vh] items-center'>
              <Text className='text-lg font-bold text-red-500'>No Orders Added</Text>
            </View>
          )
        }}

      />

       <OrdersDetails/>
       <SelectedAddressCard/>

      

    </ScrollView>
  )
}

export default OrdersScreen

