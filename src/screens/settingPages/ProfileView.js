import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'react-moment';
import {FlatGrid} from 'react-native-super-grid';

export default function ProfileView({navigation}) {
  const [user, setUser] = useState('');
  const [id, setId] = useState('');
  const [showContent, setShowContent] = useState('VideoPosted');
  const [items, setItems] = useState([]);
  const [point, setPoint] = useState();
  const [video, setVideo] = useState([]);

  const getVideoList = () => {
    axios
      .get(`http://3.7.173.138:9000/user/posted_by_me/${id}`)
      .then(response => {
        console.log('aaaaaa', response.data.data);
        setVideo(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getResourceList = () => {
    axios
      .get(`http://3.7.173.138:9000/user/my_likes/${id}`)
      .then(response => {
        console.log('aaaaaa', response.data.data);
        setItems(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPoints = () => {
    axios
      .get(`http://3.7.173.138:9000/user/my_content_meteros/${id}`)
      .then(response => {
        console.log('points', response.data);
        setPoint(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function VideoPosted() {
    return (
      <View>
        <FlatGrid
          itemDimension={150}
          data={video}
          style={styles.gridView}
          //staticDimension={350}
          //fixed
          spacing={10}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              key={item._id}
              onPress={() =>
                navigation.navigate('Resource Detail', {
                  id: item._id,
                })
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
  }

  const BookMark = () => {
    return (
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
                navigation.navigate('Resource Detail', {
                  id: item.submitresrcId?._id,
                })
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
    );
  };

  function Points() {
    return (
      <View style={styles.pointView}>
        <Text style={styles.pointText}>Total Meteors Points</Text>
        <Text style={styles.pointNumber}>{point?.meteors}</Text>
      </View>
    );
  }

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      if (user !== null) {
        console.log('success');
        console.log(user);
        setId(user);
      }
    } catch (e) {
      console.log('no Value in Signup');
    }
  };

  //get User Api for name
  const getUser = async () => {
    axios
      .get(`http://3.7.173.138:9000/user/getoneUser/${id}`)
      .then(response => {
        console.log('name', response.data.data);
        const user = response.data.data;
        setUser(user);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    getUser();
    getResourceList();
    getPoints();
    getVideoList();
  }, [id]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={{
                uri: 'https://cdn.wccftech.com/wp-content/uploads/2016/09/spacee-scaled.jpg',
              }}
            />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={{uri: `${user?.profileImg}`}}
                />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{user?.username}</Text>
                <Text style={styles.userBio}>{user?.abt_us}</Text>
              </View>
              {/* Posts/Followers/Following View */}
              <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>User Since</Text>
                  <Text style={styles.countText}>
                    <Moment element={Text} format="lll">
                      {user?.createdAt}
                    </Moment>
                  </Text>
                </View>

                <View style={styles.countView}>
                  <Text style={styles.countNum}>Last Seen</Text>
                  <Text style={styles.countText}>10 min Ago</Text>
                </View>
              </View>
              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity
                  style={styles.interactButton}
                  onPress={() => navigation.navigate('My Profile')}>
                  <Text style={styles.interactButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Profile Content */}
            <View style={{marginTop: 20}}>
              <View style={styles.profileContentButtonsView}>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'VideoPosted' ? 2 : 0,
                  }}
                  onPress={() => setShowContent('VideoPosted')}>
                  <Text style={styles.showContentButtonText}>Video Posted</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'BookMark' ? 2 : 0,
                  }}
                  onPress={() => setShowContent('BookMark')}>
                  <Text style={styles.showContentButtonText}>BookMark</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'Points' ? 2 : 0,
                  }}
                  onPress={() => setShowContent('Points')}>
                  <Text style={styles.showContentButtonText}>Points</Text>
                </TouchableOpacity>
              </View>
              {showContent === 'VideoPosted' ? (
                <VideoPosted photos={new Array(13).fill(1)} />
              ) : showContent === 'BookMark' ? (
                <BookMark />
              ) : (
                <Points />
              )}
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    height: 300,
    width: '100%',
  },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: {alignItems: 'center', marginTop: -50},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: {alignItems: 'center', marginTop: 10},
  userFullName: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  userBio: {
    fontSize: 18,
    color: '#000',
    marginTop: 4,
  },
  countsView: {flexDirection: 'row', marginTop: 20},
  countView: {flex: 1, alignItems: 'center'},
  countNum: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  countText: {fontFamily: 'SSRegular', fontSize: 15, color: '#000'},
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc9358',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    fontFamily: 'SSBold',
    color: '#FFF',
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {
    fontSize: 15,
    color: '#000',
  },
  //grid View
  gridView: {
    flex: 1,
  },
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
  pointView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  pointText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  pointNumber: {
    color: '#000',
    fontSize: 30,
    fontWeight: '600',
  },
});
