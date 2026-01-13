import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useAddresses } from '@/context/AdressContext';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

const SelectedAddressCard = () => {
    const { selectedAddress: address } = useAddresses();
    const router = useRouter();

    const handleEdit = () => {
        router.push('/address?order=0');
    };

    return (
        <View className="p-4 bg-white rounded-2xl shadow-md border border-gray-200 mb-4 relative">

            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-semibold text-gray-800">Address Information</Text>
                <Pressable onPress={handleEdit}>
                      <AntDesign name="edit" size={20} color="#f87171" />
                </Pressable>
            </View>


            <Text className="text-lg text-gray-600 mb-1">{address?.fullName}</Text>
            <Text className="text-gray-600 mb-1">{address?.phone}</Text>
            <Text className="text-gray-600 mb-1">
                {address?.street}, {address?.building}, {address?.city}
            </Text>
            {address?.floor && (
                <Text className="text-gray-600 mb-1">Floor/Apartment: {address?.floor}</Text>
            )}
            {address?.notes && (
                <Text className="text-gray-600 mb-1">Notes: {address?.notes}</Text>
            )}
            <Text className="text-sm text-gray-500">Type: {address?.type}</Text>
        </View>
    );
};

export default SelectedAddressCard;
