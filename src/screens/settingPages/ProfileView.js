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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Bookmark from './Bookmark';

// function Photos() {
//   return <Text style={{color: '#000'}}> Hello</Text>;
// }

// function Albums() {
//   return <Text style={{color: '#000'}}> Hello</Text>;
// }

// function Tags() {
//   return <Text style={{color: '#000'}}> Hello</Text>;
// }
const Tab = createMaterialTopTabNavigator();

export default function ProfileView({navigation}) {
  const [user, setUser] = useState('');
  const [id, setId] = useState('');

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
      .get(`http://43.205.82.226:9000/user/getoneUser/${id}`)
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
              <Tab.Navigator
                screenOptions={{
                  tabBarLabelStyle: {
                    fontSize: 11,
                    color: '#000',
                    fontWeight: '600',
                  },
                  tabBarItemStyle: {width: 130},
                  tabBarScrollEnabled: true,
                  tabBarIndicatorStyle: {
                    backgroundColor: '#000',
                  },
                  tabBarStyle: {backgroundColor: '#FFF'},
                }}>
                <Tab.Screen name="Video Posted" component={Bookmark} />
                <Tab.Screen name="BookMarks" component={Bookmark} />
                <Tab.Screen name="Points" component={Bookmark} />
              </Tab.Navigator>
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
});
