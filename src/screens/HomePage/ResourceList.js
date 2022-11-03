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

const ResourceList = ({route, navigation}) => {
  const {id} = route.params;
  console.log(id);
  const [items, setItems] = useState([]);

  const getCategory = () => {
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
            style={styles.card}
            onPress={() =>
              navigation.navigate('Resource Detail', {id: item._id})
            }>
            <Image style={styles.userImage} source={{uri: `${item?.img}`}} />
            <View style={styles.cardFooter}>
              <Text style={styles.name}>{item.resTitle}</Text>
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
    marginTop: 10,
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
    paddingHorizontal: 16,
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
});
