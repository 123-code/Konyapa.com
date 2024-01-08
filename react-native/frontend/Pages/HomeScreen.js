import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const API_KEY = ''; 
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD', {
          params: {
            vs_currency: 'usd',
            per_page: 10,  
          },
          headers: {
            'Authorization': `Bearer ${API_KEY}`  
          },
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        window.alert('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Lista de monedas</Text>
      {cryptoData.map((crypto, index) => (
        <Card key={index} style={styles.card}
        onPress={() => 
            navigation.navigate('Ordenform')  
          }
        >
          <Card.Content>
            <Title>{crypto.name}</Title>
            <Paragraph>{crypto.symbol}</Paragraph>
            <Paragraph>Precio Actual: {crypto.current_price} USD</Paragraph>
          </Card.Content>
        </Card>
      ))}

      <StatusBar style="auto" />
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
  card: {
    margin: 10,
    padding: 10,
  },
});