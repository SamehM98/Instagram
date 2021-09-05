import React from 'react';
import { Text, StyleSheet , View , TouchableOpacity, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';

const Bar = () =>{

    const navigation = useNavigation();

    return(<View style={styles.container}>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Newsfeed')}>
            <Image source={{uri: "https://image.flaticon.com/icons/png/512/69/69524.png"}} style={styles.image}/>
            <Text>Newsfeed</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Bucketlist')}>
            <Image source={{uri: "https://static.thenounproject.com/png/29962-200.png"}} style={styles.image}/>
            <Text>Bucketlist</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{uri: "https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png"}} style={styles.image}/>
            <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    </View>)
}

const styles = StyleSheet.create({

    container: {
        
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 5
    },
    image:{
        height: 20,
        width: 20,
        alignSelf: 'center'
    }


});

export default Bar;