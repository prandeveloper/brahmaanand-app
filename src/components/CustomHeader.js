import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../assets/images/logonew.png';

function CustomHeader({title, navigation}) {
  return (
    <LinearGradient colors={['#000', '#000']}>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginBottom: 5,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            margin: 10,
          }}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" color="black" size={22} />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: 15,
              color: 'white',
            }}>
            {title}
          </Text> */}
          <Image source={logo} style={{width: 150, height: 50}} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            margin: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Icon name="bell" color="white" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export default CustomHeader;
