import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Moment from 'react-moment';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NotificationScreen = () => {
  const [notify, setNotify] = useState([]);

  const getNotification = () => {
    axios
      .get(`http://3.7.173.138:9000/admin/get_notification`)
      .then(response => {
        console.log(response.data.data);
        setNotify(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getNotification();
  }, []);

  return (
    <FlatList
      style={styles.root}
      data={notify}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />;
      }}
      keyExtractor={item => {
        return item.id;
      }}
      renderItem={item => {
        const Notification = item.item;
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.iconTouch} onPress={() => {}}>
              <Icon name="bell" color={'#000'} size={25} />
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{Notification?.title}</Text>
                <Text style={styles.time}>
                  <Moment element={Text} format="lll">
                    {Notification?.createdAt}
                  </Moment>
                </Text>
              </View>
              <Text style={{color: '#000'}}>{Notification?.desc}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconTouch: {
    marginTop: 10,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 10,
  },
  time: {
    fontSize: 11,
    color: '#000',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
