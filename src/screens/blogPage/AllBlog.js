import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

export default function AllBlog({navigation}) {
  const [items, setItems] = React.useState([
    {
      id: 1,
      title: 'Product 1',
      count: 4,
      image:
        'https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      count: 4,
      image:
        'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Product 3',
      count: 4,
      image:
        'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      title: 'Product 4',
      count: 4,
      image:
        'https://images.pexels.com/photos/2818118/pexels-photo-2818118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      title: 'Product 5',
      count: 4,
      image:
        'https://images.pexels.com/photos/927629/pexels-photo-927629.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      title: 'Product 6',
      count: 4,
      image:
        'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 7,
      title: 'Product 7',
      count: 4,
      image:
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 8,
      title: 'Product 8',
      count: 4,
      image:
        'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 9,
      title: 'Product 9',
      count: 4,
      image:
        'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 9,
      title: 'Product 10',
      count: 4,
      image:
        'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        //staticDimension={350}
        //fixed
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Blog Detail')}>
            <View>
              <Image style={styles.cardImage} source={{uri: item.image}} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    backgroundColor: 'white',
  },
  cardContent: {
    paddingVertical: 17,
    justifyContent: 'space-between',
  },
  cardImage: {
    // flex: 1,
    height: 160,
    width: '100%',
    borderRadius: 5,
  },

  /******** card components **************/
  title: {
    fontSize: 15,
    flex: 1,
    color: '#000',
  },
  count: {
    fontSize: 15,
    flex: 1,
    color: '#000',
  },
});
