import React from 'react';
import { Text, StyleSheet , View , TouchableOpacity, Image , FlatList , Picker} from "react-native";
import { useEffect,useState } from 'react';
import photos from '../api/photos'
import Bar from '../components/bar';
import posts from '../api/posts'
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Photo = ({item , selected}) =>{

   // console.log(selected)

    return <Image source = {{uri: item.image}} style={[styles.image , item.id == selected ? styles.selected : {borderWidth: 0}]}/>
} 







const AddPostScreen = () =>{
    const [selectedItem, setSelectedItem] = useState(1);
    const [selectedPhoto, setSelectedPhoto] = useState("https://images.unsplash.com/photo-1570026517541-258404ea3bfc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHlyYW1pZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80");
    const [results, setResults] = useState([]);
    const [selectedValue, setSelectedValue] = useState("Cairo");
    const current_user = (useSelector(selectUser));
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true)

    var today = new Date();

    const date = today.getDate();

    const likes = Math.floor(Math.random() * 10) + 1;

    const searchApi = async () => {
        //console.log('Hi there!');
        try {
          const response = await photos.get('');
          
          setResults(response.data)
   //       console.log(response.data)
  
        } catch (err) {
          console.log('Something went wrong');
        }
        
        
      };
    
      useEffect( () => {
        searchApi().then(() => {
            setLoading(false);
          })
      }, []);


      const Remove = async (value) =>{
        const existing = await AsyncStorage.getItem(current_user.toString());
        const existingArr = JSON.parse(existing);


        if(existingArr.indexOf(value) != -1)
        {
            
            const idx = existingArr.indexOf(value);
            existingArr.splice(idx , 1);
            await AsyncStorage.setItem(current_user.toString(),JSON.stringify(existingArr)).then( ()=>{
                console.log(existingArr);
                } );;
        }
    }



      const NewPost = async () => {

        try {
            const response = await posts.post('',{

                time: date,
                image: selectedPhoto,
                likes: likes,
                author: current_user,
                location: selectedValue

            })

            console.log(response.data.id);
            if(response)
            {
                Remove(selectedValue);
                navigation.navigate('Newsfeed');
            }
        } 
        catch (err) {
            console.log('Something went wrong');
          }
    };    



    if(loading)
    return <AppLoading />;


      return (<View style={styles.container}>

        <View style={styles.content}>

        <FlatList 
            data={results}
            keyExtractor={item => (item.id).toString()}
            horizontal={false}
            numColumns={3}
            columnWrapperStyle={styles.row}
            renderItem = {({item}) => {
                return (
                <TouchableOpacity onPress={() => {setSelectedItem(item.id); setSelectedPhoto(item.image)}}>
                <Photo item={item} selected={selectedItem}/>
                </TouchableOpacity>)
            }}

            />

        <Picker
        selectedValue={selectedValue}
        style={  styles.picker }
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
        <Picker.Item label="Cairo" value="Cairo" />
        <Picker.Item label="Alexandria" value="Alexandria" />
        <Picker.Item label="Paris" value="Paris" />
        <Picker.Item label="London" value="London" />
        <Picker.Item label="Dahab" value="Dahab" />
        <Picker.Item label="Luxor" value="Luxor" />
      </Picker>
            
            <TouchableOpacity onPress={() => NewPost()}>
            <Text style={styles.button}>+ Add</Text>
            </TouchableOpacity>
         

        </View>    

        

            <Bar />
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'space-between',
        backgroundColor: 'white'
    },
    image: {
        height: 100,width: 100, marginRight: 8
    },
    selected:{
        borderColor: 'darkblue',
        borderWidth: 4
    },
    content: {
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        paddingBottom: 8,
    },
    button: {
        marginTop: 16,
        backgroundColor: 'darkorange',
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        fontSize: 16
    },
    picker:{
        height: 50, width: 150
    }
})


export default AddPostScreen;