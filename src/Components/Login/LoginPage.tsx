import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username === 'abc@gmail.com' && password === 'password') {
      dispatch(login({ username, password }))
      getData()
    } else if (username.length === 0 || password.length === 0) {
      Alert.alert('Warning', 'Please enter credentials')
    } else {
      Alert.alert('Warning', 'Invalid credentials')
    }
  }

  const getData = async () => {
    try {
      const authToken = 'example_authToken';
      await AsyncStorage.setItem('AUTH_TOKEN', authToken);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  }

  return (
    <View style={{
      paddingHorizontal: 25, alignContent: 'center', flex: 1,
      backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'center'
    }}>
      <View>
        <Text>Username/Email:</Text>
        <TextInput value={username} onChangeText={setUsername}
          style={{ borderWidth: 1, borderRadius: 6 }} />
      </View>

      <View style={{ marginVertical: 20 }}>
        <Text>Password:</Text>
        <TextInput value={password} onChangeText={setPassword} secureTextEntry
          style={{ borderWidth: 1, borderRadius: 6 }} />
      </View>

      <View style={{ width: '40%', alignSelf: 'center', marginVertical: 20 }}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginPage;
