import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import sun from '../../assets/images/planet/sun.png';
import mercury from '../../assets/images/planet/mercury.png';

const KarmaCurrent = () => {
  const [items, setItems] = useState([]);
  const [allTime, setAllTime] = useState([]);
  const [planet, setPlanet] = useState([
    {
      imageUrl: require('../../assets/images/planet/sun.png'),
    },

    {
      imageUrl: require('../../assets/images/planet/mercury.png'),
    },
    {
      imageUrl: require('../../assets/images/planet/venus.png'),
    },
    {
      imageUrl: require('../../assets/images/planet/mars.png'),
    },
    {
      imageUrl: require('../../assets/images/planet/jupiter.png'),
    },
    {
      imageUrl: require('../../assets/images/planet/saturn.png'),
    },
  ]);
  const getCurrentKarma = () => {
    axios
      .get(`http://3.7.173.138:9000/user/karma_crrnt_month`)
      .then(response => {
        //console.log(response.data.data);
        setItems(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getAllTime = () => {
    axios
      .get(`http://3.7.173.138:9000/user/all_time_karma`)
      .then(response => {
        console.log(response.data.data);
        setAllTime(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCurrentKarma();
    getAllTime();
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.karmaText}>Karma - Current Month</Text>

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
                  <Image source={sun} style={styles.planetImage} />
                </View>
                <View style={styles.iconView2}>
                  <Text style={styles.iconNum}>{item?.meteors}</Text>
                </View>
              </View>
              <View style={styles.bgImageView}>
                <ImageBackground
                  source={{uri: `${item.userid?.profileImg}`}}
                  style={styles.bgImage}
                  imageStyle={{borderRadius: 50}}></ImageBackground>
              </View>
              <View>
                <Text style={styles.upperText}>{item.userid?.username}</Text>
                <Text style={styles.lowerText}>{item.userid?.meteors}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View>
        <Text style={styles.karmaText}>Karma - All Time</Text>

        <FlatGrid
          itemDimension={130}
          data={allTime}
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
                  <Text style={styles.iconNum}>{item?.meteors}</Text>
                </View>
              </View>
              <View style={styles.bgImageView}>
                <ImageBackground
                  source={{uri: `${item.userid?.profileImg}`}}
                  style={styles.bgImage}
                  imageStyle={{borderRadius: 50}}></ImageBackground>
              </View>
              <View>
                <Text style={styles.upperText}>{item.userid?.username}</Text>
                <Text style={styles.lowerText}>{item.userid?.meteors}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default KarmaCurrent;

const styles = StyleSheet.create({
  container: {},
  karmaText: {
    color: '#FC9358',
    margin: 5,
    fontSize: 16,
    fontWeight: '700',
  },

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
    borderRadius: 50,
  },
  bgImage: {
    height: 80,
    width: 80,
  },
  upperText: {
    textAlign: 'center',
    color: '#000',
    margin: 2,
    fontWeight: '600',
    textTransform: 'capitalize',
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
