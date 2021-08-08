import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  accountUpdate,
  deleteProfile,
  signout,
} from '../redux/actions/userAction';

const AccountSettings = ({navigation}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPasword] = useState('');

  const userSignIn = useSelector(state => state.userSignInReducer);
  const {userInfo} = userSignIn;
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      quality: 1,
      includeBase64: true
    };
    launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setImage(response.assets[0]);
    });
  };

 
  const onSubmit = async data => {
    if (image) {
      let uzanti = image && image.uri.split('.').pop();
      data.profilePic = `data:${image.type}/${uzanti};base64,` + image.base64;
    }
    if (password) {
      data.password = password;
    }
    dispatch(accountUpdate(userInfo && userInfo._id, data));
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    dispatch(deleteProfile(userInfo._id, userInfo.username));
    dispatch(signout());
  };



  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.lightGray3,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: SIZES.padding * 2,
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}>
            <Text style={{...FONTS.h3}}>Account settings</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderImage = () => {
    return (
      <>
        {image && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SIZES.padding,
            }}>
            <Image
              source={{uri: image.uri}}
              resizeMode="cover"
              style={{
                width: '50%',
                height: 200,
              }}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.padding,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginLeft: SIZES.padding,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleDeleteAccount}>
            <Image
              source={icons.delete_account}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
              }}
            />
            <Text style={{marginLeft: 5, color: COLORS.primary}}>
              Delete account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => chooseFile('photo')}>
            <Image
              source={icons.add}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 5,
              }}
            />
            <Text
              style={{color: COLORS.primary, marginRight: SIZES.padding * 2}}>
              Choose Image
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderForm = () => {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.black,
                  paddingLeft: 7,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                returnKeyType="next"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                scrollEnabled={true}
                placeholder="username"
              />
            )}
            name="username"
            defaultValue={userInfo && userInfo.username}
          />

          {errors.username && (
            <View
              style={{
                position: 'absolute',
                right: 15,
                bottom: 10,
                height: 30,
                width: 30,
              }}>
              <Image
                source={icons.cancel_mark}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: '#A93226',
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.black,
                  paddingLeft: 7,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                returnKeyType="next"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                scrollEnabled={true}
                placeholder="name"
              />
            )}
            name="name"
            defaultValue={userInfo && userInfo.name}
          />

          {errors.name && (
            <View
              style={{
                position: 'absolute',
                right: 15,
                bottom: 10,
                height: 30,
                width: 30,
              }}>
              <Image
                source={icons.cancel_mark}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: '#A93226',
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.black,
                  paddingLeft: 7,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                returnKeyType="next"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                scrollEnabled={true}
                placeholder="surname"
              />
            )}
            name="surname"
            defaultValue={userInfo && userInfo.surname}
          />

          {errors.surname && (
            <View
              style={{
                position: 'absolute',
                right: 15,
                bottom: 10,
                height: 30,
                width: 30,
              }}>
              <Image
                source={icons.cancel_mark}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: '#A93226',
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
          }}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.black,
                  paddingLeft: 7,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                returnKeyType="next"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                scrollEnabled={true}
                placeholder="email"
              />
            )}
            name="email"
            defaultValue={userInfo && userInfo.email}
          />

          {errors.email && (
            <View
              style={{
                position: 'absolute',
                right: 15,
                bottom: 10,
                height: 30,
                width: 30,
              }}>
              <Image
                source={icons.cancel_mark}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: '#A93226',
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
          }}>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.black,
              paddingLeft: 7,
              color: COLORS.black,
              ...FONTS.body3,
            }}
            returnKeyType="next"
            placeholderTextColor="rgba(0,0,0,.5)"
            selectionColor={COLORS.black}
            onChangeText={text => setPasword(text)}
            value={password}
            scrollEnabled={true}
            placeholder="password"
            secureTextEntry={!showPassword}
          />
        </View>

        <CustomButton
          // buttonText={
          //   loading ? (
          //     <ActivityIndicator size="large" color={COLORS.lightGray} />
          //   ) : (
          //     'Add Post'
          //   )
          // }
          buttonText="Update"
          buttonContainerStyle={{
            paddingVertical: 18,
            borderColor: COLORS.lightGray,
            borderWidth: 1,
            borderRadius: 21,
            marginVertical: SIZES.padding * 2,
          }}
          colors={['rgb(33, 97, 140)', 'rgb(151, 154, 154 )']}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, marginTop: SIZES.padding}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {renderHeader()}
          {renderImage()}
          {renderForm()}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: SIZES.padding * 2,
  },
});
