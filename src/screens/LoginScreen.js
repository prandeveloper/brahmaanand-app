import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {TextInput} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [storeddata, setStoreddata] = useState('');

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
      console.log('no Value in login');
    }
  };
  useEffect(() => {
    getData();
  }, [storeddata]);

  const signIn = () => {
    console.log(email, password);
    axios
      .post(`http://43.205.82.226:9000/user/login`, {
        email: email,
        password: password,
      })
      .then(response => {
        console.log('@@@@', response.data);
        console.log(response.data.msg);
        if (response.data.msg === 'success' || response.data.msg == 'success') {
          ToastAndroid.show('Login Successfull....', ToastAndroid.SHORT);
        }
        console.log(response.data.user._id);
        if (response.data.user._id != null) {
          _storeData(response.data.user._id);
          navigation.replace('Home');
        } else {
          console.log('no token!');
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
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 300, height: 250}}
            source={require('../assets/VerifyEmail/midiyam.png')}
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
          Login
        </Text>
        <View style={styles.inputField}>
          <TextInput
            label="Email"
            mode="outlined"
            outlineColor="orange"
            value={email}
            onChangeText={setEmail}
          />
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

        <CustomButton label={'LOGIN'} onPress={signIn} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color: '#000'}}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputField: {
    marginVertical: 10,
  },
});
