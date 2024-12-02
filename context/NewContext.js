// context/NewsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWorldNews, fetchItalyNews, fetchFirestoreNews, updateFirestoreNews } from '../api/news';
import cacheManager from '../utils/cacheManager';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const cachedNews = await cacheManager.getItem('news');
      if (cachedNews) {
        setNews(cachedNews);
      } else {
        const firestoreNews = await fetchFirestoreNews();
        if (firestoreNews.length > 0) {
          setNews(firestoreNews);
          await cacheManager.setItem('news', firestoreNews);
        } else {
          const [worldNews, italyNews] = await Promise.all([fetchWorldNews(), fetchItalyNews()]);
          const combinedNews = [...worldNews, ...italyNews];
          setNews(combinedNews);
          await updateFirestoreNews(combinedNews);
          await cacheManager.setItem('news', combinedNews);
        }
      }
    } catch (error) {
      console.error('Errore nel recupero delle notizie:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};