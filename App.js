import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewsFeedScreen from './screens/newsfeed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BucketlistScreen from './screens/bucketlist';
import ProfileScreen from './screens/profile';
import AddPostScreen from './screens/addpost';
import SignIn from './screens/SignIn';
import store from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Newsfeed" component={NewsFeedScreen} />
        <Stack.Screen name="Bucketlist" component={BucketlistScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} options={{ title: 'Add a post' }}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
