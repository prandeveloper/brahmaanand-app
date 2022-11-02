import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import BackHeader from '../components/BackHeader';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../components/CustomButton';



const ProfileScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Date of Birth');
  return (
    <SafeAreaView style={styles.container} >
      <BackHeader label={'Edit Profile'} onPress={()=> navigation.openDrawer()} />
      <View style={styles.header} >
        <TouchableOpacity style={styles.profileBtn} >
          <Image style={styles.profileImg} source={require('../assets/images/user-profile.jpg')} />
          <MaterialIcons
              name="edit"
              size={20}
              color="#666"
              style={{ marginTop:30}}
            />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25,marginTop:50 }}>
        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={'Enter your Phone No. '}
          icon={
            <Ionicons
              name="phone-portrait-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />
        <InputField
          label={'Enter your city '}
          icon={
            <MaterialIcons
              name="location-city"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
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
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
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
        />
        <InputField
          label={'Gender'}
          icon={
            <Ionicons
              name="md-transgender-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={'Enter Height'}
          icon={
            <MaterialCommunityIcons
              name="human-male-height"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={'Weight'}
          icon={
            <FontAwesome5
              name="weight"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />
        <InputField
          label={'Blood Group'}
          icon={
            <Fontisto
              name="blood-drop"
              size={20}
              color="red"
              style={{ marginRight: 5 }}
            />
          }
        />

        <CustomButton label={'SUBMIT'} onPress={() => { }} />

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 160,
    borderRightWidth: 200,
    borderTopWidth: 150,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4584FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 30
  },
  profileBtn: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 30,
    flexDirection:'row'
  }
})

export default ProfileScreen;
