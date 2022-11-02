import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

const MyProfile = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [fNameValidError, setFNameValidError] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const [mobile, setMobile] = useState();
  const [gender, setGender] = useState('male');
  const [userId, setUserId] = useState('');
  const [singleFile, setSingleFile] = useState('');

  // ============image picker ===============
  const chooseFrontFile = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
      selectionLimit: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response : ' + JSON.stringify(response));
      setSingleFile(response);
      console.log(response.assets[0].base64);
      if (response.didCancel === 'true') {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
    });
  };
  // <============= Email Validation ==============>
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('Email Address must be Enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid Email Address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };
  // <===========Text Validation=========>
  const handleFirstName = val => {
    let reg = /^(?:[A-Za-z]+|\d+)$/;
    if (val.length === 0) {
      setFNameValidError('Enter Name');
      console.log(fNameValidError);
    } else if (reg.test(val) === false) {
      setFNameValidError('Enter Valid Name');
      console.log(fNameValidError);
    } else if (reg.test(val) === true) {
      setFNameValidError('');
    }
  };

  const getUser = async () => {
    axios
      .get(`http://65.0.183.149:8000/user/viewoneuser`, {
        headers: {'auth-token': await AsyncStorage.getItem('auth-token')},
      })
      .then(response => {
        console.log(response.data.data);
        setFirstName(response.data.data.firstname);
        setLastName(response.data.data.lastname);
        setGender(response.data.data.gender);
        setEmail(response.data.data.email);
        setDate(response.data.data.dob);
        setMobile(JSON.stringify(response.data.data.mobile));
        setUserId(response.data.data._id);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const editProfile = async () => {
    console.log(firstName, lastName, email, mobile, gender, date);
    axios
      .post(
        `http://65.0.183.149:8000/user/myprofile`,
        {
          firstname: firstName,
          lastname: lastName,
          gender: gender,
          dob: date,
          email: email,
          mobile: mobile,
        },
        {headers: {'auth-token': await AsyncStorage.getItem('auth-token')}},
      )
      .then(response => {
        console.log(response.data);
        navigation.replace('My Account');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 0}}>
        <View style={styles.main}>
          <View style={styles.mainView1}>
            <TouchableOpacity onPress={chooseFrontFile}>
              <View style={styles.cameraView}>
                <Ionicons name="md-camera" color="#FC9358" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.mainView}>
            <Ionicons name="md-person" color="#FC9358" size={25} />
            <TextInput
              label="UserName"
              outlineColor="#FC9358"
              activeOutlineColor="#FC9358"
              mode="outlined"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              style={[styles.tfield, {width: 250}]}
            />
          </View>

          <View style={styles.mainView}>
            <Ionicons name="md-book" color="#FC9358" size={25} />
            <TextInput
              label="Display Name"
              outlineColor="#FC9358"
              activeOutlineColor="#FC9358"
              mode="outlined"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              style={[styles.tfield, {width: 250}]}
            />
          </View>

          <View style={styles.mainView}>
            <Ionicons name="md-mail" color="#FC9358" size={25} />
            <TextInput
              style={[styles.tfield, {width: 250}]}
              label="Email"
              outlineColor="#FC9358"
              activeOutlineColor="#FC9358"
              mode="outlined"
              value={email}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.mainView}>
            <Ionicons name="md-add-circle" color="#FC9358" size={25} />
            <TextInput
              style={[styles.tfield, {width: 250}]}
              label="About Me"
              outlineColor="#FC9358"
              activeOutlineColor="#FC9358"
              mode="outlined"
              onChangeText={setMobile}
              value={mobile}
              keyboardType="default"
            />
          </View>
          {fNameValidError === '' && emailValidError === '' ? (
            <TouchableOpacity style={styles.touch} onPress={editProfile}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  main: {
    marginTop: 50,
  },
  mainView1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraView: {
    backgroundColor: '#000',
    padding: 30,
    borderRadius: 50,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tfield: {
    borderWidth: 0,
    borderColor: '#000',
    borderRadius: 10,
    margin: 5,
    marginVertical: 15,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: '#FC9358',
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 70,
    paddingVertical: 15,
    borderRadius: 20,
  },
});
