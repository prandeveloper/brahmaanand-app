import React, {useState, useEffect, useCallback} from 'react';
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
  Alert,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../components/BannerSlider';
import {sliderData} from '../model/data';
import CustomHeader from '../components/CustomHeader';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import BlogHome from './blogPage/BlogHome';
import HashtagList from './HomePage/HashtagList';

export default function HomeScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const getCategory = () => {
    setRefreshing(true);
    axios
      .get(`http://3.7.173.138:9000/admin/getallCategory`)
      .then(response => {
        //console.log(response.data.data);
        setItems(response.data.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <CustomHeader title="Home" navigation={navigation} />
      <ScrollView style={{margin: 5}}>
        <Carousel
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={340}
          itemWidth={320}
          loop={true}
          autoplay={true}
        />
        {/* <======= Search =========> */}
        <View style={{marginVertical: 20}}>
          <TouchableOpacity
            style={styles.searchMain}
            onPress={() => navigation.navigate('Search')}>
            <Text style={{color: 'gray', fontSize: 16}}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* <=======HashTag=========> */}
        <View>
          <HashtagList />
        </View>
        {/* <=======Top Category =========> */}
        <View style={{marginVertical: 20}}>
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
            itemDimension={140}
            data={items.slice(0, 8)}
            style={styles.gridView}
            //sstaticDimension={300}
            //fixed
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
  erImg: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 7,
    marginVertical: 10,
    marginHorizontal: 5,
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
  //grid View
  gridView: {
    flex: 1,
  },
  itemContainer: {
    height: 160,
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
