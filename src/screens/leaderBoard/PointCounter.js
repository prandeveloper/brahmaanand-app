import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatGrid} from 'react-native-super-grid';

const PointCounter = () => {
  const [items, setItems] = React.useState([
    {
      name: <Ionicons name="document-text" color="#FFF" size={20} />,
      text1: 'Submit a content',
      text2: '10 meteors',
      code: '#FC9357',
    },

    {
      name: <AntDesign name="like1" color="#FFF" size={20} />,
      text1: 'Rating',
      text2: '2 meteors',
      code: '#5F56C6',
    },
    {
      name: <Ionicons name="infinite-sharp" color="#FFF" size={20} />,
      text1: 'Review',
      text2: '5 meteors',
      code: '#F35F5F',
    },
    {
      name: <Ionicons name="bar-chart" color="#FFF" size={20} />,
      text1: 'Reaching a level',
      text2: '50 meteors',
      code: '#1BCBF2',
    },
  ]);
  return (
    <View style={styles.container}>
      <Text
        style={{color: '#FC9358', margin: 5, fontSize: 16, fontWeight: '700'}}>
        Point Counter
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
            <View style={[styles.iconView, {backgroundColor: item.code}]}>
              {item.name}
            </View>

            <View style={styles.textView}>
              <Text style={styles.upperText}>{item.text1}</Text>
              <Text style={[styles.lowerText, {color: item.code}]}>
                {item.text2}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PointCounter;

const styles = StyleSheet.create({
  container: {},
  mainRow: {
    flexDirection: 'row',
  },
  innerView: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    margin: 5,
  },
  textView: {
    flexDirection: 'column',
  },
  upperText: {
    color: '#000',
    marginTop: 10,
    fontWeight: '600',
  },
  lowerText: {
    fontWeight: '600',
  },
});
