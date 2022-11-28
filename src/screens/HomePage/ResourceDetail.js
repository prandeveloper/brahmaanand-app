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
  TextInput,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Moment from 'react-moment';
import {Rating, AirbnbRating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResourceDetail = ({route, navigation}) => {
  const {id} = route.params;
  //console.log(id);
  const [items, setItems] = useState({});
  const [allReview, setAllReview] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState();
  const [data, setData] = useState();
  const [myLike, setMyLike] = useState('');

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

  // <============ Get One Like ============>
  const getOneLike = () => {
    axios
      .get(`http://3.7.173.138:9000/user/getone_mylikes/${data}/${id}`)
      .then(response => {
        console.log('LikeGet', response.data.data.status);
        setMyLike(response.data.data.status);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // <========== Resource Detail =======>
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

  // <========== Get All Reviews =======>
  const getAllReview = () => {
    axios
      .get(`http://3.7.173.138:9000/user/comment_list/${id}`)
      .then(response => {
        //console.log(response.data.data);
        setAllReview(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getResourceDetail();
    getData();
    getAllReview();
    getOneLike();
  }, [myLike, data]);

  // <==========Post a Likes=======>
  const hitLike = () => {
    if (data !== null && data !== undefined && data !== '') {
      axios
        .post(`http://3.7.173.138:9000/user/add_like`, {
          submitresrcId: id,
          userid: data,
          status: 'true',
        })
        .then(response => {
          console.log(response.data);
          getOneLike();
        })
        .catch(error => {
          console.log(error.response.data);
        });
    } else {
      navigation.navigate('Login');
    }
  };

  // <==========Post a Dislike=======>
  const hitDisLike = () => {
    if (data !== null && data !== undefined && data !== '') {
      axios
        .post(`http://3.7.173.138:9000/user/add_like`, {
          submitresrcId: id,
          userid: data,
          status: 'false',
        })
        .then(response => {
          console.log(response.data);
          getOneLike();
        })
        .catch(error => {
          console.log(error.response.data);
        });
    } else {
      navigation.navigate('Login');
    }
  };

  // <========== Submit Reviews =======>
  const SubmitReview = () => {
    if (data !== null && data !== undefined && data !== '') {
      if (
        (rating !== '' && rating !== undefined) ||
        (comment !== '' && comment !== undefined)
      ) {
        axios
          .post(`http://3.7.173.138:9000/user/add_Comment`, {
            submitresrcId: id,
            userid: data,
            comment: comment,
            rating: rating,
          })
          .then(response => {
            console.log(response.data);
            if (response.data.message === 'success') {
              Alert.alert('Review Submitted Successfully');
              setRating('');
              setComment('');
            }
          })
          .catch(error => {
            console.log(error.response.data);
          });
      } else {
        Alert.alert('Please Enter Review and rating');
      }
    } else {
      navigation.navigate('Login');
    }
  };

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

        <View>
          {myLike === 'false' ? (
            <TouchableOpacity style={styles.likeBtnColor} onPress={hitLike}>
              <Text style={styles.likeBtnText}>Add BookMark</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.likeBtnColor} onPress={hitDisLike}>
              <Text style={styles.likeBtnText}>Remove BookMark</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.commentView}>
          <View style={styles.commentOneView}>
            <Text style={styles.commentOneText}>
              Total Reviews : {allReview.length}
            </Text>
          </View>
          <View style={styles.commentTwoView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('All Review', {id: items._id})
              }>
              <Text style={styles.commentOneText}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.starContainer}>
          <Text style={styles.name}>Post a Rating</Text>
        </View>
        <View style={styles.star}>
          <AirbnbRating
            reviews={false}
            defaultRating={0}
            size={30}
            onFinishRating={rating => {
              setRating(rating);
            }}
          />
        </View>

        <View style={styles.starContainer}>
          <Text style={styles.name}>Write a Review</Text>
        </View>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
          value={comment}
          onChangeText={setComment}
        />

        <View style={styles.addToCarContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={SubmitReview}>
            <Text style={styles.shareButtonText}>SUBMIT</Text>
          </TouchableOpacity>
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
  likeBtnColor: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  likeBtnText: {
    backgroundColor: 'red',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    fontWeight: '700',
    fontSize: 15,
    borderRadius: 10,
    elevation: 5,
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

  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  star: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: -30,
  },

  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'blue',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  textArea: {
    height: 100,
    width: 300,
    marginHorizontal: 40,
    marginVertical: 20,
    justifyContent: 'flex-start',
    borderWidth: 1,
    color: '#000',
  },
  addToCarContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
  commentView: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  commentOneView: {
    flex: 1,
    justifyContent: 'center',
  },
  commentOneText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  commentTwoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
