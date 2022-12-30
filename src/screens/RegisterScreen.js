import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import RegistrationSVG from '../assets/images/misc/registration.svg';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {TextInput} from 'react-native-paper';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [storeddata, setStoreddata] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [emailValidError, setEmailValidError] = useState('');

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('Email Address must be Enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter Valid Email Address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  function showToast() {
    ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT);
  }

  const _storeData = async _id => {
    try {
      await AsyncStorage.setItem('userId', _id);
      console.log('Id Saved');
    } catch (error) {
      console.log('Some error in setting Id');
    }
  };

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      if (user !== null) {
        console.log('success');
        console.log(user);
        setStoreddata(user);
        navigation.replace('Home');
      }
    } catch (e) {
      console.log('no Value in Signup');
    }
  };
  useEffect(() => {
    getData();
  }, [storeddata]);

  const signUp = () => {
    console.log(userName, email, password);
    if (emailValidError === '' && email !== '' && password !== '') {
      axios
        .post(`http://43.205.82.226:9000/user/signup`, {
          username: userName,
          email: email,
          password: password,
        })
        .then(response => {
          console.log('@@@@', response.data.data);
          console.log(response.data.message);
          if (
            response.data.message === 'success' ||
            response.data.message == 'success'
          ) {
            ToastAndroid.show('Register Successfull....', ToastAndroid.SHORT);
          }
          console.log(response.data.data._id);
          if (response.data.data._id != null) {
            _storeData(response.data.data._id);
            navigation.replace('Home');
          } else {
            console.log('no ID!');
          }
        })
        .catch(error => {
          console.log('eeee', error.response.data);
          // if (
          //   error.response.data.msg == 'User Doesnot Exist' ||
          //   error.response.data.msg === 'User Doesnot Exist'
          // ) {
          //   showToast();
          // }
        });
    } else {
      Alert.alert('Enter All the Fields');
    }
  };

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

        <View style={styles.inputField}>
          <TextInput
            label="UserName"
            mode="outlined"
            outlineColor="orange"
            value={userName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.inputField}>
          <TextInput
            label="Email"
            mode="outlined"
            outlineColor="orange"
            value={email}
            onChangeText={value => {
              setEmail(value);
              handleValidEmail(value);
            }}
          />
          {emailValidError !== '' ? (
            <Text style={{color: 'red'}}>{emailValidError}</Text>
          ) : null}
        </View>

        <View style={styles.inputField}>
          <TextInput
            label="Password"
            mode="outlined"
            outlineColor="orange"
            secureTextEntry={passwordSecured}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => {
              setPasswordSecured(!passwordSecured);
            }}>
            <Text style={{color: 'blue'}}>Show Password</Text>
          </TouchableOpacity>
        </View>

        <CustomButton label={'REGISTER'} onPress={signUp} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color: '#000'}}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  inputField: {
    marginVertical: 10,
  },
});
