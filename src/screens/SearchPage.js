import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <SafeAreaView style={{flex: 1, marginTop: 10}}>
      <Searchbar
        placeholder="Search"
        loading={true}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({});
