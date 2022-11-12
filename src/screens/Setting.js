import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../components/CustomHeader';
//import SimpleHeader from '../../components/SimpleHeader';
// import axiosConfig from '../../../axiosConfig';
// import axios from 'axios';
// import Share from 'react-native-share';

const Setting = ({navigation}) => {
  const [user, setUser] = useState('');

  //   //get User Api for name
  //   const getUser = async () => {
  //     axios
  //       .get(`http://65.0.183.149:8000/user/viewoneuser`, {
  //         headers: {'auth-token': await AsyncStorage.getItem('auth-token')},
  //       })
  //       .then(response => {
  //         console.log('name', response.data.data);
  //         const user = response.data.data;
  //         setUser(user);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };
  //   useEffect(() => {
  //     getUser();
  //   }, []);

  //   //Delete User permanently api
  //   const deleteData = () => {
  //     axiosConfig
  //       .get(`/dltMyaccount/${user._id}`)
  //       .then(response => {
  //         console.log(response.data);
  //         AsyncStorage.removeItem('auth-token');
  //         AsyncStorage.removeItem('plan');
  //         navigation.replace('Login');
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };

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
            {user.firstname != '' &&
            user.firstname != null &&
            user.firstname != undefined ? (
              <Text style={styles.userName}>Hi, {user?.firstname}</Text>
            ) : (
              <Text style={styles.userName}>Hi, User</Text>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={async () => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
                console.log('Logout Successfull');
                await AsyncStorage.removeItem('userId');
              }}>
              <Ionicons name="power" size={22} color="#FF0000" />
              <Text style={styles.btnLogout}>Logout</Text>
            </TouchableOpacity>
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
            {/* <View>
              <Ionicons
                name="chevron-forward-outline"
                size={22}
                color={'green'}
                style={{marginRight: 20}}
              />
            </View> */}
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
          </TouchableOpacity>
        </View>
        {/* <View style={styles.row}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              Alert.alert(
                '',
                'Are you sure you want to Delete this Account?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteData();
                    },
                  },
                ],
                {cancelable: false},
              )
            }>
            <View style={styles.eachSection}>
              <Ionicons
                name="trash-bin"
                size={25}
                color={'#ff1010'}
                style={{marginLeft: 10}}
              />
              <Text style={styles.delete}>Delete Account Permanently</Text>
            </View>
          </TouchableOpacity>
        </View> */}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#727271',
    marginTop: 20,
  },
  userName: {
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
    marginLeft: 15,
    color: '#FC9358',
    marginBottom: 5,
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
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#727271',
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
