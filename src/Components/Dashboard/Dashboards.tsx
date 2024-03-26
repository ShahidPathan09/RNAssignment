import * as React from 'react'
import { View, Text, FlatList, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/Store/store'

export function Dashboard() {
    const userData = useSelector((state: RootState) => state.user.user)
    console.log('userData', userData)

    return (
        <View>
            <Text>User List:</Text>
            {/* <FlatList
                data={userData}
                renderItem={({ item }: any) => (
                    <View>
                        <Text>{item.firstName} {item.lastName}</Text>
                        <Button title="Delete" onPress={() => handleDelete(item.id)} />
                    </View>
                )}
                keyExtractor={(item: any) => item.id.toString()}
            /> */}
        </View>
    )
}
