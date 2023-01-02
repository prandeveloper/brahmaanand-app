import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function BlogHome() {
  const navigation = useNavigation();
  const [blog, setBlog] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getBlogs = () => {
    setRefreshing(true);
    axios
      .get(`http://3.7.173.138:9000/admin/getBlog`)
      .then(response => {
        //console.log(response.data.data);
        setBlog(response.data.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <View style={{paddingVertical: 30}}>
      <View style={styles.topHeding}>
        <Text style={styles.title}>Latest Blogs</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
          <Text style={styles.viewAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        style={{flexDirection: 'row', marginBottom: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {blog?.slice(0, 10).map(bList => (
          <View style={styles.sliderImg} key={bList._id}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Blog Detail', {id: bList._id})
              }>
              <Image style={styles.slider} source={{uri: `${bList.blogImg}`}} />
              <Text style={styles.sliderTitle}>{bList?.blog_title}</Text>
              <View style={styles.blogMaster}>
                <Image
                  style={styles.blogMasterImage}
                  source={{uri: `${bList.posted_by_img}`}}
                />
                <Text style={styles.blogMasterText}>{bList?.posted_by}</Text>
              </View>
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
  viewAll: {
    color: '#6F6F6F',
    fontSize: 15,
    fontWeight: '500',
  },

  topHeding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  slider: {
    width: 180,
    height: 140,
    marginHorizontal: 0,
    borderRadius: 10,
  },
  sliderTitle: {
    color: '#000',
    marginHorizontal: 5,
    fontWeight: '600',
    margin: 10,
  },
  sliderImg: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 7,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  blogMaster: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  blogMasterImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  blogMasterText: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
});
