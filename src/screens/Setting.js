import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
// import Share from 'react-native-share';

const Setting = ({navigation}) => {
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

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message:
  //       'My Referral Code',
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  //   const shareOptions = {
  //     title: 'Share via',
  //     message: 'New Trading Tip App for you with Best Features',
  //     url: 'https://play.google.com/store/apps/details?id=com.tradzoo.app',
  //   };

  const onShare = async () => {
    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <View>
        <CustomHeader title="Home" navigation={navigation} />
      </View>
      <ScrollView>
        <View style={styles.textHeding}>
          <View>
            {user.profileImg != '' &&
            user.profileImg != null &&
            user.profileImg != undefined ? (
              <View style={styles.topImage}>
                <Image
                  source={{uri: `${user.profileImg[0]}`}}
                  style={{width: 80, height: 80, borderRadius: 50}}
                />
              </View>
            ) : (
              <View style={styles.topImage}>
                <Ionicons name="md-person" size={60} color="#000" />
              </View>
            )}
          </View>
          <View>
            {user.username != '' &&
            user.username != null &&
            user.username != undefined ? (
              <Text style={styles.userName}>Hi, {user?.username}</Text>
            ) : (
              <Text style={styles.userName}>Hi, User</Text>
            )}
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Profile')}>
            <View style={styles.eachSection}>
              <Ionicons
                name="person-sharp"
                size={25}
                color={'#FC9358'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.btntxt}>My Profile</Text>
            </View>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'#000'}
                style={{marginRight: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('How It Works')}>
            <View style={styles.eachSection}>
              <Ionicons
                name="md-reader"
                size={25}
                color={'#FC9358'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.btntxt}>How Brahmaand works?</Text>
            </View>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'#000'}
                style={{marginRight: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              Linking.openURL('http://brahmaand.space/termsConditions')
            }>
            <View style={styles.eachSection}>
              <Ionicons
                name="logo-buffer"
                size={25}
                color={'#FC9358'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.btntxt}>Terms & Conditions</Text>
            </View>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'#000'}
                style={{marginRight: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => Linking.openURL('http://brahmaand.space/privacy')}>
            <View style={styles.eachSection}>
              <Ionicons
                name="ios-help-circle"
                size={25}
                color={'#FC9358'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.btntxt}>Privacy Policy</Text>
            </View>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'#000'}
                style={{marginRight: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Contact Us')}>
            <View style={styles.eachSection}>
              <Ionicons
                name="chatbubble-ellipses-sharp"
                size={25}
                color={'#FC9358'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.btntxt}>Contact Us</Text>
            </View>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'#000'}
                style={{marginRight: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={onShare}>
            <View style={styles.eachSection}>
              <Ionicons
                name="share-social"
                size={25}
                color={'#FC9358'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.btntxt}>Share App</Text>
            </View>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'#000'}
                style={{marginRight: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
              console.log('Logout Successfull');
              await AsyncStorage.removeItem('userId');
            }}>
            <View style={styles.eachSection}>
              <Ionicons
                name="power"
                size={25}
                color={'#FC9358'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.btntxt}>LogOut</Text>
            </View>
            <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'#000'}
                style={{marginRight: 20}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  eachSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeding: {
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#FFF',
    marginBottom: 10,
  },
  userName: {
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
    color: '#000',
    marginVertical: 10,
  },
  btnLogout: {
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
    marginLeft: 6,
    marginRight: 10,
    color: '#FF0000',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 30,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  btntxt: {
    fontSize: 15,
    color: 'black',
    marginLeft: 15,
    fontWeight: '600',
  },
  delete: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: '#ff1010',
    marginLeft: 15,
  },
});
