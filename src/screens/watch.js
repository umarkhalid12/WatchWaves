import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

const Watch = () => {
    return (
        <View style={styles.container}>
            <AntDesign name="infocirlceo" size={80} color="#f9bc50" />
            <Text style={{fontWeight:'bold', fontSize: 22, textAlign:'center', marginTop: 15}}>Sorry, This content is not available in your country</Text>
        </View>
    )
}

export default Watch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'

    }
})