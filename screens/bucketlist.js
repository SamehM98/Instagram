import React from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList , TextInput} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bar from '../components/bar';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import { useIsFocused } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import {
    useFonts,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
} from '@expo-google-fonts/roboto';

const BucketlistScreen = () => {

    let [fontsLoaded] = useFonts({
        Roboto_300Light,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
      });


    const [text, setText] =  useState('');
    const current_user_data = (useSelector(selectUser));
    const current_user = current_user_data.id;
    const [blist , setBlist] = useState([]);
    const isFocused = useIsFocused();

    
     

    const AddItem = async () => {
        const existing = await AsyncStorage.getItem(current_user.toString());
        let existingArr = JSON.parse(existing);

        
        if(!existingArr) //if null , make empty array
        {
            existingArr = [];
            
        }
        if(!existingArr.includes(text))
        existingArr.push(text);


            await AsyncStorage.setItem(current_user.toString(),JSON.stringify(existingArr)).then( ()=>{
                console.log(existingArr);
                setBlist(existingArr);
                } );
        
    }

   

    const initialRender = async () => {

        const existing = await AsyncStorage.getItem(current_user.toString());
        const existingArr = JSON.parse(existing);

        if(existingArr)
            setBlist(existingArr);

    }


    useEffect( () => {
       initialRender()
      }, [isFocused,blist]);



      if (!fontsLoaded)
      return <AppLoading />;

    return (<View style={styles.container}>

        <View style={styles.content}>

        <TextInput style={styles.textinput} 
        numberOfLines={1} 
        placeholder="Add item" 
        onChangeText = {value => setText(value)}/>

        <TouchableOpacity onPress={() => (AddItem())}>
        <Text style={styles.button}>+</Text>
        </TouchableOpacity>

        </View>

            <FlatList 
            vertical
            style={styles.flatlist}
            data={blist}
            keyExtractor={item => (item)}
            renderItem = {({item}) => {
                return (
                <Text style={styles.item}>{item}</Text>)
            }}
            />

        <Bar  />
        
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'space-between',
        backgroundColor: 'white'
    },
    content: {
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row', 
        flexWrap:'wrap',
        paddingHorizontal: '12%'
    },
    textinput:{
        backgroundColor: 'ivory',
        paddingVertical: 7,
        paddingLeft: 6,
        width: 200,
        marginBottom: 16,
        borderColor: 'dimgray',
        borderWidth: 3
    },
    button:{
        color: 'royalblue',
        fontWeight: 'bold',
        fontSize: 24,
        borderColor: 'royalblue',
        borderWidth: 3,
        paddingVertical: 6,
        paddingHorizontal: 12,
        textAlign: 'center'
    },
    flatlist:{
        paddingHorizontal: '5%',
        marginTop: '10%',
    },
    item:{
        paddingVertical: 16,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'dimgray',
        fontFamily: 'Roboto_500Medium'
    }
})

export default BucketlistScreen;