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

const SubCategory = () => {
  const [items, setItems] = React.useState([
    {name: 'SUB-CATEGORY', code: '#1abc9c'},
    {name: 'SUB-CATEGORY', code: '#2ecc71'},
    {name: 'SUB-CATEGORY', code: '#3498db'},
    {name: 'SUB-CATEGORY', code: '#9b59b6'},
    {name: 'SUB-CATEGORY', code: '#34495e'},
    {name: 'SUB-CATEGORY', code: '#16a085'},
    {name: 'SUB-CATEGORY', code: '#27ae60'},
    {name: 'SUB-CATEGORY', code: '#2980b9'},
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
              style={[styles.itemContainer, {backgroundColor: item.code}]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubCategory;

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
