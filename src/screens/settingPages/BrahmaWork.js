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
                Search for the top content on any subject ... (e.g. Java)
              </Title>
              <Paragraph>
                Our team of experts at Brahmaand.Space thoroughly evaluates and
                curates submitted content from across the globe, which are links
                to YouTube videos, courses, articles, and blogs.
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
                User community and category experts will give their assessments
                and feedback for the submitted content.
              </Title>
              <Paragraph>
                Again, our expert team manually evaluates all ratings and
                reviews to verify their sources and ensure they provide helpful
                information.
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
                Brahmaand.Space showcases the best content that rises to the top
                for your learning and enjoyment.
              </Title>
              <Paragraph>
                Our platform rewards users who submitted content in the first
                step with prizes based on the ratings and reviews from
                Brahmaand.Space users community.
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
