import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddInfo() {
  const [addFormValues, setAddFormValues] = useState({
    UserName: '', 
    Email: '',
    NegocioName: ''
  });

  const handleInputChange = (name, value) => {
    setAddFormValues({
      ...addFormValues, 
      [name]: value
    });
  }

  const handleAddProfile = () => {
    // Add API call here

    alert('Profile added!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Profile</Text>

      <TextInput 
        style={styles.input}
        placeholder="Nombre"
        value={addFormValues.UserName}
        onChangeText={text => handleInputChange('UserName', text)}
      />

      <TextInput 
        style={styles.input}
        placeholder="Email" 
        value={addFormValues.Email}
        onChangeText={text => handleInputChange('Email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Negocio"
        value={addFormValues.NegocioName}
        onChangeText={text => handleInputChange('NegocioName', text)}  
      />

      <Button 
        title="Agregar" 
        color="#841584"
        onPress={handleAddProfile}  
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    padding: 20    
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#BB86FC',
    height: 40, 
    marginBottom: 12,
    color: 'white',
    padding: 10    
  }
});