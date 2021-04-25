import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { loadPlant, removePlant, PlantProps } from '../libs/storage';
import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState<boolean>(true);

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não ⛔',
        style: 'cancel'
      },
      {
        text: 'Sim ✌',
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants(prevState =>  prevState?.filter(item => item.id !== plant.id));
          } catch (error) {
            Alert.alert('Não foi possível remover.');
          }
        }
      }
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();
      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={(item) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item.item)}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 22,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 15
  }
});
