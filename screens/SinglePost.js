import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../components/CustomButton';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {useForm, Controller} from 'react-hook-form';
import {deletePost, updatePost} from '../redux/actions/postsAction';

const SinglePost = ({route, navigation}) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);

  const userSignIn = useSelector(state => state.userSignInReducer);
  const {userInfo} = userSignIn;

  const postsListReducer = useSelector(state => state.postsReducer);
  const {posts} = postsListReducer;

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  let {id} = route.params;
  let update = posts && posts.filter(post => post._id === id);

  const chooseFile = type => {
    let options = {
      mediaType: type,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
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
    data.username = userInfo.username;
    if (image) {
      let uzanti = image.uri.split('.').pop();
      data.image = `data:${image.type}/${uzanti};base64,` + image.base64;
    }

    dispatch(updatePost(update[0] && update[0]._id, data));
    setUpdateMode(false);
  };

  const postDeleted = () => {
    const deletedPost = {
      username: update[0] && update[0].username,
    };

    dispatch(deletePost(update[0] && update[0]._id, deletedPost));
  };

  const updateModeChange = () => {
    setUpdateMode(updateMode => !updateMode);
    setTitle(title => (title = update[0] && update[0].title));
    setDesc(desc => (desc = update[0] && update[0].desc));
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
            marginTop: SIZES.padding * 2,
            ...styles.shadow,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          <View
            style={{
              height: 50,
              marginTop: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: '#E4E5E6',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h3}}>{userInfo.username}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
            marginTop: SIZES.padding * 2,
            ...styles.shadow,
          }}
          onPress={updateModeChange}
          disabled={
            update[0] && update[0].username === userInfo.username ? false : true
          }>
          <Image
            source={icons.edit}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderPostInfo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        {update[0] && update[0].username === userInfo.username && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: SIZES.padding * 2,
              alignItems: 'center',
            }}
            onPress={postDeleted}>
            <Image
              source={icons.delete_}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
                marginRight: 2,
              }}
            />
            <Text style={{color: COLORS.primary}}>Delete post</Text>
          </TouchableOpacity>
        )}
        {image ? (
          <View style={{...styles.shadow, marginTop: SIZES.padding}}>
            <Image
              source={{uri: image.uri}}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
              }}
            />
          </View>
        ) : (
          <View style={{...styles.shadow, marginTop: SIZES.padding}}>
            <Image
              source={
                update[0] && update[0].image
                  ? {uri: update[0].image && update[0].image}
                  : {
                      uri: 'https://images.pexels.com/photos/1915340/pexels-photo-1915340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    }
              }
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
              }}
            />
          </View>
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 40,
            right: 0,
            width: '50%',
            backgroundColor: 'rgba(255,255,255,1)',
            borderTopLeftRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          <Text style={{...FONTS.h4, color: COLORS.black}}>
            {update[0].createdAt
              ? new Date(update[0].createdAt).toDateString()
              : new Date().toDateString()}
          </Text>
        </View>
      </View>
    );
  };

  const renderPostDesc = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: SIZES.padding * 2}}>Author:</Text>
            <TouchableOpacity
              style={{
                marginLeft: 4,
                justifyContent: 'center',
                height: 40,
              }}
              onPress={() =>
                navigation.navigate('Other', {username: update[0].username})
              }>
              <Text style={{color: COLORS.primary}}>{update[0].username}</Text>
            </TouchableOpacity>
          </View>
          {updateMode && (
            <TouchableOpacity
              style={{
                paddingRight: SIZES.padding * 2,
              }}
              activeOpacity={0.5}
              onPress={() => chooseFile('photo')}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.primary,
                  }}
                />
                <Text
                  style={{color: COLORS.primary, marginLeft: SIZES.padding}}>
                  Choose Image
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#cfd6e6',
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 1.9,
            justifyContent: 'center',
            ...styles.shadow,
          }}>
          {updateMode ? (
            <View style={{paddingHorizontal: SIZES.padding * 2}}>
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
                      minWidth: '80%',
                      color: COLORS.black,
                      ...FONTS.body3,
                      paddingLeft: 5,
                    }}
                    placeholderTextColor="rgba(0,0,0,.5)"
                    selectionColor={COLORS.black}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    scrollEnabled={true}
                  />
                )}
                name="title"
                defaultValue={title}
              />

              {errors.title && (
                <View
                  style={{
                    position: 'absolute',
                    right: 10,
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
          ) : (
            <View
              style={{
                width: '100%',
                ...styles.shadow,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                }}>
                {update[0] && update[0].title}
              </Text>
            </View>
          )}
        </View>
        {updateMode ? (
          <View>
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
                    marginHorizontal: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    color: COLORS.black,
                    ...FONTS.body3,
                  }}
                  placeholderTextColor="rgba(0,0,0,.5)"
                  selectionColor={COLORS.black}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                />
              )}
              name="desc"
              defaultValue={desc}
            />

            {errors.desc && (
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
        ) : (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.padding,
            }}>
            <Text style={{...FONTS.body2}}>{update[0] && update[0].desc}</Text>
          </View>
        )}
        {updateMode && (
          <TouchableOpacity>
            <CustomButton
              buttonText="Edit"
              buttonContainerStyle={{
                paddingVertical: 18,
                borderColor: COLORS.lightGray,
                borderWidth: 1,
                borderRadius: 21,
                marginVertical: SIZES.padding * 2,
                marginHorizontal: SIZES.padding,
              }}
              colors={['rgb(33, 97, 140)', 'rgb(151, 154, 154 )']}
              onPress={handleSubmit(onSubmit)}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#b8d3fe'}}>
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        {update[0] ? (
          <>
            {renderPostInfo()}
            {renderPostDesc()}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#ccc',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SIZES.padding * 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={icons.checked}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Text style={{marginLeft: SIZES.padding}}>
                Post has been deleted
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8d3fe',
    marginTop: SIZES.padding * 3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
