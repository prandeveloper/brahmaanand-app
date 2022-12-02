import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';
import {FlatGrid} from 'react-native-super-grid';
import demo from '../assets/images/Altos-Odyssey.jpeg';

const SearchPage = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(searchQuery);

  const onChangeSearch = query => setSearchQuery(query);

  const searchResult = () => {
    axios
      .post(`http://3.7.173.138:9000/user/search_topic_title`, {
        searchinput: searchQuery,
      })
      .then(response => {
        console.log(response.data);
        setSearchData(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchResult();
  }, [searchQuery]);

  return (
    <SafeAreaView style={{flex: 1, marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 3}}>
          <Searchbar
            placeholder="Search"
            loading={true}
            onChangeText={onChangeSearch}
            value={searchQuery}
            clearIcon={true}
          />
        </View>
        {/* <View style={styles.searchButtonView}>
          <TouchableOpacity style={styles.touchSearchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* <=========== Result ===========> */}

      <FlatGrid
        itemDimension={150}
        data={searchData}
        style={styles.gridView}
        //staticDimension={350}
        //fixed
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            key={item?._id}
            onPress={() =>
              navigation.navigate('Resource Detail', {id: item._id})
            }>
            {item.img !== '' && item.img !== null && item.img !== undefined ? (
              <Image style={styles.userImage} source={{uri: `${item?.img}`}} />
            ) : (
              <Image style={styles.userImage} source={demo} />
            )}

            <View style={styles.cardFooter}>
              <Text style={styles.name}>{item.resTitle}</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.name1}>Created By: {item.creatorName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View></View>
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  searchButtonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchSearchButton: {
    backgroundColor: 'gray',
    padding: 16,
    borderRadius: 10,
  },
  searchButtonText: {
    color: '#fff',
  },
  //Result Tab
  card: {
    elevation: 5,
    marginVertical: 2,
    backgroundColor: 'white',
    marginHorizontal: 5,
    height: 220,
    borderRadius: 10,
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
    borderRadius: 10,
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
    color: 'grey',
    fontSize: 12,
    fontWeight: '700',
  },
  topHeding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  viewAll: {
    color: '#6F6F6F',
    fontSize: 15,
    fontWeight: '500',
  },
  slider: {
    width: 140,
    height: 120,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  sliderTitle: {
    color: '#000',
    marginHorizontal: 8,
    marginVertical: 10,
    fontWeight: '600',
  },
  sliderImg: {
    backgroundColor: '#F3F3F3',
    height: 140,
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
