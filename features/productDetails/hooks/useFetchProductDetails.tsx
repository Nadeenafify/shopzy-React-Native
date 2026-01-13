
import { Product } from '@/types/home'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import { useEffect, useState } from 'react'

import { Dimensions, View } from 'react-native'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'


const useFetchProductDetails = () => {

    const { id } = useLocalSearchParams()
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { width } = Dimensions.get("window");
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))


    const renderShimmer = () => {
        return (
            <View
                className=' h-full mt-10'
                style={{ width: width, padding: 10 }}>
                <ShimmerPlaceholder
                    style={{
                        width: "100%",   // now 100% of parent View
                        height: 300,
                        borderRadius: 12,
                    }}
                    visible={false}
                />
                <ShimmerPlaceholder
                    style={{
                        marginTop: 15,
                        width: "100%",
                        height: 30,
                        borderRadius: 12,

                    }}
                    visible={false}
                />

                <ShimmerPlaceholder
                    style={{
                        marginTop: 15,
                        width: "100%",
                        height: 30,
                        borderRadius: 12,

                    }}
                    visible={false}
                />
                <ShimmerPlaceholder
                    style={{
                        marginTop: 15,
                        width: "100%",
                        height: 100,
                        borderRadius: 12,

                    }}
                    visible={false}
                />
                <ShimmerPlaceholder
                    style={{
                        marginTop: 15,
                        width: "100%",
                        height: 200,
                        borderRadius: 12,

                    }}
                    visible={false}
                />
            </View>
        )
    }

    useEffect(() => {

        const fetchProduct = async () => {

            try {
                setLoading(true)
                const res = await fetch(`https://dummyjson.com/products/${id}`)
                const data = await res.json()
                setProduct(data)
            }
            catch {
                setError(true)
                console.log("error when get product details")
            }
            finally {

                setLoading(false)

            }

        }
        fetchProduct()

    }, [])

    return {
        error,
        product,
        loading,
        width,
        renderShimmer,
        increase,decrease,quantity

    }
}

export default useFetchProductDetails

