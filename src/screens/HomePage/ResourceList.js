import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import {Searchbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import {CheckBox} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const ResourceList = ({route, navigation}) => {
  const {id} = route.params;
  console.log(id);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [modalVisible, setModalVisible] = useState(false);
  const [seekbarValue, setSeekbarValue] = useState(5);
  const [checked, setChecked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

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
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" color={'#000'} size={25} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={styles.filterCross}>
                <View style={styles.filterView}>
                  <Text style={styles.filterText}>Filter</Text>
                </View>
                <TouchableOpacity
                  style={styles.crossView}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Ionicons name="md-close" color="#000" size={25} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.filterHead}>Review ({seekbarValue})</Text>
                <Slider
                  value={seekbarValue}
                  minimumValue={0}
                  maximumValue={5}
                  step={1}
                  onSlidingComplete={value => {
                    setSeekbarValue(value);
                  }}
                />
              </View>
              <View>
                <Text style={styles.filterHead}>Type</Text>
                <CheckBox
                  title="Free"
                  checked={checked}
                  onPress={() => setChecked({checked: !checked})}
                />

                <CheckBox
                  title="Paid"
                  checked={checked}
                  onPress={() => setChecked({checked: !checked})}
                />
              </View>
              <View>
                <Text style={styles.filterHead}>Format</Text>
                <CheckBox
                  title="Video"
                  checked={checked}
                  onPress={() => setChecked({checked: !checked})}
                />
                <CheckBox
                  title="Text"
                  checked={checked}
                  onPress={() => setChecked({checked: !checked})}
                />
              </View>

              <View>
                <Text style={styles.filterHead}>Not Older Than</Text>
                <Picker
                  dropdownIconColor={'black'}
                  style={{backgroundColor: '#fff', color: '#000'}}
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>

              <View>
                <Text style={styles.filterHead}>Language</Text>
                <Picker
                  dropdownIconColor={'black'}
                  style={{backgroundColor: '#fff', color: '#000'}}
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>
            </View>
            <TouchableOpacity
              style={styles.applyTouch}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

      {/* <=======Latest Blogs =========> */}

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
  //<=============Modal============>
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    //alignItems: 'center',
  },
  filterCross: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  filterView: {
    flex: 1,
  },
  filterText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
  crossView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  crossText: {},
  filterHead: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
  },
  applyTouch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyText: {
    color: '#FFF',
    fontSize: 18,
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontWeight: '600',
    borderRadius: 15,
  },
});
