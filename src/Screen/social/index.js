import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import  Ionicons from "react-native-vector-icons/Ionicons";
import Feather from 'react-native-vector-icons/Feather'
// import Header from "../headers/Header";
import { useNavigation } from "@react-navigation/native";
import { IMAGES } from "../../assets";



const posts = [
  {
    id: "1",
    user: "John Doe",
    profilePic: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?t=st=1740805208~exp=1740808808~hmac=821695b826f2d6c6a81cfe862af35680fd5dac14f6368522e791dd4010b19a2d&w=2000",
    image: "https://i.imgur.com/CzXTtJV.jpg",
    caption: "Beautiful sunset!",
    likes: 120,
  },
  {
    id: "2",
    user: "Emma Watson",
    profilePic: "https://media.istockphoto.com/id/1496615469/photo/serene-latin-woman-enjoy-sunset-with-gratitude.jpg?s=1024x1024&w=is&k=20&c=Boo17hpiJy-am_I4CSMRALI5tPRtTZKrVp2RHlI4wQw=",
    image: "https://i.imgur.com/CzXTtJV.jpg",
    caption: "Love this view!",
    likes: 90,
  },
  {
    id: "3",
    user: "John Doe",
    profilePic: "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?t=st=1740805208~exp=1740808808~hmac=821695b826f2d6c6a81cfe862af35680fd5dac14f6368522e791dd4010b19a2d&w=2000",
    image: "https://i.imgur.com/CzXTtJV.jpg",
    caption: "Beautiful sunset!",
    likes: 90,
  },
  {
    id: "4",
    user: "Emma Watson",
    profilePic: "https://media.istockphoto.com/id/1496615469/photo/serene-latin-woman-enjoy-sunset-with-gratitude.jpg?s=1024x1024&w=is&k=20&c=Boo17hpiJy-am_I4CSMRALI5tPRtTZKrVp2RHlI4wQw=",
    image: "https://i.imgur.com/CzXTtJV.jpg",
    caption: "Love this view!",
    likes: 20,
  },
];

const SocialScreen = () => {
const navigation = useNavigation()
const onJoinPress = (isHost) => {
    console.log('object isHost===========:', isHost);
    navigation.navigate('Live Video', {
        screen: 'AudiencePage',
        params: {
            userID: userID,
            userName: userID,
            liveID: liveID,
        }
    });
};
        const [userID, setUserID] = useState('');
        const [liveID, setLiveID] = useState('1111');
        useEffect(() => {
            setUserID(String(Math.floor(Math.random() * 100000)));
            // setLiveID(String(Math.floor(Math.random() * 10000)));
        }, [])
 
  const renderPost = ({ item }) => {
    console.log('object item---:', item)
    return(
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image source={IMAGES.socialProfile} style={styles.profilePic} />
        <Text style={styles.userName}>{item.user}</Text>
      </View>
      <View style={styles.postActions}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
       <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity> 
        <TouchableOpacity>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post Likes and Caption */}
      <Text style={styles.likes}>{item.likes} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.bold}>{item.user} </Text>
        {item.caption}
      </Text>
      <Text style={styles.caption} numberOfLines={4} onPress={onJoinPress}>
        <Text style={styles.bold}>{'JoinLinl'} </Text>
        {item.profilePic}
      </Text>
    </View>
  )};

  return (
    <View style={styles.container}>
        {/* <Header  /> */}
      {/* Stories Section */}
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        {stories.map((story) => renderStory({ item: story }))}
      </ScrollView> */}
      {/* Posts Section */}
      <FlatList data={posts} renderItem={renderPost} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  storiesContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  storyContainer: { alignItems: "center", marginRight: 15 },
  storyImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: "red" },
  storyText: { fontSize: 12, marginTop: 5 },
  postContainer: { marginBottom: 20 },
  postHeader: { flexDirection: "row", alignItems: "center", padding: 10 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontSize: 14, fontWeight: "bold" },
  postImage: { width: "100%", height: 300 },
  postActions: { flexDirection: "row", padding: 10, gap: 15 },
  likes: { fontWeight: "bold", marginLeft: 10 },
  caption: { marginLeft: 10, marginTop: 5 },
  bold: { fontWeight: "bold" },
});

export default SocialScreen;
