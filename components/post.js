import React from 'react';
import { Text, StyleSheet , View , Image} from "react-native";
import { useEffect,useState } from 'react';
import users from '../api/users';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
} from '@expo-google-fonts/open-sans';

import {
    RobotoSlab_700Bold,
  } from '@expo-google-fonts/roboto-slab';

  import {
    Roboto_300Light,
    Roboto_400Regular,
  } from '@expo-google-fonts/roboto';


const Post = ({item}) =>{

  

    let [fontsLoaded] = useFonts({
        Roboto_300Light,
        RobotoSlab_700Bold,
        Roboto_400Regular
      });

    const [user, setUser] = useState([]);
    var today = new Date();
    const date = today.getDate();


    //get the data of the post's author
    
    const searchApi = async (id) => {
        //console.log('Hi there!');
        try {
          const response = await users.get('',{

            params:{
                id: id
            }

          })
          
          
          setUser(response.data[0])
      //    console.log(response.data[0])
  
        } catch (err) {
          console.log('Something went wrong');
        }
        
        
      };

      useEffect( () => {
        searchApi(item.author)
      }, []);



   const src = {uri: user.image};
   const src2 = {uri: item.image};

   if (!fontsLoaded) {
    return <AppLoading />;
  }

    return(<View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.namesection}>
                <Image source={src} style = {styles.image}/>
                <Text style={[styles.text , {fontFamily: 'RobotoSlab_700Bold' , fontSize: 18}]}>{user.name}</Text>
            </View>
            <View>
                <Text style={[styles.text , {fontFamily: 'Roboto_300Light'}]}>{`${date-item.time}d`}</Text>
            </View>
        </View>
  
        <Image source={src2} style={styles.post} />
        <Text style={[styles.likes , {fontFamily: 'Roboto_400Regular'}]}>{`${item.likes} likes`}</Text>
    </View>)
}

const styles = StyleSheet.create({

    container: {
        paddingTop: '5%',
        borderBottomWidth: 2,
        borderBottomColor: 'dimgray',
        backgroundColor: 'white'
    },

    header: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 25,
      justifyContent: 'space-between'
    },

    image :{
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 50,
        marginRight: 8
    },

    namesection: {
    flexDirection:'row', 
    flexWrap:'wrap'},

    text:{
        paddingTop: 10
    },
    post :{
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginVertical: 10
    },

    likes :{
        marginLeft: 20, 
        marginBottom: 20, 
        fontSize: 16
    }

});
  
export default Post;