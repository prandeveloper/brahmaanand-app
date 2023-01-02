import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';

const CategoryList = ({navigation}) => {
  const [items, setItems] = useState([]);

  const getCategory = () => {
    axios
      .get(`http://3.7.173.138:9000/admin/getallCategory`)
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
    <SafeAreaView style={{flex: 1}}>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        //staticDimension={350}
        //fixed
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Sub-Category', {id: item._id})}>
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
    </SafeAreaView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    height: 180,
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
});
