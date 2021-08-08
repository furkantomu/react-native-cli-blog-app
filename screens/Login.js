import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import {images, SIZES, COLORS, FONTS} from '../constants';

const Login = ({navigation}) => {
  const renderHeader = () => {
    return (
      <View
        style={{
          //height: SIZES.height > 700 ? '65%' : '60%',
          height: "70%"
        }}>
        <ImageBackground
          source={images.loginBg}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          resizeMode="cover">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['rgba(32, 32, 32, 0)', 'rgba(0, 0, 0, 1)']}
            style={{
              height: 200,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <Text
              style={{
                width: '80%',
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 55,
              }}>
              Get Started
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };
  const renderDetail = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            
            width: '90%',
            color: COLORS.lightGray2,
            ...FONTS.body3,
          }}>
          A very inspiring blog with motivational stories!
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}>
          <CustomButton
            buttonText="Sign In"
            buttonContainerStyle={{
              paddingVertical:18,
              borderRadius:20,
              marginTop:SIZES.padding
            }}
            colors={['rgb(9, 121, 105)', 'rgba(8, 143, 143,.7)']}
            onPress={() => navigation.navigate('Sign In')}
          />
          <CustomButton
            buttonText="Sign Up"
            buttonContainerStyle={{
              paddingVertical:18,
              marginTop:SIZES.padding,
              borderColor:COLORS.lightGray,
              borderWidth:1,
              borderRadius:21,
            }}
            colors={[]}
            onPress={() => navigation.navigate('Sign Up')}
          />
          
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      {renderDetail()}
    </View>
  );
};

export default Login;
