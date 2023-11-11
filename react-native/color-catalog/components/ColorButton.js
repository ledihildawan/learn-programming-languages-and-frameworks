import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default function ColorButton({ label, value, onPress }) {
  const handleOnPress = () => {
    onPress(value);
  };

  return (
    <TouchableHighlight
      style={styles.button}
      onPress={handleOnPress}
      underlayColor="orange"
    >
      <View style={styles.row}>
        <View style={[styles.sample, { backgroundColor: value }]}></View>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, .8)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sample: {
    height: 20,
    width: 20,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  },
});
