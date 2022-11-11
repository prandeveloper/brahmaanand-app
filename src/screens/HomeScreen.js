import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../components/BannerSlider';
import {freeGames, paidGames, sliderData} from '../model/data';
import CustomHeader from '../components/CustomHeader';
import {Searchbar} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function HomeScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [items, setItems] = useState([]);
  const [blog, setBlog] = useState([]);
  const [content, setContent] = useState([]);

  const [playing, setPlaying] = useState(false);

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
    axios
      .get(`http://43.205.82.226:9000/admin/getallCategory`)
      .then(response => {
        //console.log(response.data.data);
        setItems(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getFeaturedContent = () => {
    axios
      .get(`http://3.7.173.138:9000/admin/admin_featured_cnt`)
      .then(response => {
        console.log(response.data.data);
        setContent(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getBlogs = () => {
    axios
      .get(`http://43.205.82.226:9000/admin/getBlog`)
      .then(response => {
        //console.log(response.data.data);
        setBlog(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategory();
    getBlogs();
    getFeaturedContent();
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
          <View style={styles.searchMain}>
            {/* <View>
              <Text style={styles.searchText}>Search</Text>
            </View> */}
            <View>
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>

        {/* <=======HashTag=========> */}
        <View style={{paddingVertical: 20}}>
          <View style={styles.topHeding}>
            <Text style={styles.title}>#Hashtag</Text>
            {/* <TouchableOpacity>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity> */}
          </View>
          <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
            <View style={styles.sliderHash}>
              <TouchableOpacity>
                <Text style={styles.hashText}>#education</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderHash}>
              <TouchableOpacity>
                <Text style={styles.hashText}>#education</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderHash}>
              <TouchableOpacity>
                <Text style={styles.hashText}>#education</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderHash}>
              <TouchableOpacity>
                <Text style={styles.hashText}>#education</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderHash}>
              <TouchableOpacity>
                <Text style={styles.hashText}>#education</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* <=======Top Category =========> */}
        <View style={{paddingVertical: 30}}>
          <View style={styles.topHeding}>
            <Text style={styles.title}>Top Category</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatGrid
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
                }>
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
            {/* <TouchableOpacity>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity> */}
          </View>
          <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
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
        <View style={{paddingVertical: 30}}>
          <View style={styles.topHeding}>
            <Text style={styles.title}>Latest Blogs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            style={{flexDirection: 'row', marginBottom: 20}}>
            {blog?.slice(0, 10).map(bList => (
              <View style={styles.sliderImg} key={bList._id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Blog Detail', {id: bList._id})
                  }>
                  <Image
                    style={styles.slider}
                    source={{uri: `${bList.blogImg}`}}
                  />
                  <Text style={styles.sliderTitle}>{bList?.blog_title}</Text>
                  <View style={styles.blogMaster}>
                    <Image
                      style={styles.blogMasterImage}
                      source={{uri: `${bList.posted_by_img}`}}
                    />
                    <Text style={styles.blogMasterText}>
                      {bList?.posted_by}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  searchMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
