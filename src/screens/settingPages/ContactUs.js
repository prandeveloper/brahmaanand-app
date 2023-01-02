import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {TextInput} from 'react-native-paper';

const ContactUs = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState();
  const [message, setMessage] = useState('');

  const submit = async () => {
    console.log(firstName, email, mobile, message);
    {
      firstName !== '' && email !== '' && mobile !== '' && message !== ''
        ? axios
            .post(`http://3.7.173.138:9000/user/add_contactus`, {
              userid: await AsyncStorage.getItem('userId'),
              name: firstName,
              email: email,
              mobile: mobile,
              msg: message,
            })
            .then(response => {
              console.log(response.data);
              Alert.alert(response.data.message);
            })
            .catch(error => {
              console.log(error);
            })
        : Alert.alert('No Field Should Be Empty');
    }
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
              value={email}
              onChangeText={setEmail}
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
              value={mobile}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setMobile}
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
              onChangeText={setMessage}
              value={message}
              keyboardType="default"
              numberOfLines={10}
              maxLength={100}
            />
          </View>

          <TouchableOpacity style={styles.touch} onPress={submit}>
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
