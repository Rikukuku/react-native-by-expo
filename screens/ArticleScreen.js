import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { AddClip, DeleteClip } from '../store/actions/user';
import ClipButton from '../components/ClipButton';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ArticleScreen = ({ route }) => {
  const { article } = route.params;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { clips } = user;

  const isCliped = () => {
    return clips.some((clip) => clip.url === article.url);
  };

  const toggleClip = () => {
    if (isCliped()) {
      dispatch(DeleteClip({ clip: article }));
    } else {
      dispatch(AddClip({ clip: article }));
    }
  };
  return (
    <SafeAreaView style={styles.contaier}>
      <ClipButton onPress={toggleClip} enabled={isCliped()} />
      <WebView
        source={{ uri: article.url }}
        renderLoading={() => <Loading />}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
};

export default ArticleScreen;
