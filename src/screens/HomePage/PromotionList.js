import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';

const PromotionList = ({navigation}) => {
  const [promotion, setPromotion] = useState([]);

  const getPromotion = () => {
    axios
      .get(`http://3.7.173.138:9000/user/Promotions`)
      .then(response => {
        console.log(response.data.data);
        setPromotion(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatGrid
        itemDimension={150}
        data={promotion}
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
    </View>
  );
};

export default PromotionList;

const styles = StyleSheet.create({
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
});
