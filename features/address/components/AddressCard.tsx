import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useAddresses } from '@/context/AdressContext';
import { Address } from '@/types/address';

const AddressCard: React.FC<{ address: Address }> = ({ address }) => {
    const { selectedAddress, selectAddress } = useAddresses();
    const isSelected = selectedAddress?.id === address.id;

    return (
        <Pressable
            onPress={() => selectAddress(address)}
            className={`p-4 rounded-2xl border ${isSelected
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-gray-300 bg-white shadow-sm'
                } mb-4`}
        >
            <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-3">
                    <Text className="text-lg font-semibold text-gray-800 mb-1">{address.fullName}</Text>
                    <Text className="text-gray-600 mb-1">{address.phone}</Text>
                    <Text className="text-gray-600 mb-1">
                        {address.street}, {address.building}, {address.city}
                    </Text>
                    {address.floor ? (
                        <Text className="text-gray-600 mb-1">Floor/Apartment: {address.floor}</Text>
                    ) : null}
                    {address.notes ? (
                        <Text className="text-gray-600 mb-1">Notes: {address.notes}</Text>
                    ) : null}
                    <Text className="text-sm text-gray-500 mt-1">Type: {address.type}</Text>
                </View>


                <View className="justify-center items-center">
                    {isSelected ? (
                        <View className="w-6 h-6 rounded-full bg-green-600 justify-center items-center">
                            <Text className="text-white font-bold">✓</Text>
                        </View>
                    ) : (
                        <View className="w-6 h-6 border-2 border-gray-400 rounded-full" />
                    )}
                </View>
            </View>
        </Pressable>
    );
};

export default AddressCard;
