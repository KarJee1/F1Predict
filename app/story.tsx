import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const StoryScreen = () => {
  const params = useLocalSearchParams();
  const title = Array.isArray(params.title) ? params.title[0] : params.title;
  const story = Array.isArray(params.story) ? params.story[0] : params.story;
  const image = Array.isArray(params.image) ? params.image[0] : params.image;

  const truncatedTitle = typeof title === 'string' && title.length > 10 ? `${title.substring(0, 10)}...` : title;

  return (
    <>
      <Stack.Screen
        options={{
          title: truncatedTitle,
          headerBackTitle: 'Home',
        }}
      />
      <ScrollView style={styles.container}>
        {typeof image === 'string' && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.story}>{story}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221111',
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  story: {
    color: '#e0e0e0',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default StoryScreen;
