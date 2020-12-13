import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';

const URL = 'https://newsapi.org/v2/top-headlines';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    console.log(URL);
    try {
      const params = {
        country: 'jp',
        apiKey: Constants.manifest.extra.newsApiKey,
      };
      const res = await axios.get(URL, { params });
      setArticles(res.data.articles);
      console.log(res);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() =>
              navigation.navigate('Article', {
                article: item,
              })
            }
          />
        )}
        keyExtractor={(_, idx) => idx.toString()}
      />
      {loading && <Loading />}
    </SafeAreaView>
  );
}
