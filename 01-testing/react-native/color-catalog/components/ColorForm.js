import { useRef, useState } from 'react';
import { View, Alert, Button, StyleSheet, TextInput } from 'react-native';

import defaultColors from '../data/defaultColors';

export default function ColorForm({ onNewColor }) {
  const [inputValue, setInputValue] = useState('');

  const input = useRef();

  const handleNewColor = () => {
    input.current.blur();

    const colorNames = defaultColors.map((color) => color.name);

    if (!colorNames.includes(inputValue)) {
      return showAlert();
    }

    onNewColor(inputValue);

    setInputValue('');
  };

  const showAlert = () =>
    Alert.alert(
      'Invalid Color',
      'The color value you provided is not valid. Please ensure that you are using a recognized color format.',
      [
        {
          text: 'Close',
          style: 'default',
        },
      ]
    );

  return (
    <View style={styles.container}>
      <TextInput
        ref={input}
        style={styles.txtInput}
        value={inputValue}
        placeholder="enter a color..."
        autoCapitalize="none"
        onChangeText={setInputValue}
      />
      <Button title="Add" onPress={handleNewColor}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 5,
    backgroundColor: 'white',
  },
  txtInput: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    fontSize: 20,
  },
});
