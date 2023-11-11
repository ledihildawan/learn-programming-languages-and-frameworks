import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import { useState } from 'react';

import ColorButton from './components/ColorButton';
import defaultColors from './data/defaultColors';

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState('blue');
  console.log(backgroundColor);

  return (
    <>
      <StatusBar style="auto" />

      <FlatList
        data={defaultColors}
        style={[styles.container, { backgroundColor }]}
        renderItem={({ item }) => (
          <ColorButton {...item} onPress={setBackgroundColor} />
        )}
        keyExtractor={(color) => color.id}
      ></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
});
