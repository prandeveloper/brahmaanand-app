import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FlatGrid} from 'react-native-super-grid';

const CategoryList = ({navigation}) => {
  const [items, setItems] = React.useState([
    {name: 'CATEGORY 1', code: '#1abc9c'},
    {name: 'CATEGORY 1', code: '#2ecc71'},
    {name: 'CATEGORY 1', code: '#3498db'},
    {name: 'CATEGORY 1', code: '#9b59b6'},
    {name: 'CATEGORY 1', code: '#34495e'},
    {name: 'CATEGORY 1', code: '#16a085'},
    {name: 'CATEGORY 1', code: '#27ae60'},
    {name: 'CATEGORY 1', code: '#2980b9'},
    {name: 'CATEGORY 1', code: '#8e44ad'},
    {name: 'CATEGORY 1', code: '#2c3e50'},
    {name: 'CATEGORY 1', code: '#f1c40f'},
    {name: 'CATEGORY 1', code: '#e67e22'},
    {name: 'CATEGORY 1', code: '#e74c3c'},
  ]);
  return (
    <SafeAreaView>
      <ScrollView>
        <FlatGrid
          itemDimension={130}
          data={items}
          style={styles.gridView}
          //staticDimension={350}
          //fixed
          spacing={10}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.itemContainer, {backgroundColor: item.code}]}
              onPress={() => navigation.navigate('Sub-Category')}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
