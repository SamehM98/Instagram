import React from 'react';
import { StyleSheet, Text, View , FlatList, Touchable, TouchableOpacity , RefreshControl} from 'react-native';
import Post from '../components/post';
import Bar from '../components/bar';
import posts from '../api/posts';
import { useEffect,useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Linking } from "react-native";
import { useIsFocused } from '@react-navigation/native';



const NewsFeedScreen = ({navigation}) =>{

  
  var today = new Date();
  const date = today.getDate();
  const isFocused = useIsFocused();

    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    

    const searchApi = async () => {
      //console.log('Hi there!');
      try {
        const response = await posts.get('');
        
        setResults(response.data)

      } catch (err) {
        console.log('Something went wrong');
      }
      
      
    };
  
    useEffect( () => {
      searchApi()
    }, [isFocused]);

    
  const onRefresh = () => {
    setRefreshing(true);
    searchApi().then(() => setRefreshing(false));
  }

    //sort posts by the most recent
    
    function compare(a, b) {
      
      const dateA = date - a.time;
      const dateB = date - b.time;

      const idA = a.id;
      const idB = b.id;
    
      let comparison = 0;
      if (dateA > dateB) {
        comparison = 1;
      } else if (dateA < dateB) {
        comparison = -1;
      }
      else if(dateA == dateB){
        if(idA > idB)
          comparison = -1;
        else
          comparison = 1;
      }
      return comparison;
    }

    results.sort(compare);


    return (
        <View style={styles.container}>

          <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
          <Text style={styles.button}>+ Add a new post</Text>
          </TouchableOpacity>

        <FlatList data={results} vertical

        keyExtractor={item => (item.id).toString()}
        
        renderItem = {({item}) => {
          return <Post item={item}/>
        }}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        />
    
        <Bar />
    
        
        </View>
      );
}

const styles = StyleSheet.create({

    container: {
      paddingTop: '5%',
      flex: 1,
      backgroundColor: 'white'
  },

  button:{
    marginLeft: 25,
    marginBottom: 15,
    backgroundColor: 'cornsilk',
    color: 'black',
    alignSelf: 'flex-start',
    padding: 12,
    fontWeight: 'bold'
  }

});

export default NewsFeedScreen;