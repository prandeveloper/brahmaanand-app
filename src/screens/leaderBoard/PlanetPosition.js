import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatGrid} from 'react-native-super-grid';

const PlanetPosition = () => {
  const [items, setItems] = React.useState([
    {
      text1: 'Sun',
      text2: '0-500',
      price: '$10',
      imageUrl: require('../../assets/images/planet/sun.png'),
    },

    {
      text1: 'Mercury',
      text2: '500-1000',
      price: '$15',
      imageUrl: require('../../assets/images/planet/mercury.png'),
    },
    {
      text1: 'Venus',
      text2: '1000-2000',
      price: '$18',
      imageUrl: require('../../assets/images/planet/venus.png'),
    },
    {
      text1: 'Mars',
      text2: '2000-5000',
      price: '$20',
      imageUrl: require('../../assets/images/planet/mars.png'),
    },
    {
      text1: 'Jupiter',
      text2: '5000-7500',
      price: '$25',
      imageUrl: require('../../assets/images/planet/jupiter.png'),
    },
    {
      text1: 'Saturn',
      text2: '7500-10000',
      price: '$40',
      imageUrl: require('../../assets/images/planet/saturn.png'),
    },
    {
      text1: 'Uranus',
      text2: '10000-20000',
      price: '$50',
      imageUrl: require('../../assets/images/planet/uranus.png'),
    },
    {
      text1: 'Neptune',
      text2: '20000-50000',
      price: '$100',
      imageUrl: require('../../assets/images/planet/neptune.png'),
    },
    {
      text1: 'Earth',
      text2: '50000+',
      price: '$1000',
      imageUrl: require('../../assets/images/planet/earth.png'),
    },
  ]);
  return (
    <View style={styles.container}>
      <Text
        style={{color: '#FC9358', margin: 5, fontSize: 16, fontWeight: '700'}}>
        Planet Position
      </Text>

      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        //staticDimension={350}
        //fixed
        spacing={10}
        renderItem={({item}) => (
          <View style={styles.innerView}>
            <View style={styles.iconView}>
              <Image source={item.imageUrl} style={styles.planetImage} />
            </View>

            <View>
              <Text style={styles.upperText}>{item.text1}</Text>
              <Text style={styles.lowerText}>{item.text2}</Text>
              <Text style={styles.dollar}>{item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PlanetPosition;

const styles = StyleSheet.create({
  container: {},

  innerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    elevation: 5,
    paddingVertical: 10,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 50,
    margin: 5,
  },
  planetImage: {
    height: 50,
    width: 50,
    display: 'flex',
  },
  upperText: {
    textAlign: 'center',
    color: '#000',
    margin: 2,
    fontWeight: '600',
  },
  lowerText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#5F56C6',
    margin: 5,
  },
  dollar: {
    textAlign: 'center',
    color: '#000',
    margin: 2,
  },
});
