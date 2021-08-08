import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {useSelector} from 'react-redux';

const Search = () => {
  const [query, setQuery] = useState();
  const [error, setError] = useState();
  const [searchList, setSearchList] = useState([]);
  const userSignIn = useSelector(state => state.userSignInReducer);
  const {userInfo} = userSignIn;

  const postsListReducer = useSelector(state => state.postsReducer);
  const {posts} = postsListReducer;

  const updateSearch = value => {
    if (value) {
      setSearchList(
        posts.filter(item => {
          return (
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.desc.toLowerCase().includes(value.toLowerCase()) ||
            item.username.toLowerCase().includes(value.toLowerCase())
          );
        }),
      );
    }
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
            ...styles.shadow,
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: '#E4E5E6',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.radius,
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h3}}>Search</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingRight: SIZES.padding,
            justifyContent: 'center',
            ...styles.shadow,
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
              width: Platform.OS === 'ios' ? 50 : 50,
              height: Platform.OS === 'ios' ? 50 : 50,
              borderRadius: Platform.OS === 'ios' ? 40 : 40,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchBarcontainer}>
        <View style={styles.searchContainer}>
          <View style={styles.vwSearch}>
            <Image
              style={{
                width: 18,
                height: 18,
              }}
              source={icons.search}
            />
          </View>

          <TextInput
            value={query}
            placeholder="Search"
            style={styles.textInput}
            onChangeText={text => {
              setQuery(text);
              updateSearch(text);
            }}
          />
          {query ? (
            <TouchableOpacity
              onPress={() => setQuery('')}
              style={styles.vwClear}>
              <Image
                style={{
                  tintColor: 'red',
                  width: 25,
                  height: 25,
                }}
                source={icons.delete_input}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.vwClear} />
          )}
        </View>
      </View>
    );
  };

  const renderPostsList = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
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
              alignItems: 'center',
            }}>
            {item.categories.map((item, index) => {
              return (
                <Text
                  style={{
                    marginRight: 5,
                    paddingTop: 10,
                  }}
                  key={index}>
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
                marginRight: 5,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={searchList}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}
      enabled>
      <LinearGradient
        colors={['#b8d3fe', '#cfd6e6']}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          {renderHeader()}
          {renderSearchBar()}
          {query ? renderPostsList() : <></>}
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Search;

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
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    // backgroundColor: 'green',
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 40,
    // backgroundColor: 'red'
  },

  searchContainer: {
    backgroundColor: COLORS.transparent,
    width: '90%',
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  searchBarcontainer: {
    height: 80,
    alignItems: 'center',
    marginTop: SIZES.padding * 3,
    // height: '100%', width: '100%'
  },
});
