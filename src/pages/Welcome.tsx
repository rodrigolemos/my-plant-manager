import React from 'react';
import { Dimensions, SafeAreaView, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import wateringImg from '../assets/watering.png';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerencie {'\n'} suas plantas de {'\n'} forma fácil</Text>
      <Image
        style={styles.image}
        source={wateringImg}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleStart}
      >
        <Feather
          name="chevron-right"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 28,
    lineHeight: 30,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 38
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  image: {
    width: Dimensions.get('window').width * 7
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    width: 56,
    height: 56
  },
  buttonIcon: {
    fontSize: 28,
    color: colors.white,
  },
});
