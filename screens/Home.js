import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { getPosts } from "../redux/actions/postsAction";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { getCategoryList } from "../redux/actions/categoryAction";
import  LinearGradient  from "react-native-linear-gradient";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const categoryReducer = useSelector((state) => state.categoryReducer);
  const { category } = categoryReducer;

  const postsListReducer = useSelector((state) => state.postsReducer);
  const { posts, loading } = postsListReducer;

  const userSignIn = useSelector((state) => state.userSignInReducer);
  const { userInfo } = userSignIn;

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
    dispatch(getPosts(selectedCategory));
    dispatch(getCategoryList());
  }, [dispatch, selectedCategory]);


  useEffect(() => {
    var options2 = { day: "numeric" };
    posts &&
      posts.sort((a, b) => {
        return (
          new Date(b.createdAt).toLocaleString("en-GB", options2) -
          new Date(a.createdAt).toLocaleString("en-GB", options2)
        );
      });
  }, []);

  const onSelectCategory = (category) => {
    setSelectedCategory(category);
    posts.filter((a) => a.categories.includes(category));
    let existItem = selectedCategory === category;
    existItem && setSelectedCategory("");
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: "#E4E5E6",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: SIZES.radius,
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>React Blog</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingRight: SIZES.padding,
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

  const renderCategories = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory && selectedCategory == item.name
                ? "#1e3b70"
                : "#E4E5E6",
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item.name)}
        >
          <View
            style={{
              width: 50,
              ...styles.shadow,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory && selectedCategory == item.name
                  ? COLORS.white
                  : COLORS.lightGray,
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
              color:
                selectedCategory && selectedCategory == item.name
                  ? COLORS.white
                  : COLORS.black,
              ...styles.shadow,
              ...FONTS.body4,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
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
  const renderPostsList = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
          }}
          onPress={() => navigation.navigate("Single", { id: item._id })}
        >
          <View>
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : {
                      uri: "https://images.pexels.com/photos/1915340/pexels-photo-1915340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    }
              }
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: 40,
                right: 0,
                width: "50%",
                backgroundColor: "#E4E5E6",
                borderTopLeftRadius: SIZES.radius,
                borderBottomRightRadius: SIZES.radius,

                alignItems: "center",
                justifyContent: "center",
                ...styles.shadow,
              }}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.black }}>
                {item.createdAt
                  ? new Date(item.createdAt).toDateString()
                  : new Date().toDateString()}
              </Text>
            </View>
          </View>
          <Text style={{ ...FONTS.body2, marginTop: SIZES.padding }}>
            {item.title}
          </Text>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {item.categories.map((item, index) => {
              return (
                <Text
                  style={{
                    marginRight: 5,
                    paddingTop: 10,
                  }}
                  key={index}
                >
                  {" "}
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
        data={posts}
        nestedScrollEnabled
        keyExtractor={(item) => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  };
  return (
    <LinearGradient
      colors={["#b8d3fe", "#cfd6e6"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        {renderCategories()}
        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.black}
            style={{ marginTop: SIZES.padding * 2 }}
          />
        ) : (
          <>
              {renderPostsList()}
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding * 3,
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
