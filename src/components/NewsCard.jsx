import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NewsCard = ({item, width, height, navigation}) => {
  return (
    <Pressable onPress={() => navigation.navigate('NewsDetail', {article: item})} style={[styles.container, {height: height* 0.35, width: width* 0.9}]}>
        <Image source={{uri: item.image}} style={[styles.image, {height: height * 0.2}]}/>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
    </Pressable>
  )
}

export default NewsCard

const styles = StyleSheet.create({
    container: {
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "white",
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      },
      image: {
        width: "100%",
        borderRadius: 8,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5,
      },
      description: {
        fontSize: 14,
        color: "gray",
      },
})