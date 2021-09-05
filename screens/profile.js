import React from 'react';
import { Text, StyleSheet , View , Image} from "react-native";
import Bar from '../components/bar';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import { useState, useEffect } from 'react';
import users from '../api/users';

import {
    useFonts,
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  } from '@expo-google-fonts/open-sans';
  
  import {
      RobotoSlab_700Bold,
    } from '@expo-google-fonts/roboto-slab';
  
    import {
      Roboto_300Light,
      Roboto_400Regular,
    } from '@expo-google-fonts/roboto';


const ProfileScreen = () => {

    const current_user = (useSelector(selectUser));
    const [user, setUser] = useState(null);

    
    const searchApi = async (id) => {
        //console.log('Hi there!');
        try {
          const response = await users.get('',{

            params:{
                id: id
            }

          })
          
          
          setUser(response.data[0])
        //  console.log(response.data[0])
  
        } catch (err) {
          console.log('Something went wrong');
        }
        
        
      };
    
      useEffect( () => {
        searchApi(current_user)
      }, []);

  //  console.log(current_user);

    let [fontsLoaded] = useFonts({
        OpenSans_300Light,
        OpenSans_300Light_Italic,
        OpenSans_400Regular,
        OpenSans_400Regular_Italic,
        OpenSans_600SemiBold,
        OpenSans_600SemiBold_Italic,
        OpenSans_700Bold,
        OpenSans_700Bold_Italic,
        OpenSans_800ExtraBold,
        Roboto_300Light,
        OpenSans_800ExtraBold_Italic,
        RobotoSlab_700Bold,
        Roboto_400Regular
      });


      if (!fontsLoaded || !user) {
        return <AppLoading />;
      }  



    

    let src = {uri: user.image}
    return (<View style={styles.container}>
        <View style={styles.border}>
        <Image source={src} style = {styles.image}/>
        <View style={styles.nameframe}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        </View>
        <Text style={styles.age}>{`${user.age} years old`}</Text>
        </View>
        <Bar  />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'space-between',
        backgroundColor: 'white'
    },
    image : {
        height: 120,
        width: 100
    },
    nameframe: {
        paddingVertical: 15
    },
    border:{
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        paddingBottom: 10,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    name : {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 22
    },
    email : {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16
    },
    age : {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14
    }
})

export default ProfileScreen;