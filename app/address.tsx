
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AddressPage from '@/features/address/components/AddressPage'

const address = () => {
    return (
        <LinearGradient
         className=''
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
            <AddressPage />

        </LinearGradient>


    )
}

export default address

