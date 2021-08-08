import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {getPosts} from '../redux/actions/postsAction';
import {signout} from '../redux/actions/userAction';

const User = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const postsListReducer = useSelector(state => state.postsReducer);
  const {posts} = postsListReducer;

  const userSignIn = useSelector(state => state.userSignInReducer);
  const {userInfo} = userSignIn;

  let postList =
    userInfo && posts.filter(post => post.username === userInfo.username);

  const signOut = () => {
    dispatch(signout());
  };

  const renderHeader = () => {
    return (
      <View
        style={{flexDirection: 'row', height: 50, marginTop: SIZES.padding}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.blogger}
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
              paddingHorizontal: SIZES.padding * 6.9,
              borderRadius: SIZES.radius,
              backgroundColor: '#E4E5E6',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h3}}>Profile</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            paddingRight: SIZES.padding * 2,

            justifyContent: 'center',
            ...styles.shadow,
          }}
          onPress={signOut}>
          <Image
            source={icons.exit}
            resizeMode="contain"
            style={{
              width: 35,
              height: 35,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderPostsList = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            marginVertical: SIZES.padding * 2,
          }}
          onPress={() => navigation.navigate('Single', {id: item._id})}>
          <View>
            <Image
              source={
                item.image
                  ? {uri: item.image}
                  : {
                      uri: 'https://images.pexels.com/photos/1915340/pexels-photo-1915340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    }
              }
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 40,
                right: 0,
                width: '50%',
                backgroundColor: '#E4E5E6',
                borderTopLeftRadius: SIZES.radius,
                borderBottomRightRadius: SIZES.radius,

                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.black}}>
                {item.createdAt
                  ? new Date(item.createdAt).toDateString()
                  : new Date().toDateString()}
              </Text>
            </View>
          </View>
          <Text style={{...FONTS.body2, marginTop: SIZES.padding}}>
            {item.title}
          </Text>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {item.categories.map((item, index) => {
              return (
                <Text
                  style={{
                    marginRight: SIZES.padding,
                  }}
                  key={index}>
                  {' '}
                  #{item}
                </Text>
              );
            })}
            <Image
              source={icons.tag}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={postList}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  };

  const renderProfile = () => {
    return (
      <View style={{}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderBottomWidth: 0.5,
          }}>
          <View
            style={{
              width: 110,
              height: 110,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.radius,
              ...styles.shadow,
              marginVertical: SIZES.padding * 2,
            }}>
            <Image
              source={
                userInfo && userInfo.profilePic
                  ? {uri: userInfo.profilePic}
                  : {
                      uri: 'https://images.pexels.com/photos/5302784/pexels-photo-5302784.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    }
              }
              resizeMode="cover"
              style={{
                width: Platform.OS === 'ios' ? 140 : 140,
                height: Platform.OS === 'ios' ? 140 : 140,
                borderRadius: Platform.OS === 'ios' ? 65 : 65,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: SIZES.padding,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>
              {userInfo && userInfo.username}
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: SIZES.padding,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('Settings')}>
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
              />
              <Text>Account settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <LinearGradient
      colors={['#b8d3fe', '#cfd6e6']}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        {renderProfile()}
        {postList && postList.length > 0 ? (
          renderPostsList()
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}>
            <Text style={{marginBottom: SIZES.padding, ...FONTS.body3}}>
              No posts found
            </Text>
            <TouchableOpacity onPress={() => navigation.jumpTo('AddPost')}>
              <Text style={{...FONTS.h3, color: COLORS.primary}}>
                Do you want to add a new post?
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
