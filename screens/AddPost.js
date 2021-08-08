import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { useForm, Controller } from "react-hook-form";
import {
  launchImageLibrary
} from 'react-native-image-picker';
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/actions/postsAction";
import  LinearGradient  from "react-native-linear-gradient";

const AddPost = ({ navigation }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const categoryList = useSelector((state) => state.categoryReducer);
  const { category } = categoryList;

  const user = useSelector((state) => state.userSignInReducer);
  const { userInfo } = user;
  const postsListReducer = useSelector((state) => state.postsReducer);
  const { posts, loading } = postsListReducer;

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (data) => {
    data.username = userInfo.username;

    if (image) {
      let uzanti = image && image.uri.split(".").pop();
      data.image = `data:${image.type}/${uzanti};base64,` + image.base64;
    }
    if (categories.length == 0) {
      Alert.alert("Please select category");
    } else {
      data.categories = categories;
      dispatch(addPost(data));
      //dispatch(getPosts())

      navigation.navigate("Home");
      setCategories([]);
      reset();
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{ flexDirection: "row", height: 50, marginTop: SIZES.padding }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
            ...styles.shadow,
          }}
        >
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: SIZES.padding * 5.8,
              borderRadius: SIZES.radius,
              backgroundColor: "#E4E5E6",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>New Post</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 60,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",

            ...styles.shadow,
          }}
        >
          <Image
            source={
              userInfo && userInfo.profilePic
                ? { uri: userInfo.profilePic }
                : {
                    uri: "https://images.pexels.com/photos/5302784/pexels-photo-5302784.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                  }
            }
            resizeMode="cover"
            style={{
              width: Platform.OS === "ios" ? 50 : 50,
              height: Platform.OS === "ios" ? 50 : 50,
              borderRadius: Platform.OS === "ios" ? 40 : 40,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderAddPost = () => {
    return (
      <View
        style={{
          marginVertical: SIZES.padding * 2,
          ...styles.shadow,
        }}
      >
        {image ? (
          <Image
            source={{ uri: image.uri }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
            }}
          />
        ) : (
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1915340/pexels-photo-1915340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: SIZES.padding,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => chooseFile('photo')}
          >
            <Image
              source={icons.add}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: SIZES.padding,
              }}
            />
            <Text
              style={{ color: COLORS.primary, marginRight: SIZES.padding * 2 }}
            >
              Choose Image
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.black,

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
                placeholder="title"
              />
            )}
            name="title"
            defaultValue=""
          />

          {errors.title && (
            <View
              style={{
                position: "absolute",
                right: 15,
                bottom: 10,
                height: 30,
                width: 30,
              }}
            >
              <Image
                source={icons.cancel_mark}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: "#A93226",
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.black,

                  color: COLORS.black,
                  ...FONTS.body3,
                }}
                placeholderTextColor="rgba(0,0,0,.5)"
                selectionColor={COLORS.black}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                scrollEnabled={true}
                placeholder="Tell me your story!"
                multiline
              />
            )}
            name="desc"
            defaultValue=""
          />

          {errors.desc && (
            <View
              style={{
                position: "absolute",
                right: 15,
                bottom: 10,
                height: 30,
                width: 30,
              }}
            >
              <Image
                source={icons.cancel_mark}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: "#A93226",
                }}
              />
            </View>
          )}
        </View>

        <TouchableOpacity>
          <CustomButton
            buttonText={
              loading ? (
                <ActivityIndicator size="large" color={COLORS.lightGray} />
              ) : (
                "Add Post"
              )
            }
            buttonContainerStyle={{
              paddingVertical: 18,
              borderColor: COLORS.lightGray,
              borderWidth: 1,
              borderRadius: 21,
              marginVertical: SIZES.padding * 2,
              marginHorizontal: SIZES.padding,
            }}
            colors={["rgb(33, 97, 140)", "rgb(151, 154, 154 )"]}
            onPress={handleSubmit(onSubmit)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategory = () => {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            backgroundColor: "#E4E5E6",
            borderRadius: SIZES.radius,
            marginHorizontal: 10,
            ...styles.shadow,
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: SIZES.padding,
              //backgroundColor:selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: SIZES.padding,
            }}
            onPress={() => {
              const existItem = categories.find((x) => x === item.name);
              if (existItem) {
                return { ...categories };
              } else {
                return setCategories((categories) => [
                  ...categories,
                  item.name,
                ]);
              }
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.lightGray,
                ...styles.shadow,

                //backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
              }}
            >
              <Image
                source={icons.tag}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.primary,
                }}
              />
            </View>

            <Text
              style={{
                marginTop: SIZES.padding,
                //color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                ...FONTS.body5,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  };
  const renderSelectedCategory = () => {
    return (
      <>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.primary,
            marginLeft: SIZES.padding,
            marginBottom: 5,
          }}
        >
          Selected Tags:
        </Text>
        {categories && (
          <LinearGradient
            colors={["#E684AE", "#77A1D3"]}
            start={{ x: -0.9, y: 0 }}
            end={{ x: 1.4, y: 0 }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding,
                height: 58,
                ...styles.shadow,
              }}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#cfd6e6",
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: 15,
                        marginHorizontal: 5,
                        ...styles.shadow,
                      }}
                      onPress={() => {
                        setCategories(categories.filter((x) => x !== item));
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          right: 10,
                          top: 6,
                        }}
                      >
                        <Image
                          source={icons.cancel_mark}
                          resizeMode="contain"
                          style={{
                            width: 10,
                            height: 10,
                            tintColor: "#B20000",
                          }}
                        />
                      </View>
                      <Text style={{}}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </LinearGradient>
        )}
      </>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      enabled
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ marginTop: Platform.OS === "ios" ? SIZES.padding* 1.1 : SIZES.padding * 3 }}>
          {renderHeader()}
          {renderCategory()}
          {renderSelectedCategory()}
          {renderAddPost()}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8d3fe",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
