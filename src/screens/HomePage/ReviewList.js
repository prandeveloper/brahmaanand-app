import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReviewList = ({route, navigation}) => {
  const [allReview, setAllReview] = useState([]);
  const {id} = route.params;
  console.log(id);

  const getAllReview = () => {
    axios
      .get(`http://3.7.173.138:9000/user/comment_list/${id}`)
      .then(response => {
        console.log(response.data.data);
        setAllReview(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllReview();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {allReview.map(items => (
          <View style={styles.listMainView} key={items._id}>
            <View style={styles.listOneView}>
              <Image
                source={{uri: `${items.userid?.profileImg}`}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                }}
              />
            </View>
            <View style={styles.listTwoView}>
              <Text style={styles.userName}>{items.userid?.username}</Text>
              <Text style={styles.Comment}>{items?.comment}</Text>
              <View style={styles.ratingView}>
                <Text style={styles.Rating}>{items?.rating}</Text>
                <Ionicons name="md-star" color="orange" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  listMainView: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  listOneView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTwoView: {
    flex: 3,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 5,
  },
  userName: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15,
    marginVertical: 5,
  },
  Comment: {
    color: '#000',
    fontWeight: '400',
    marginVertical: 5,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Rating: {
    color: '#000',
    fontWeight: '600',
    marginHorizontal: 5,
  },
});
