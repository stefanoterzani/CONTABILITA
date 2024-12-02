// api/news.js
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

const API_NEWS_WORLD = 'https://api.example.com/world-news';
const API_NEWS_ITALY = 'https://api.example.com/italy-news';

export const fetchWorldNews = async () => {
  const response = await axios.get(API_NEWS_WORLD);
  return response.data;
};

export const fetchItalyNews = async () => {
  const response = await axios.get(API_NEWS_ITALY);
  return response.data;
};

export const fetchFirestoreNews = async () => {
  const snapshot = await firestore().collection('news').get();
  return snapshot.docs.map(doc => doc.data());
};

export const updateFirestoreNews = async (news) => {
  const batch = firestore().batch();
  news.forEach((item, index) => {
    const docRef = firestore().collection('news').doc(`news_${index}`);
    batch.set(docRef, item);
  });
  await batch.commit();
};