import axios from 'axios';
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
  Button,
} from 'react-native';

export default function BlogDetail({route}) {
  const {id} = route.params;
  console.log(id);
  const [detail, setDetail] = useState({});

  const getBlogDetail = () => {
    axios
      .get(`http://43.205.82.226:9000/admin/viewoneBlog/${id}`)
      .then(response => {
        console.log(response.data.data);
        setDetail(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBlogDetail();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', marginHorizontal: 30}}>
          <Image
            style={styles.productImg}
            source={{
              uri: `${detail.blogImg}`,
            }}
          />
          <Text style={styles.name}>{detail?.blog_title}</Text>
          <Text style={styles.description}>{detail?.desc}</Text>
          <Text style={styles.price}>Posted By:</Text>
          <View style={styles.blogMaster}>
            <Image
              style={styles.blogMasterImage}
              source={{uri: `${detail.posted_by_img}`}}
            />
            <Text style={styles.blogMasterText}>{detail?.posted_by}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  productImg: {
    marginTop: 5,
    flex: 1,
    width: '100%',
    height: 200,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 20,
    fontSize: 15,
    color: '#000',
    fontWeight: 'normal',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
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
