import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    adresse: '',
    email: '',
    confirmationEmail: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom) newErrors.prenom = 'Le prénom est requis';
    if (!formData.age) {
      newErrors.age = 'L\'âge est requis';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'L\'âge doit être un nombre positif';
    }
    if (!formData.adresse) newErrors.adresse = 'L\'adresse est requise';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.confirmationEmail) {
      newErrors.confirmationEmail = 'La confirmation de l\'email est requise';
    } else if (formData.confirmationEmail !== formData.email) {
      newErrors.confirmationEmail = 'Les emails doivent correspondre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert('Formulaire soumis', JSON.stringify(formData, null, 2));
      // Reset form
      setFormData({
        nom: '',
        prenom: '',
        age: '',
        adresse: '',
        email: '',
        confirmationEmail: '',
      });
      setErrors({});
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>MTM Formulaire</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        onChangeText={(value) => handleChange('nom', value)}
        value={formData.nom}
      />
      {errors.nom && <Text style={styles.error}>{errors.nom}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        onChangeText={(value) => handleChange('prenom', value)}
        value={formData.prenom}
      />
      {errors.prenom && <Text style={styles.error}>{errors.prenom}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Âge"
        keyboardType="numeric"
        onChangeText={(value) => handleChange('age', value)}
        value={formData.age}
      />
      {errors.age && <Text style={styles.error}>{errors.age}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Adresse"
        onChangeText={(value) => handleChange('adresse', value)}
        value={formData.adresse}
      />
      {errors.adresse && <Text style={styles.error}>{errors.adresse}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => handleChange('email', value)}
        value={formData.email}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirmation Email"
        onChangeText={(value) => handleChange('confirmationEmail', value)}
        value={formData.confirmationEmail}
        keyboardType="email-address"
      />
      {errors.confirmationEmail && <Text style={styles.error}>{errors.confirmationEmail}</Text>}
      <Button onPress={handleSubmit} title="Afficher" />
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    color: 'blue',
    marginLeft: 90,
    fontSize : 22
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});