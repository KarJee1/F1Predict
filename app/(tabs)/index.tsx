import { fetchNews } from '@/api/news';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const [topNews, setTopNews] = useState<any[]>([]);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { topNews, latestNews } = await fetchNews();
        setTopNews(topNews);
        setLatestNews(latestNews);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderVideo = ({ item }: { item: any }) => (
    <Link href={{ pathname: '/story', params: { title: item.title, story: item.story, image: item.image } }} asChild>
      <TouchableOpacity style={styles.videoContainer}>
        <Image source={{ uri: item.image }} style={styles.videoImage} />
        <Text style={styles.videoTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Link>
  );

  const renderNews = ({ item }: { item: any }) => (
    <Link href={{ pathname: '/story', params: { title: item.title, story: item.story, image: item.image } }} asChild>
      <TouchableOpacity style={styles.newsContainer}>
        <Image source={{ uri: item.image }} style={styles.newsImage} />
        <View style={styles.newsTextContainer}>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsSource}>{item.subTitle}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={topNews}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.videoList}
      />
      <Text style={styles.sectionTitle}>Latest News</Text>
      <FlatList
        data={latestNews}
        renderItem={renderNews}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231010',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  videoContainer: {
    width: 200,
    marginRight: 12,
  },
  videoImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoTitle: {
    color: 'white',
    fontSize: 13,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  newsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  newsSource: {
    color: '#cb9090',
    fontSize: 14,
    marginTop: 4,
  },
});

export default HomeScreen;
