import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PointCounter from './PointCounter';
import PlanetPosition from './PlanetPosition';
import CustomHeader from '../../components/CustomHeader';
import KarmaCurrent from './KarmaCurrent';

const LeaderBoard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <CustomHeader />
      </View>
      <ScrollView>
        <View>
          <PointCounter />
        </View>
        <View>
          <PlanetPosition />
        </View>
        <View>
          <KarmaCurrent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
