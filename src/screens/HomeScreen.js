import React, {useState, useEffect} from 'react';
import {
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

export default function HomeScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [items, setItems] = useState([]);

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

  useEffect(() => {
    getCategory();
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
              <ImageBackground
                source={{uri: `${item?.cat_img}`}}
                style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
              </ImageBackground>
            )}
          />
        </View>
        {/* <=======Featured Content =========> */}
        <View style={{paddingVertical: 20}}>
          <View style={styles.topHeding}>
            <Text style={styles.title}>Featured Content</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
            <View style={styles.sliderImg}>
              <TouchableOpacity>
                <Image
                  style={styles.slider}
                  source={require('../assets/WalkThrough/img1.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sliderImg}>
              <TouchableOpacity>
                <Image
                  style={styles.slider}
                  source={require('../assets/WalkThrough/img2.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sliderImg}>
              <TouchableOpacity>
                <Image
                  style={styles.slider}
                  source={require('../assets/WalkThrough/img3.png')}
                />
              </TouchableOpacity>
            </View>
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
          <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
            <View style={styles.sliderImg}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Blog Detail')}>
                <Image
                  style={styles.slider}
                  source={require('../assets/images/pool.jpg')}
                />
                <Text style={styles.sliderTitle}>Sports</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderImg}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Blog Detail')}>
                <Image
                  style={styles.slider}
                  source={require('../assets/images/pmjay.jpg')}
                />
                <Text style={styles.sliderTitle}>Goverment</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderImg}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Blog Detail')}>
                <Image
                  style={styles.slider}
                  source={require('../assets/images/god-of-war.jpeg')}
                />
                <Text style={styles.sliderTitle}>Games</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sliderImg}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Blog Detail')}>
                <Image
                  style={styles.slider}
                  source={require('../assets/images/god-of-war.jpeg')}
                />
                <Text style={styles.sliderTitle}>Demo</Text>
              </TouchableOpacity>
            </View>
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
    color: '#FC9358',
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
    width: 140,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  sliderTitle: {
    color: '#000',
    marginHorizontal: 5,
    fontWeight: '600',
  },
  sliderImg: {
    backgroundColor: '#F3F3F3',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#333',
    elevation: 7,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 10,
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
  baner: {
    width: 300,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  //grid View
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 20,
    padding: 10,
    height: 150,
    width: 150,
    display: 'flex',
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});
