import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native';
import { fetchNews, fetchTopVideos } from '@/api/news';

const HomeScreen = () => {
  const [topVideos, setTopVideos] = useState<any[]>([]);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [videos, news] = await Promise.all([fetchTopVideos(), fetchNews()]);
        setTopVideos(videos);
        setLatestNews(news);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderVideo = ({ item }: { item: any }) => (
    <View style={styles.videoContainer}>
      <Image source={{ uri: item.image }} style={styles.videoImage} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </View>
  );

  const renderNews = ({ item }: { item: any }) => (
    <View style={styles.newsContainer}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsTextContainer}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsSource}>{item.source}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={topVideos}
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
    width: 96,
    marginRight: 12,
  },
  videoImage: {
    width: '100%',
    aspectRatio: 3 / 5,
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
    height: 56.25,
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
