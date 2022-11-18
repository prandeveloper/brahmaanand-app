import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';

const Bookmark = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState('');

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      if (user !== null) {
        //console.log('success');
        //console.log(user);
        setData(user);
      }
    } catch (e) {
      console.log('no Value in Signup');
    }
  };

  const getResourceList = () => {
    axios
      .get(`http://3.7.173.138:9000/user/my_likes/${data}`)
      .then(response => {
        console.log('aaaaaa', response.data.data);
        setItems(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    getResourceList();
  }, []);
  return (
    <ScrollView>
      <View>
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
              <Image
                style={styles.userImage}
                source={{uri: `${item?.submitresrcId?.img}`}}
              />
              <View style={styles.cardFooter}>
                <Text style={styles.name}>{item.submitresrcId?.resTitle}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.name1}>
                  Created By: {item.submitresrcId?.creatorName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  card: {
    elevation: 5,
    marginVertical: 2,
    backgroundColor: 'white',
    marginHorizontal: 5,
    height: 200,
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
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});
