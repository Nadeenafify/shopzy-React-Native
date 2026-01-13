import { signIn, signUp } from "@/auth/auth";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, TextInput, View, Text, TouchableOpacity } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [haveAccount, setHaveAccount] = useState(true);
  const { setUser, loading } = useAuth()
  const router = useRouter();

  console.log(loading)

  const handleAuth = async () => {
    try {
      if (haveAccount) {
        const res = await signIn(email, password);
        setUser(res.user)
        Alert.alert('Success', 'Signed in successfully');
      } else {
        const res = await signUp(email, password);
        setUser(res.user)
        Alert.alert('Success', 'Account created! Please check your email.');
      }
      setEmail("")
      setPassword("")
      router.push("/");
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

  return (
    <>

      {
        loading ?
          <View
            className="h-full w-full flex justify-center items-center "
          >
            <ShimmerPlaceholder
              shimmerStyle={{
                width: "100%",
                height: 100,
                margin: 10,
                borderRaduis: 5

              }}
            />
            <ShimmerPlaceholder
              shimmerStyle={{
                width: "100%",
                height: 50,
                margin: 10,
                borderRaduis: 5

              }}
            />
            <ShimmerPlaceholder
              shimmerStyle={{
                width: "100%",
                height: 50,
                margin: 10,
                borderRaduis: 5

              }}
            />


          </View>
          :
          <View className="flex-1 justify-center p-6 ">

            <View className="flex-row items-center justify-center mb-6">
              <Ionicons
                name={haveAccount ? "log-in-outline" : "person-add-outline"}
                size={28}
                color="#EF4444"
                className="mr-2"
              />
              <Text className="text-2xl font-bold text-center">
                {haveAccount ? 'Sign In' : 'Sign Up'}
              </Text>
            </View>


            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="border-b border-gray-300 mb-4 px-2 py-2 focus:outline-none"
            />


            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="border-b border-gray-300 mb-6 px-2 py-2 focus:outline-none"
            />


            <TouchableOpacity
              onPress={handleAuth}
              className="bg-red-500 rounded-xl mt-3  px-6 py-3 mb-4 shadow-md"
            >
              <Text className="text-white font-bold text-center text-lg">
                {haveAccount ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHaveAccount(!haveAccount)}>
              <Text className="text-center text-blue-700">
                {haveAccount
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
      }


    </>
  );
}
