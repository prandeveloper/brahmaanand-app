import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import {Searchbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ResourceList = ({route, navigation}) => {
  const {id} = route.params;
  console.log(id);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const getResourceList = () => {
    axios
      .get(`http://43.205.82.226:9000/admin/listbysubcategory/${id}`)
      .then(response => {
        console.log(response.data.data);
        setItems(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getResourceList();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 9}}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchInput}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name="filter" color={'#000'} size={25} />
        </View>
      </View>

      {/* <=======Latest Blogs =========> */}
      <View style={{paddingVertical: 10, marginHorizontal: 10}}>
        <View style={styles.topHeding}>
          <Text style={styles.title}>Promotions</Text>
        </View>
        <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
          <View style={styles.sliderImg}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Blog Detail')}>
              <Image
                style={styles.slider}
                source={require('../../assets/images/pool.jpg')}
              />
              <Text style={styles.sliderTitle}>Sports</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sliderImg}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Blog Detail')}>
              <Image
                style={styles.slider}
                source={require('../../assets/images/pmjay.jpg')}
              />
              <Text style={styles.sliderTitle}>Goverment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sliderImg}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Blog Detail')}>
              <Image
                style={styles.slider}
                source={require('../../assets/images/god-of-war.jpeg')}
              />
              <Text style={styles.sliderTitle}>Games</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sliderImg}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Blog Detail')}>
              <Image
                style={styles.slider}
                source={require('../../assets/images/god-of-war.jpeg')}
              />
              <Text style={styles.sliderTitle}>Demo</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={styles.topHeding}>
        <Text style={styles.title}>Searching Product</Text>
      </View>
      <FlatGrid
        itemDimension={150}
        data={items}
        style={styles.gridView}
        //staticDimension={350}
        //fixed
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            key={item._id}
            onPress={() =>
              navigation.navigate('Resource Detail', {id: item._id})
            }>
            <Image style={styles.userImage} source={{uri: `${item?.img}`}} />
            <View style={styles.cardFooter}>
              <Text style={styles.name}>{item.resTitle}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.name1}>Created By: {item.creatorName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ResourceList;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,

    flex: 1,
  },

  /******** card **************/
  card: {
    elevation: 5,
    marginVertical: 2,
    backgroundColor: 'white',
    marginHorizontal: 5,
    height: 180,
  },
  cardFooter: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userImage: {
    height: 120,
    width: '100%',
    borderRadius: 0,
    alignSelf: 'center',
  },
  name: {
    fontSize: 16,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: '#000',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  name1: {
    fontSize: 12,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: '#000',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
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
});
