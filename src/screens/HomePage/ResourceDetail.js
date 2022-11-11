import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Linking,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Moment from 'react-moment';
import {Rating, AirbnbRating} from 'react-native-ratings';

const ResourceDetail = ({route, navigation}) => {
  const {id} = route.params;
  const [items, setItems] = useState({});

  const getResourceDetail = () => {
    axios
      .get(`http://43.205.82.226:9000/admin/getone_reslist/${id}`)
      .then(response => {
        //console.log(response.data.data);
        setItems(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getResourceDetail();
  }, []);
  console.log(id);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', marginHorizontal: 5}}>
          <Image
            style={styles.productImg}
            source={{
              uri: `${items.img}`,
            }}
          />
          <Text style={styles.name}>{items?.resTitle}</Text>
          {/* <Text style={styles.price}>$ 12.22</Text> */}
          <Text style={styles.description}>{items?.res_desc}</Text>
        </View>

        <View style={styles.contentColors}>
          <View style={styles.btnColor}>
            <View style={styles.textView}>
              <Text style={styles.headText}>Link :</Text>
            </View>
            <TouchableOpacity style={styles.textView}>
              <Text
                style={styles.headText}
                onPress={() => Linking.openURL(items.link)}>
                {items.link}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentColors}>
          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="logo-buffer" color={'#4095FF'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Creator:</Text>
              <Text style={styles.subText1}>{items?.creatorName}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="person-circle" color={'#BB43A8'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Submitted by:</Text>
              <Text style={styles.subText1}>{items?.creatorName}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.contentColors}>
          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="open" color={'#FC9357'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Type:</Text>
              <Text style={[styles.subText, {color: '#FC9357'}]}>
                {items?.type}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="videocam" color={'#DB47FE'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Format:</Text>
              <Text style={[styles.subText, {color: '#DB47FE'}]}>
                {items?.format}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.contentColors}>
          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="cube" color={'#5F56C6'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Category:</Text>
              <Text style={[styles.subText, {color: '#5F56C6'}]}>
                {items?.category?.title}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="calendar" color={'#FF6262'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Year:</Text>
              {items?.relYear?.map(year => (
                <Text
                  style={[styles.subText, {color: '#FF6262'}]}
                  key={year._id}>
                  {year.yrName}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.contentColors}>
          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="stats-chart" color={'#FFA841'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Rating:</Text>
              <Text style={[styles.subText, {color: '#FFA841'}]}>
                <Ionicons name="md-star" color={'#FFA841'} size={20} />
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="paper-plane" color={'#4095FF'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Submitted::</Text>
              <Text style={[styles.subText, {color: '#4095FF'}]}>
                <Moment element={Text} format="lll">
                  {items?.createdAt}
                </Moment>
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.contentColors}>
          <TouchableOpacity style={styles.btnColor}>
            <View style={styles.iconView}>
              <Ionicons name="people" color={'#0ACD92'} size={25} />
            </View>
            <View style={styles.textView}>
              <Text style={styles.headText}>Language </Text>
              <View style={{flexDirection: 'row'}}>
                {items?.language?.map(lang => (
                  <Text
                    style={[styles.subText, {color: '#0ACD92'}]}
                    key={lang._id}>
                    {lang.language},
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.starContainer}>
          <Text style={styles.name}>Post A Review</Text>
        </View>
        <View style={styles.starContainer}>
          <AirbnbRating
            defaultRating={0}
            size={30}
            //showRating
            onFinishRating={rating => {
              Alert.alert('rating' + JSON.stringify(rating));
            }}
            style={{paddingVertical: 10}}
          />
        </View>

        <View style={styles.separator}></View>
        <View style={styles.addToCarContainer}>
          {/* <TouchableOpacity
            style={styles.shareButton}
            onPress={() => this.clickEventListener()}>
            <Text style={styles.shareButtonText}>Add To Cart</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ResourceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
  },
  star: {
    width: 40,
    height: 40,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 35,
  },
  btnColor: {
    flex: 1,
    marginHorizontal: 3,
    flexDirection: 'row',
    elevation: 1,
    padding: 2,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headText: {
    color: '#000',
    fontWeight: '600',
    margin: 1,
  },
  subText1: {
    color: '#000',
    fontWeight: '700',
    margin: 1,
  },
  subText: {
    fontWeight: '700',
    margin: 1,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },

  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
});
