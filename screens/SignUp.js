import React, {useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {useForm, Controller} from 'react-hook-form';
import {register} from '../redux/actions/userAction';

const SignUp = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const userRegisterReducer = useSelector(state => state.userRegisterReducer);
  const {userInfo, loading, error} = userRegisterReducer;
  const dispatch = useDispatch();


  const onSubmit = data => {
    dispatch(register(data));
    
  };



  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
          paddingVertical: SIZES.padding,
          borderWidth: 1,
          borderColor: 'white',
          width: '35%',
          marginLeft: 10,
          borderRadius: 10,
        }}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.lightGray2,
          }}
        />
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.lightGray2,
            marginLeft: SIZES.padding,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  };

  const renderForm = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}>
        {error && (
          <View style={{
            backgroundColor: 'rgb(169, 50, 38)',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent:"center"
          }}>
            <Image 
              source={icons.warning}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                position: "absolute",
                left: 20,
                tintColor:COLORS.lightGray
              }}
            />
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                paddingVertical: 10,
                color: 'white',
              }}>
              {error}
            </Text>
          </View>
        )}

        <View style={{marginTop: SIZES.padding * 1}}>
          <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>Name</Text>
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
                  height: 40,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                placeholder="Enter name"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            defaultValue=""
          />
          {errors.name && (
            <View
              style={{
                position: 'absolute',
                right: 0,
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

        <View style={{marginTop: SIZES.padding * 1}}>
          <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>Surname</Text>
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
                  height: 40,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                placeholder="Enter surname"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="surname"
            defaultValue=""
          />
          {errors.surname && (
            <View
              style={{
                position: 'absolute',
                right: 0,
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
        <View style={{marginTop: SIZES.padding * 1}}>
          <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>
            Username
          </Text>
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
                  height: 40,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                placeholder="Enter username"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
            defaultValue=""
          />
          {errors.username && (
            <View
              style={{
                position: 'absolute',
                right: 0,
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

        <View style={{marginTop: SIZES.padding * 1}}>
          <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>Email</Text>
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
                  height: 40,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                placeholder="Enter email"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <View
              style={{
                position: 'absolute',
                right: 0,
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
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.lightGray, ...FONTS.body3}}>
            Password
          </Text>
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
                  height: 40,
                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                placeholder="Enter Password"
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
              />
            )}
            name="password"
            defaultValue=""
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: errors.password ? 30 : 10,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.invisible}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          {errors.password && (
            <View
              style={{
                position: 'absolute',
                right: 0,
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

        <CustomButton
          buttonText={
            loading ? (
              <ActivityIndicator size="large" color={COLORS.lightGray} />
            ) : (
              'Sign Up'
            )
          }
          buttonContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding * 2,
            borderColor: COLORS.lightGray,
            borderWidth: 1,
            borderRadius: 21,
          }}
          colors={[]}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient
        colors={['rgb(69, 179, 157)', 'rgba(52, 73, 94,.8)']}
        style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderForm()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
