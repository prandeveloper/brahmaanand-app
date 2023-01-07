import {StyleSheet, Text, View, ToastAndroid, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnterEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState(false);
  const [storeddata, setStoreddata] = useState('');

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
        navigation.replace('NewPassword');
      }
    } catch (e) {
      console.log('no Value in Signup');
    }
  };
  useEffect(() => {
    getData();
  }, [storeddata]);

  const sendEmail = () => {
    console.log(email);
    if (email !== '') {
      axios
        .post(`http://3.7.173.138:9000/user/sendotp`, {
          email: email,
        })
        .then(response => {
          console.log('@@@@', response.data);
          console.log(response.data.msg);
          if (
            response.data.msg === 'otp send successfully' ||
            response.data.msg == 'otp send successfully'
          ) {
            ToastAndroid.show('Otp send successfully', ToastAndroid.SHORT);
            setOtp(true);
          }
        })
        .catch(error => {
          console.log('eeee', error);
          // if (
          //   error.response.data.msg == 'User Doesnot Exist' ||
          //   error.response.data.msg === 'User Doesnot Exist'
          // ) {
          //   showToast();
          // }
        });
    } else {
      Alert.alert('Enter Email');
    }
  };

  const verify = () => {
    console.log(email, code);
    axios
      .post('http://3.7.173.138:9000/user/verifyotp', {
        email: email,
        otp: code,
      })
      .then(response => {
        console.log(response.data);
        console.log(response.data.msg);
        if (
          response.data.msg === 'verification successful' ||
          response.data.msg == 'verification successful'
        ) {
          ToastAndroid.show('Verification successful', ToastAndroid.SHORT);
        } else if (
          response.data.msg === 'Incorrect Otp' ||
          response.data.msg == 'Incorrect Otp'
        ) {
          ToastAndroid.show('Incorrect Otp', ToastAndroid.SHORT);
        }
        console.log(response.data._id);
        if (response.data._id != null) {
          _storeData(response.data._id);
          navigation.replace('NewPassword');
        } else {
          console.log('no ID!');
        }
      })
      .catch(error => {
        console.log('@@', error);
      });
  };

  return (
    <>
      {otp === false ? (
        <View style={styles.container}>
          <View style={styles.textView}>
            <Text style={styles.TopText}>ENTER EMAIL</Text>
          </View>
          <View style={styles.inputField}>
            <TextInput
              label="Email"
              mode="outlined"
              outlineColor="orange"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <CustomButton label={'SUBMIT'} onPress={sendEmail} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.textView}>
            <Text style={styles.TopText}>ENTER OTP</Text>
          </View>
          <View style={styles.inputField}>
            <OTPInputView
              pinCount={4}
              code={code}
              onCodeChanged={setCode}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
          <CustomButton label={'VERIFY'} onPress={verify} />
        </View>
      )}
    </>
  );
};

export default EnterEmail;

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
    fontSize: 18,
    fontWeight: '400',
  },
  inputField: {
    height: 50,
    width: 300,
    marginVertical: 50,
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    color: '#000',
    backgroundColor: '#FFF',
  },
  underlineStyleHighLighted: {
    borderColor: '#000',
    borderWidth: 1,
  },
});
