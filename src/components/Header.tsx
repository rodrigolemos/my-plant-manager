import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem('@plant-manager:user');
      setUserName(user || '');
    }
    getUserName();
  }, [userName]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.image}>
        <Text style={styles.letter}>{userName?.substr(0, 1)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green
  },
  letter: {
    color: colors.white,
    fontSize: 28,
  }
});
