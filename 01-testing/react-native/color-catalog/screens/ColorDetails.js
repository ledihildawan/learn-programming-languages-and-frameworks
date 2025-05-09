import { Text, View, StyleSheet } from 'react-native';

import Color from 'color';

export default function ColorDetails({ route }) {
  const { color: name } = route.params;

  const color = Color(name);
  const textColor = { fontSize: 30, color: color.negate().toString() };

  return (
    <View style={[styles.container, { backgroundColor: name }]}>
      <Text style={textColor}>{name}</Text>
      <Text style={textColor}>{color.rgb().toString()}</Text>
      <Text style={textColor}>{color.hsl().toString()}</Text>
      <Text style={textColor}>{color.luminosity().toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
