import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';

export default function AllBlog({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [blog, setBlog] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getBlogs = async () => {
    setRefreshing(true);
    axios
      .get(`http://3.7.173.138:9000/admin/getBlog`)
      .then(response => {
        //console.log(response.data.data);
        setBlog(response.data.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <View style={styles.container}>
      <FlatGrid
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        itemDimension={130}
        data={blog}
        style={styles.gridView}
        //staticDimension={350}
        //fixed
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Blog Detail', {id: item?._id})}
            ket={item._id}>
            <View>
              <Image
                style={styles.cardImage}
                source={{uri: `${item.blogImg}`}}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.blog_title}</Text>
            </View>
            <View style={styles.blogMaster}>
              <Image
                style={styles.blogMasterImage}
                source={{uri: `${item.posted_by_img}`}}
              />
              <Text style={styles.blogMasterText}>{item?.posted_by}</Text>
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
    fontWeight: '600',
  },
  count: {
    fontSize: 15,
    flex: 1,
    color: '#000',
  },
  blogMaster: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  blogMasterImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  blogMasterText: {
    color: '#000',
    fontWeight: '500',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
});
