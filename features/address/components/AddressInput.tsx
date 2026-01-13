import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useAddresses } from '@/context/AdressContext';


const AddressInput:React.FC<{close:any}> = ({close}) => {
  const { addAddress } = useAddresses();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddAddress = () => {

    if (!fullName || !phone || !city || !street || !building) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const newAddress = {
      id: Date.now().toString(), 
      fullName,
      phone,
      city,
      street,
      building,
      floor,
      notes,
      type: 'home', 
    };

    addAddress(newAddress);

    Alert.alert('Success', 'Address added successfully!');

   
    setFullName('');
    setPhone('');
    setCity('');
    setStreet('');
    setBuilding('');
    setFloor('');
    setNotes('');

    close()

  };

  return (
    <View className="p-4 bg-white rounded-xl w-full shadow-md">
      <Text className="text-lg font-bold mb-3">Add New Address</Text>

      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        className="border border-gray-300 rounded-md p-2 mb-2"
      />

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />

      <TextInput
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />

      <TextInput
        placeholder="Building / House Number"
        value={building}
        onChangeText={setBuilding}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />

      <TextInput
        placeholder="Floor / Apartment (optional)"
        value={floor}
        onChangeText={setFloor}
        className="border border-gray-300 rounded-md p-2 mb-2"
      />

      <TextInput
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        className="border border-gray-300 rounded-md p-2 mb-4"
      />

      <Pressable
        className="bg-green-600 p-3 rounded-lg"
        onPress={handleAddAddress}
      >
        <Text className="text-white text-center font-bold">Add Address</Text>
      </Pressable>
    </View>
  );
};

export default AddressInput;
