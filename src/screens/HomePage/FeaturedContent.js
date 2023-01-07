import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';

const FeaturedContent = () => {
  const [content, setContent] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFeaturedContent();
  }, []);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const getFeaturedContent = () => {
    setRefreshing(true);
    axios
      .get(`http://3.7.173.138:9000/admin/admin_featured_cnt`)
      .then(response => {
        //console.log(response.data.data);
        setContent(response.data.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFeaturedContent();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {content?.map(video => (
          <View style={styles.featureStyle} key={video._id}>
            <YoutubePlayer
              width={300}
              height={200}
              play={playing}
              videoId={video.video_link}
              onChangeState={onStateChange}
              autoplay={false}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeaturedContent;

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },

  topHeding: {
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //marginBottom: 10,
  },

  featureStyle: {
    backgroundColor: '#000',
    margin: 5,
    elevation: 5,
    alignItems: 'center',
  },
});

//  <View style={styles.topHeding}>
//    <Text style={styles.title}>Featured Content</Text>
//  </View>;
