import { db } from '@/constants/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// Define a type for the news article data
type NewsArticle = {
  id: string;
  location: 'TOP' | 'BOTTOM';
  image: string;
  index: number;
  status: boolean;
  story: string;
  title: string;
  subTitle: string;
};

export const fetchNews = async () => {
  const newsCollection = collection(db, 'News');
  const q = query(newsCollection, where('status', '==', true), orderBy('index'));
  const querySnapshot = await getDocs(q);
  const topNews: NewsArticle[] = [];
  const latestNews: NewsArticle[] = [];
  querySnapshot.forEach((doc) => {
    const newsData = { id: doc.id, ...doc.data() } as NewsArticle;
    if (newsData.location === 'TOP') {
      topNews.push(newsData);
    } else if (newsData.location === 'BOTTOM') {
      latestNews.push(newsData);
    }
  });
  return { topNews, latestNews };
};
