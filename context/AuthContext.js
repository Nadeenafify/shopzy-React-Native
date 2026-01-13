import AsyncStorage from "@react-native-async-storage/async-storage"
import {  createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const data = await AsyncStorage.getItem("user")
                setUser(data ? JSON.parse(data) : {})
            }
            catch {
                console.log("error when get user fron async storage")
            }
            finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        if (!loading) {
            AsyncStorage.setItem("user", JSON.stringify(user))
        }
    }, [user,loading])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)