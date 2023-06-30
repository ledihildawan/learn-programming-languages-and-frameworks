import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const onButtonPress = () => {
    console.log(`${new Date().toLocaleTimeString()} button press`);
  };

  return (
    <View style={styles.container}>
      <Text>Ledi 💖 Delis</Text>
      <StatusBar style="auto" />
      <Button title="Click Me" onPress={onButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
