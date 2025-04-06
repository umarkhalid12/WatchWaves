import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';

const Favourite = ({ route }) => {
  // Access favorites from the params
  const { favorites } = route.params || { favorites: [] }; // Ensure a default empty array
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorites</Text>
      <FlatList
        data={favorites} // Use the favorites passed from params
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster}` }}
              style={styles.poster}
            />
            <Text style={styles.title}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    color: '#fff',
  },
});

export default Favourite;
