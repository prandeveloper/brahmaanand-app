import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function HashtagList() {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [hashTag, setHashTag] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getHashtag = () => {
    setRefreshing(true);

    axios
      .get(`http://3.7.173.138:9000/admin/getTrending`)
      .then(response => {
        //console.log(response.data.data);
        setHashTag(response.data.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHashtag();
  }, []);
  return (
    <View style={{marginVertical: 20}}>
      <View style={styles.topHeding}>
        <Text style={styles.title}>Popular Searches</Text>
      </View>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {hashTag?.map(hash => (
          <View style={styles.sliderHash} key={hash?._id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Resource List', {name: hash?.topics})
              }>
              <Text style={styles.hashText}>#{hash?.topics}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },

  topHeding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sliderHash: {
    backgroundColor: '#848482',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  hashText: {
    color: '#fff',
  },
});
