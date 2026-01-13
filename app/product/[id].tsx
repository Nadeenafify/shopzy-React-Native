import React from 'react'
import ProductDetailsPage from '@/features/productDetails/components/ProductDetailsPage'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
const Product = () => {

    return (
        <LinearGradient
            colors={['#FDF0F3', '#FFFBFC']}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                borderRadius: 5,
                paddingTop: 30,

            }}
        >

            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: "center",
                    flexGrow: 1,

                }}
            >
                <ProductDetailsPage />
            </ScrollView>
        </LinearGradient>

    )
}

export default Product
