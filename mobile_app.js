import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

// App ko background image (himalayan_bg.jpg lai assets folder ma rakhnus)
const backgroundImage = require('./assets/himalayan_bg.jpg');

// Tapaiko Computer ko IP Address yaha lekhnus
// Terminal ma 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux) type garera vetna saknu huncha
const YOUR_COMPUTER_IP = '192.168.1.101'; // <-- IMPORTANT: CHANGE THIS!
const API_URL = `http://${YOUR_COMPUTER_IP}:8000/predict/astrology`;

export default function App() {
  const [dob, setDob] = useState(''); // E.g., '1995-10-25'
  const [place, setPlace] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePrediction = async () => {
    if (!dob || !place) {
      setError('कृपया आफ्नो जन्ममिति र जन्मस्थान भर्नुहोस्।');
      return;
    }
    setLoading(true);
    setPrediction(null);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dob, place }),
      });

      if (!response.ok) {
        throw new Error('Server sanga connection garna sakiyena.');
      }

      const data = await response.json();
      setPrediction(data);

    } catch (err) {
      console.error(err);
      setError('माफ गर्नुहोस्, केही समस्या आयो। कृपया आफ्नो इन्टरनेट र IP ठेगाना जाँच गर्नुहोस्।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>SEE YOUR FUTURE</Text>
          <Text style={styles.subtitle}>आफ्नो भविष्य हेर्नुहोस्</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="जन्ममिति (YYYY-MM-DD)"
              placeholderTextColor="#aaa"
              value={dob}
              onChangeText={setDob}
            />
            <TextInput
              style={styles.input}
              placeholder="जन्मस्थान (e.g., Kathmandu)"
              placeholderTextColor="#aaa"
              value={place}
              onChangeText={setPlace}
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handlePrediction} disabled={loading}>
            <Text style={styles.buttonText}>भविष्यवाणी हेर्नुहोस्</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}
          
          {error && <Text style={styles.errorText}>{error}</Text>}

          {prediction && (
            <View style={styles.predictionBox}>
              <Text style={styles.predictionMessage}>{prediction.message}</Text>
              <Text style={styles.predictionText}>{prediction.prediction}</Text>
              <Text style={styles.disclaimer}>{prediction.disclaimer}</Text>
            </View>
          )}

          {/* Static Palmistry Guide ko lagi placeholder */}
          <View style={styles.staticGuide}>
            <Text style={styles.guideTitle}>हस्तरेखा गाइड (Palmistry Guide)</Text>
            <Text style={styles.guideText}>• जीवन रेखा (Life Line): Your health and vitality.</Text>
            <Text style={styles.guideText}>• हृदय रेखा (Heart Line): Your emotional world.</Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Background lai halka dark banauna
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    // fontFamily: 'Preeti', // Custom font integrate garna parchha
    textShadowColor: 'rgba(255, 165, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#ddd',
    marginBottom: 30,
    // fontFamily: 'Mangal', // Custom font
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    backgroundColor: '#FF6347', // Tomato color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  predictionBox: {
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  predictionMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    marginBottom: 10,
  },
  predictionText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  disclaimer: {
    fontSize: 12,
    color: '#aaa',
    fontStyle: 'italic',
    marginTop: 15,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF6347',
    marginTop: 15,
    fontSize: 16,
  },
  staticGuide: {
    marginTop: 40,
    padding: 15,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10
  },
  guideTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  guideText: {
    color: '#ddd',
    fontSize: 14,
  }
});