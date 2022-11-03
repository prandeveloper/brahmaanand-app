import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

//import {Feather as Icon} from '@expo/vector-icons';

// Fonts
// import {useFonts} from 'expo-font';
// import SSLight from '../../assets/fonts/SourceSansPro/SourceSansProLight.ttf';
// import SSRegular from '../../assets/fonts/SourceSansPro/SourceSansProRegular.ttf';
// import SSBold from '../../assets/fonts/SourceSansPro/SourceSansProBold.ttf';

function Photos({photos}) {
  const imgWidth = Dimensions.get('screen').width * 0.33333;
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
        {photos.map((photo, index) => (
          <View>
            <Image
              style={{width: imgWidth, height: imgWidth}}
              source={{
                uri: `https://picsum.photos/200/300?random=${index + 1}`,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

function Albums() {
  const [albums] = useState([
    {
      name: 'Animals',
      images: [
        'https://i.picsum.photos/id/1074/367/267.jpg?hmac=2YamGD7W1FNtp9UvAVUDdYUm44xzyHCthHqFl6jVT0M',
        'https://i.picsum.photos/id/237/367/267.jpg?hmac=9Xp8JrOngpF2E_G3tRKnJMhZu5AX8FimulIG_sLj1xg',
        'https://i.picsum.photos/id/1084/367/267.jpg?hmac=VaCZRCvuoubMR-S6bXItyxmDVwAaumZU2x1ulWE0faU',
        'https://i.picsum.photos/id/219/367/267.jpg?hmac=S8RAgXxGj5AUho8KQ0hsjW8bhy1d-WunZNm77FCqC3w',
      ],
    },
    {
      name: 'Food',
      images: [
        'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
    },
  ]);
  const imgWidth = Dimensions.get('screen').width * 0.33333;
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingBottom: 20}}>
      {albums.map(album => (
        <TouchableOpacity style={{flexDirection: 'row', marginTop: 10}}>
          {album.images.map(img => (
            <Image
              style={{width: imgWidth + 50, height: imgWidth + 50}}
              source={{uri: img}}
            />
          ))}
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              backgroundColor: '#111',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
            }}>
            <Text style={{color: '#000', fontFamily: 'SSBold', fontSize: 20}}>
              {album.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Tags({photos}) {
  const imgWidth = Dimensions.get('screen').width * 0.33333;
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
        {photos.map((photo, index) => (
          <View>
            <Image
              style={{width: imgWidth, height: imgWidth}}
              source={{
                uri: `https://picsum.photos/200/300?random=${index + 100}`,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default function ProfileView({navigation}) {
  const [showContent, setShowContent] = useState('Photos');

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={{
                uri: 'https://cdn.wccftech.com/wp-content/uploads/2016/09/spacee-scaled.jpg',
              }}
            />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: 'https://randomuser.me/api/portraits/women/46.jpg',
                  }}
                />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>Sophie Welch</Text>
                <Text style={styles.userBio}>{'I love capturing photos'}</Text>
              </View>
              {/* Posts/Followers/Following View */}
              <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>User Since</Text>
                  <Text style={styles.countText}> Oct 8, 2022 12:00 AM</Text>
                </View>

                <View style={styles.countView}>
                  <Text style={styles.countNum}>Last Seen</Text>
                  <Text style={styles.countText}>10 min Ago</Text>
                </View>
              </View>
              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity
                  style={styles.interactButton}
                  onPress={() => navigation.navigate('My Profile')}>
                  <Text style={styles.interactButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Profile Content */}
            <View style={{marginTop: 20}}>
              <View style={styles.profileContentButtonsView}>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'Photos' ? 2 : 0,
                  }}
                  onPress={() => setShowContent('Photos')}>
                  <Text style={styles.showContentButtonText}>Video Posted</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'Albums' ? 2 : 0,
                  }}
                  onPress={() => setShowContent('Albums')}>
                  <Text style={styles.showContentButtonText}>BookMarks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === 'Tags' ? 2 : 0,
                  }}
                  onPress={() => setShowContent('Tags')}>
                  <Text style={styles.showContentButtonText}>Points</Text>
                </TouchableOpacity>
              </View>
              {showContent === 'Photos' ? (
                <Photos photos={new Array(13).fill(1)} />
              ) : showContent === 'Albums' ? (
                <Albums />
              ) : (
                <Tags photos={new Array(23).fill(1)} />
              )}
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    height: 300,
    width: '100%',
  },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: {alignItems: 'center', marginTop: -50},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: {alignItems: 'center', marginTop: 10},
  userFullName: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  userBio: {
    fontSize: 18,
    color: '#000',
    marginTop: 4,
  },
  countsView: {flexDirection: 'row', marginTop: 20},
  countView: {flex: 1, alignItems: 'center'},
  countNum: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  countText: {fontFamily: 'SSRegular', fontSize: 15, color: '#000'},
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc9358',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    fontFamily: 'SSBold',
    color: '#FFF',
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {
    fontSize: 15,
    color: '#000',
  },
});
