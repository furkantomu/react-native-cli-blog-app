import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, User, Login, SignIn, SignUp, AccountSettings, OtherProfile} from '../screens';
import Tabs from '../navigation/tabs';
import {useSelector,useDispatch} from 'react-redux';
import SinglePost from '../screens/SinglePost';


const Stack = () => {
 
  const Stack = createStackNavigator();
  const userSignIn = useSelector(state => state.userSignInReducer);
  const {userInfo} = userSignIn;

  return (
  
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userInfo ? (
          <>
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Single" component={SinglePost} />
            <Stack.Screen name="Other" component={OtherProfile} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Settings" component={AccountSettings} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
          </>
        )}
        
        

      </Stack.Navigator>
    </NavigationContainer>
   
  );
};

export default Stack;
