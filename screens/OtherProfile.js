import  LinearGradient  from "react-native-linear-gradient";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const OtherProfile = ({ navigation, route }) => {
  const postsListReducer = useSelector((state) => state.postsReducer);
  const { posts } = postsListReducer;

  let { username } = route.params;
  let postList = username && posts.filter((post) => post.username === username);

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginTop: SIZES.padding * 2,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
            ...styles.shadow,
          }}
          onPress={() => navigation.goBack()}
        >
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: SIZES.padding * 6.9,
              borderRadius: SIZES.radius,
              backgroundColor: "#E4E5E6",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{username}'s profile</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderProfile = () => {
    return (
      <View style={{}}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: SIZES.padding,
          }}
        >

          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: SIZES.padding,
            }}
          >
          </View>
        </View>
      </View>
    );
  };

  const renderPostsList = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            marginVertical: SIZES.padding * 2,
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
            }}
          >
            {item.categories.map((item, index) => {
              return (
                <Text
                  style={{
                    marginRight: SIZES.padding,
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
        {renderProfile()}
        {postList && postList.length > 0 ? (
          renderPostsList()
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <Text style={{ marginBottom: SIZES.padding, ...FONTS.body3 }}>
              No posts found
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OtherProfile;

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
