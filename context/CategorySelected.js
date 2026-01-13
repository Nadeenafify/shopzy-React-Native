import  { createContext, useContext, useState } from "react";


const MyContext = createContext()

export const CategoryProvider = ({ children }) => {

    const [category, setCategory] = useState("beauty")

    return (
        <MyContext.Provider value={{ category, setCategory }}>
            {children}
        </MyContext.Provider>
    )
}

export const useCategory = () => useContext(MyContext)