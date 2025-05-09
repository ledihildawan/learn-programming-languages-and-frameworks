import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useColors() {
  const [colors, setColors] = useState([]);

  const loadColors = async () => {
    const value = await AsyncStorage.getItem('colors');

    if (value) {
      setColors(JSON.parse(value));
    }
  };

  const addNewColor = (color) => {
    setColors([
      ...colors,
      {
        id: Math.random().toString(16).slice(2),
        color,
      },
    ]);
  };

  useEffect(() => {
    AsyncStorage.clear();
    if (colors.length) {
      return;
    }

    loadColors();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  return {
    colors,
    addNewColor,
  };
}
