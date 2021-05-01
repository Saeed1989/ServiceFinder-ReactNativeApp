import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ServiceList';

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = price => {
    // price === '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice('$')}
          title="Best Price"
        />
        <ResultsList results={filterResultsByPrice('$$')} title="Moderate Price" />
        <ResultsList
          results={filterResultsByPrice('$$$')}
          title="Costly"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
