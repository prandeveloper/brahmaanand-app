import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, FlatList, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Rating } from 'react-native-ratings';
import BackHeader from '../components/BackHeader';




const Booking = ({ navigation }) => {
  const [images, setimages] = useState([
    { src: require('../assets/images/FarCry6.png'), title: 'Farcry', key: '1' },
    { src: require('../assets/images/departmentHospital.png'), title: 'Detal', key: '2' },
    { src: require('../assets/images/FarCry6.png'), title: 'Farcry', key: '3' },
    { src: require('../assets/images/FarCry6.png'), title: 'Farcry', key: '4' },
    { src: require('../assets/images/departmentHospital.png'), title: 'Detal', key: '5' },
  ]);

  return (
    <SafeAreaView style={styles.container} >
      <BackHeader label={'Blogs'}  onPress={() => navigation.openDrawer()} />
      <ScrollView style={{ padding: 8 }}>
        <View style={styles.searchWrapperStyle}>
          <Ionicons size={18} name="search-outline" color="white" style={styles.iconStyle} />
          <TextInput
            style={{ flex: 1 }}
            underlineColorAndroid='transparent'
            placeholder='Search Here'
            placeholderTextColor={'#fff'}
            placeholderColor={'#fff'}
            color={'#fff'}
          />
        </View>
        <View>
          <Text style={styles.title} >Categories</Text>
          <FlatList
            horizontal={true}
            data={images}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <View style={styles.mainView} >
                  <View style={styles.mainRow} >
                    <TouchableOpacity style={styles.btn}  >
                      <ImageBackground
                        imageStyle={{ borderRadius: 20, }}
                        source={item.src}
                        style={{
                          width: 100,
                          height: 140,
                          justifyContent: 'flex-end',
                          alignItems: 'center',

                        }}>
                        <Text style={styles.text} >{item.title}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <Text style={styles.title} >Recommended For You</Text>
        <View style={styles.swiming}>
          <Image style={styles.poolimg} source={require('../assets/images/pool.jpg')} />
          <Text style={styles.swimingTxt} >Swimming for fitness: How safe is it to swim during monsoon, what are the infection risks and how to avoid them? </Text>
          <Text style={styles.txt}>With the arrival of monsoon the risk of infections of all sorts increase. Water logging, accumulation of rain water on roads and hollow spaces for longer duration, seepage of rainwater and other polluted water to drinking water sources, and flow of unhealthy water to water bodies like swimming pools poses greater risk for various types of diseases and infections.</Text>
        </View>
        <View style={[styles.secondSection]}>
          <Image style={{
            width: 100,
            height: 150,
            borderRadius:15
             }} source={require('../assets/images/FarCry6.png')} />
             <View style={ styles.leftSection}>
             <Text style={styles.swimingTxt}>Anaerobic exercise: What it is and how it affects the body</Text>
             <Text style={styles.txt}>You’ve most likely heard of anaerobic exercise before, but how much do you know about the science behind this vital aspect of your physical fitness? Enhancing your comprehension of the anaerobic energy system is a sure-fire way to empower yourself and give your workouts a boost.</Text>
             </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  searchWrapperStyle: {
    backgroundColor: "#4584FF",
    flexDirection: "row",
    borderRadius: 25,
  },
  iconStyle: {
    marginTop: 15,
    marginHorizontal: 8,
  },
  mainView: {

  },
  mainRow: {

  },
  btn: {
    padding: 5,
  },
  addresh: {
    marginTop: 5
  },
  rightView: {
    justifyContent: 'center',
  },
  title: {
    padding: 8, color: '#4584FF', fontFamily: 'Roboto-Bold', fontSize: 16
  },
  text: {
    marginBottom: 10, color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 17, textAlign: 'center'
  },
  poolimg: {
    width: '95%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 20
  },
  swiming: {
    height: 'auto', width: '95%', justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#fff', padding: 10,
    alignSelf: 'center', borderRadius: 10, shadowColor: 'blue',
    elevation: 7,
    shadowRadius: 10,
  },
  swimingTxt: {
    color: '#4584FF',
    fontFamily: 'Roboto-Medium'

  },
  txt: {
    color: 'black',
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondSection:{
    height: 'auto',
     width: '95%',
     backgroundColor: '#fff', 
     padding: 10,
    alignSelf: 'center', 
    borderRadius: 10, 
    shadowColor: 'blue',
    elevation: 7,
    shadowRadius: 10,
    flexDirection:'row',
    marginVertical:10,
    justifyContent:'space-between',
    alignItems:'center'
    
  },
  leftSection:{
    height: 'auto', width: '75%', padding: 10,
  }
})

export default Booking;
