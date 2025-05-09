import { FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';

import ColorForm from '../components/ColorForm';
import ColorButton from '../components/ColorButton';
import useColors from '../hooks/useColors';

export default function ColorList({ navigation }) {
  const { colors, addNewColor } = useColors();

  return (
    <>
      <ColorForm onNewColor={addNewColor} />
      <FlatList
        data={colors}
        style={[styles.container]}
        renderItem={({ item }) => (
          <ColorButton
            {...item}
            onPress={() =>
              navigation.navigate('Details', {
                color: item.color,
              })
            }
          />
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
