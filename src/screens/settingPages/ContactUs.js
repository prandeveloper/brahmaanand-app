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

const ContactUs = ({navigation}) => {
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
          <View style={styles.mainView}>
            {/* <Ionicons name="md-person" color="#FC9358" size={25} /> */}
            <TextInput
              label="Name"
              outlineColor="#FC9358"
              activeOutlineColor="#FC9358"
              mode="outlined"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              style={styles.tfield}
            />
          </View>

          <View style={styles.mainView}>
            {/* <Ionicons name="md-book" color="#FC9358" size={25} /> */}
            <TextInput
              label="Email"
              outlineColor="#FC9358"
              activeOutlineColor="#FC9358"
              mode="outlined"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              style={styles.tfield}
            />
          </View>

          <View style={styles.mainView}>
            {/* <Ionicons name="md-mail" color="#FC9358" size={25} /> */}
            <TextInput
              style={styles.tfield}
              label="Mobile No."
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
            {/* <Ionicons name="md-add-circle" color="#FC9358" size={25} /> */}
            <TextInput
              style={[styles.tfield, {height: 100}]}
              label="Type Your Message Here"
              outlineColor="#FC9358"
              activeOutlineColor="#FC9358"
              mode="outlined"
              onChangeText={setMobile}
              value={mobile}
              keyboardType="default"
              numberOfLines={10}
              maxLength={100}
            />
          </View>

          <TouchableOpacity style={styles.touch}>
            <Text style={styles.buttonText}>Leave A Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

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
    width: 280,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: '#5F56C6',
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
