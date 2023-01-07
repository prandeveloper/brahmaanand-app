import {StyleSheet, Text, View, ToastAndroid, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPassword = ({navigation}) => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [storeddata, setStoreddata] = useState('');

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      if (user !== null) {
        console.log('success');
        console.log(user);
        setStoreddata(user);
        //navigation.replace('NewPassword');
      }
    } catch (e) {
      console.log('no Value in Signup');
    }
  };
  useEffect(() => {
    getData();
  }, [storeddata]);

  const newPass = () => {
    console.log(passwordOne, passwordTwo);
    if (passwordOne === passwordTwo) {
      axios
        .post(`http://3.7.173.138:9000/user/forgetpassword/${storeddata}`, {
          password: passwordOne,
        })
        .then(response => {
          console.log(response.data.data);
          if (
            response.data.msg === 'success' ||
            response.data.msg == 'success'
          ) {
            ToastAndroid.show('Password Set Successfully', ToastAndroid.SHORT);
            AsyncStorage.removeItem('userId');
            navigation.navigate('Login');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert('Password Does not Match');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.TopText}>ENTER NEW PASSWORD</Text>
      </View>
      <View style={styles.inputField}>
        <TextInput
          label="New Password"
          mode="outlined"
          outlineColor="orange"
          value={passwordOne}
          onChangeText={setPasswordOne}
        />
        <TextInput
          label="Confirm Password"
          mode="outlined"
          outlineColor="orange"
          value={passwordTwo}
          onChangeText={setPasswordTwo}
        />
      </View>
      <CustomButton label={'SUBMIT'} onPress={newPass} />
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    bottom: 20,
  },
  TopText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: '500',
  },
  inputField: {
    height: 50,
    width: 300,
    marginBottom: 100,
  },
});
