import { useCategory } from "@/context/CategorySelected"
import { useEffect, useState } from "react"
import { View } from "react-native"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"


const useFetchProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [categories, setCategories] = useState([])
    const [searchProductInput, setSearchProductInput] = useState("")
    const {category}=useCategory()

    const renderShimmer = () => {
        const shimmerItems = Array.from({ length: 6 });
        return shimmerItems.map((_, index) => (
            <View key={index} style={{ flex: 1, gap: 10, margin: 8, flexDirection: "row" }}>
                <ShimmerPlaceholder
                    visible={!loading}
                    style={{ height: 200, borderRadius: 10, flex: 1 }}
                />
                <ShimmerPlaceholder
                    visible={!loading}
                    style={{ height: 200, borderRadius: 10, flex: 1 }}
                />
            </View>
        ));
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('https://dummyjson.com/products/categories')
            const data = await res.json()
            setCategories(data)
        } catch (err) {
            console.log('Error fetching categories', err)
        }
    }

    const SearchProducts = async () => {
        try {
            setLoading(true)
            const res = await fetch(`https://dummyjson.com/products/search?q=${searchProductInput}`)
            const data = await res.json()
            setProducts(data.products)
        }
        catch (error) {
            console.log("error when getting books", error)
            setError(true)
        }
        finally {
            setLoading(false)
        }


    }


    const fetchProducts = async () => {
        setLoading(true)
        try {

            const res = await fetch(`https://dummyjson.com/products/category/${category}`)
            const data = await res.json()
            setProducts(data.products)
        }
        catch (error) {
            console.log("error when getting books", error)
            setError(true)
        }
        finally {
            setLoading(false)
        }


    }


    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchProductInput.trim() !== "") {
                SearchProducts();
            } else {
                fetchProducts();
            }
        }, 500);



        return () => clearTimeout(timer);
    }, [searchProductInput]);

    useEffect(() => {
        setLoading(true)
        fetchProducts();
    }, [category])


    useEffect(() => {
        fetchProducts();
        fetchCategories()
    }, [])


    return {

        searchProductInput,
        setSearchProductInput,
        products,
        error,
        loading,
        categories,
        renderShimmer
    }
}

export default useFetchProducts

