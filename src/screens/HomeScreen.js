import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../components/BannerSlider';
import {sliderData} from '../model/data';
import CustomHeader from '../components/CustomHeader';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';
import BlogHome from './blogPage/BlogHome';

export default function HomeScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const [content, setContent] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [hashTag, setHashTag] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
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

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const getCategory = () => {
    setRefreshing(true);
    axios
      .get(`http://43.205.82.226:9000/admin/getallCategory`)
      .then(response => {
        //console.log(response.data.data);
        setItems(response.data.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
    getCategory();
    getFeaturedContent();
    getHashtag();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <CustomHeader title="Home" navigation={navigation} />
      <ScrollView style={{padding: 10}}>
        <Carousel
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={340}
          itemWidth={320}
          loop={true}
          autoplay={true}
        />
        {/* <======= Search =========> */}
        <View style={{paddingVertical: 20}}>
          <TouchableOpacity
            style={styles.searchMain}
            onPress={() => navigation.navigate('Search')}>
            <Text style={{color: 'gray', fontSize: 16}}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* <=======HashTag=========> */}
        <View style={{paddingVertical: 20}}>
          <View style={styles.topHeding}>
            <Text style={styles.title}>Popular Searches</Text>
            {/* <TouchableOpacity>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity> */}
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
        {/* <=======Top Category =========> */}
        <View style={{paddingVertical: 10}}>
          <View style={styles.topHeding}>
            <Text style={styles.title}>Top Category</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatGrid
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            itemDimension={130}
            data={items.slice(0, 8)}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Sub-Category', {id: item._id})
                }
                key={item?._id}>
                <ImageBackground
                  source={{uri: `${item?.cat_img}`}}
                  style={styles.itemContainer}>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>{item.title}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* <=======Featured Content =========> */}
        <View style={{paddingVertical: 20}}>
          <View style={styles.topHeding}>
            <Text style={styles.title}>Featured Content</Text>
          </View>
          <ScrollView
            horizontal={true}
            style={{flexDirection: 'row'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {content?.map(video => (
              <View style={styles.featureStyle} key={video._id}>
                <YoutubePlayer
                  width={280}
                  height={250}
                  play={playing}
                  videoId={video.video_link}
                  onChangeState={onStateChange}
                  autoplay={false}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* <=======Latest Blogs =========> */}
        <View>
          <BlogHome />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  searchMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 20,
    height: 55,
    paddingHorizontal: 10,
  },
  searchText: {
    color: '#FC9358',
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 10,
  },
  searchInput: {
    width: 320,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
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
  baner: {
    width: 300,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  //grid View
  gridView: {
    flex: 1,
  },
  itemContainer: {
    height: 170,
  },
  itemView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
    margin: 10,
  },
  featureStyle: {
    backgroundColor: '#FFF',
    margin: 5,
    elevation: 5,
  },
});
