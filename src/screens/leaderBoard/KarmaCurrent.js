import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatGrid} from 'react-native-super-grid';

const KarmaCurrent = () => {
  const [items, setItems] = React.useState([
    {
      text1: 'CromSoldier',
      text2: '3752',
      imageUrl: require('../../assets/images/planet/sun.png'),
      bgUrl: require('../../assets/images/planet/Avatar1.png'),
    },

    {
      text1: 'CromSoldier',
      text2: '3752',
      imageUrl: require('../../assets/images/planet/mercury.png'),
      bgUrl: require('../../assets/images/planet/Avatar2.png'),
    },
    {
      text1: 'CromSoldier',
      text2: '3752',
      imageUrl: require('../../assets/images/planet/venus.png'),
      bgUrl: require('../../assets/images/planet/Avatar3.png'),
    },
    {
      text1: 'CromSoldier',
      text2: '3752',
      imageUrl: require('../../assets/images/planet/mars.png'),
      bgUrl: require('../../assets/images/planet/Avatar1.png'),
    },
    {
      text1: 'CromSoldier',
      text2: '3752',
      imageUrl: require('../../assets/images/planet/jupiter.png'),
      bgUrl: require('../../assets/images/planet/Avatar2.png'),
    },
    {
      text1: 'CromSoldier',
      text2: '3752',
      imageUrl: require('../../assets/images/planet/saturn.png'),
      bgUrl: require('../../assets/images/planet/Avatar3.png'),
    },
  ]);
  return (
    <View style={styles.container}>
      <Text
        style={{color: '#FC9358', margin: 5, fontSize: 16, fontWeight: '700'}}>
        Karma - Current Month
      </Text>

      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={450}
        // fixed
        spacing={10}
        renderItem={({item}) => (
          <View style={styles.innerView}>
            <View style={styles.iconView}>
              <View style={styles.iconView1}>
                <Image source={item.imageUrl} style={styles.planetImage} />
              </View>
              <View style={styles.iconView2}>
                <Text style={styles.iconNum}>1120</Text>
              </View>
            </View>
            <View style={styles.bgImageView}>
              <ImageBackground
                source={item.bgUrl}
                style={styles.bgImage}></ImageBackground>
            </View>
            <View>
              <Text style={styles.upperText}>{item.text1}</Text>
              <Text style={styles.lowerText}>{item.text2}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default KarmaCurrent;

const styles = StyleSheet.create({
  container: {},

  innerView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    elevation: 5,
    paddingVertical: 10,
  },
  iconView: {
    flexDirection: 'row',
  },
  iconView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 2,
  },
  iconView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    backgroundColor: '#5F56C6',
  },

  planetImage: {
    height: 30,
    width: 30,
    display: 'flex',
  },
  iconNum: {
    color: '#FFF',
  },
  bgImageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  bgImage: {
    height: 80,
    width: 80,
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
