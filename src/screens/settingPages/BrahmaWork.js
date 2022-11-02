import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const BrahmaWork = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: 'http://brahmaand.space/static/media/edu.52b5919098cfebf9ebc6.jpg',
              }}
            />
            <Card.Content>
              <Title style={{textAlign: 'center'}}>
                Users submit resources they find relevant in respective category
              </Title>
              <Paragraph>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: 'http://brahmaand.space/static/media/rate.3013ebc8852441a2e01f.jpg',
              }}
            />
            <Card.Content>
              <Title style={{textAlign: 'center'}}>
                Community and experts will rate the resources and give their
                reviews.
              </Title>
              <Paragraph>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Cover
              source={{
                uri: 'http://brahmaand.space/static/media/socialnetwork.3fa7380cc60bce4c74ba.jpg',
              }}
            />
            <Card.Content>
              <Title style={{textAlign: 'center'}}>
                Community and experts will rate the resources and give their
                reviews.
              </Title>
              <Paragraph>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BrahmaWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  main: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 10,
  },
});
