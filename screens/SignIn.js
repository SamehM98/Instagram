import React from 'react';
import { Text, StyleSheet , View , TextInput, TouchableOpacity, Image , Alert} from "react-native";
import {useState } from 'react';
import users from '../api/users';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signin } from '../userSlice';




const SignIn = () =>{

    const navigation = useNavigation();
    


    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  
    const authenticate = async (mail , pwd) =>{
        //console.log('Hi there!');
        try {
          const response = await users.get('',{
    
            params:{
                email: mail
            }
    
          })
          
          

          if(response.data.length)
          {
            if(response.data[0].password == pwd)
            {
                dispatch(signin(response.data[0].id))
                navigation.navigate('Newsfeed');
            }
            
            else
            {
                Alert.alert(
                    "Unable to login",
                    "Wrong Password",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
              }

          }
          
          else
          {
            Alert.alert(
                "Unable to login",
                "Account does not exist",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
          }

    
        } catch (err) {
            //setResult(0);
            console.log('something went wrong');
        }
        
        
      };

    return <View style={styles.container}>
        <Image source={require('../assets/instagram-logo-png-2439.png')} style={styles.image}/>
        <View style={styles.content}>

        <TextInput style={styles.textinput} 
        numberOfLines={1} 
        placeholder="E-mail" 
        autoCapitalize={'none'} keyboardType={'email-address'}
        onChangeText = {email => setEmail(email)}/>

        <TextInput style={styles.textinput} 
        numberOfLines={1} placeholder="Password"
         autoCapitalize={'none'} textContentType={'password'} secureTextEntry={true} 
         onChangeText = {password => setPassword(password)}/>

        </View>

        <TouchableOpacity onPress={() => {
            authenticate(email , password)}
            }>
        <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        paddingTop: '15%',
        backgroundColor: 'white'
    },
    image:{
        height: 80 , width: 80
    },
    textinput:{
        backgroundColor: 'ivory',
        paddingVertical: 7,
        paddingLeft: 6,
        width: 250,
        marginBottom: 16,
        borderColor: 'dimgray',
        borderWidth: 3
    },
    content:{
        marginVertical: 30
    },
    button: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    }
})


export default SignIn;