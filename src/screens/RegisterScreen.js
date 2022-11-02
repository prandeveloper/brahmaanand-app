import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterScreen = ({navigation}) => {
  // const [date, setDate] = useState(new Date());
  // const [open, setOpen] = useState(false);
  // const [fullName, setfullName] = useState('');
  // const [number, setNumber] = useState('');
  // const [city, setCity] = useState('');
  // const [storeddata, setStoreddata] = useState('');
  // const [dobLabel, setDobLabel] = useState('Date of Birth');

  // const _storeData = async id => {
  //   try {
  //     await AsyncStorage.setItem('user_id', JSON.stringify(id));
  //     console.log('id Saved');
  //   } catch (error) {
  //     console.log('Some error in setting id');
  //   }
  // };
  // const getData = async () => {
  //   try {
  //     const user_id = await AsyncStorage.getItem('user_id');
  //     if (user_id !== null) {
  //       console.log('success');
  //       console.log('user_id ???????', user_id);
  //       setStoreddata(user_id);
  //       navigation.replace('Login');
  //     }
  //   } catch (e) {
  //     console.log('no Value in login');
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, [storeddata]);

  // const postDataUsingSimplePostCall = async () => {
  //   if (!fullName.trim() || !number.trim() || !city.trim()) {
  //     alert('Enter Details');
  //     return;
  //   }
  //   axios
  //     .post(
  //       'http://Brahmaanand.in/newadmin/api/ApiCommonController/userRegister',
  //       {
  //         username: fullName,
  //         mobile_no: number,
  //         city: city,
  //         dob: date,
  //       },
  //     )
  //     .then(function (response) {
  //       // handle success
  //       // alert(JSON.stringify(response.data));
  //       // save user Id
  //       if (response.data !== null) {
  //         _storeData(response.data.data.id);
  //         navigation.replace('Login');
  //       } else {
  //         console.log('no id!');
  //       }
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       alert(error.message);
  //     });
  // };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <InputField
          // value={fullName}
          // onChangeText={setfullName}
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />

        <InputField
          // value={number}
          // onChangeText={setNumber}
          label={'Enter your Phone No. '}
          icon={
            <Ionicons
              name="phone-portrait-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />
        <InputField
          // value={city}
          // onChangeText={setCity}
          label={'Enter your city '}
          icon={
            <Ionicons
              name="phone-portrait-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              23/10/2022
              {/* {dobLabel} */}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1980-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}

        <CustomButton label={'Register'} onPress={() => {}} />

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
